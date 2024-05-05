// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ApartmentLeaseAgreement {
    address payable public landlord;
    address payable public tenant;
    uint public rentAmount;
    uint public securityDeposit;
    uint public agreementStartDate;
    uint public agreementEndDate;
    bool public agreementExpired;
    
    struct Apartment {
        uint apartmentNumber;
        string apartmentAddress;
        uint numberOfBedrooms;
        uint rentPerMonth;
        uint securityDeposit;
        address payable landlord;
        address payable currentTenant;
    }
    
    mapping(uint => Apartment) public apartments;
    
    constructor(address payable _landlord, address payable _tenant, uint _rentAmount, uint _securityDeposit, uint _agreementStartDate, uint _agreementEndDate) {
        landlord = _landlord;
        tenant = _tenant;
        rentAmount = _rentAmount;
        securityDeposit = _securityDeposit;
        agreementStartDate = _agreementStartDate;
        agreementEndDate = _agreementEndDate;
        agreementExpired = false;
    }
    
    function setApartmentDetails(uint _apartmentNumber, string memory _apartmentAddress, uint _numberOfBedrooms, uint _rentPerMonth, uint _securityDeposit) public {
        Apartment storage apartment = apartments[_apartmentNumber];
        apartment.apartmentNumber = _apartmentNumber;
        apartment.apartmentAddress = _apartmentAddress;
        apartment.numberOfBedrooms = _numberOfBedrooms;
        apartment.rentPerMonth = _rentPerMonth;
        apartment.securityDeposit = _securityDeposit;
        apartment.landlord = landlord;
        apartment.currentTenant = tenant;
    }
    
    function getApartmentDetails(uint _apartmentNumber) public view returns (string memory, uint, uint, uint, address payable, address payable) {
        Apartment storage apartment = apartments[_apartmentNumber];
        return (apartment.apartmentAddress, apartment.numberOfBedrooms, apartment.rentPerMonth, apartment.securityDeposit, apartment.landlord, apartment.currentTenant);
    }
    
    function payRent() public payable {
        require(msg.sender == tenant, "Only tenant can pay rent");
        require(msg.value == rentAmount, "Invalid rent amount");
        // transfer rent to landlord
        landlord.transfer(msg.value);
    }
    
    function terminateAgreement() public {
        require(msg.sender == landlord || msg.sender == tenant, "Only landlord or tenant can terminate agreement");
        require(block.timestamp >= agreementEndDate, "Agreement not yet expired");
        agreementExpired = true;
        // refund security deposit to tenant
        tenant.transfer(securityDeposit);
    }
}
