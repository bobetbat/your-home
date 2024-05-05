// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract RentContract {
    struct RentDetails {
        uint256 rentPerMonth;
        uint256 securityDeposit;
        uint256 agreementStartDate;
        uint256 agreementEndDate;
        bool isExpired;
    }

    mapping(address => RentDetails) public rents;
    event RentPaid(address indexed tenant, uint256 amount);
    event AgreementTerminated(address indexed tenant);

    function setRentDetails(address _tenant, uint256 _rentPerMonth, uint256 _securityDeposit, uint256 _startDate, uint256 _endDate) public {
        rents[_tenant] = RentDetails(_rentPerMonth, _securityDeposit, _startDate, _endDate, false);
    }

    function payRent(address _tenant) public payable {
        require(msg.value == rents[_tenant].rentPerMonth, "Incorrect rent amount");
        require(block.timestamp >= rents[_tenant].agreementStartDate && block.timestamp <= rents[_tenant].agreementEndDate, "Out of agreement period");
        emit RentPaid(_tenant, msg.value);
    }

    function terminateAgreement(address _tenant) public {
        require(block.timestamp > rents[_tenant].agreementEndDate, "Agreement period not yet over");
        rents[_tenant].isExpired = true;
        payable(_tenant).transfer(rents[_tenant].securityDeposit);
        emit AgreementTerminated(_tenant);
    }
}
