// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./EstateToken.sol" as Estate;

contract RentalToken is ERC721Enumerable, Ownable {
    enum RentalStatus { Listed, Active, Closed }

    struct RentalAgreement {
        uint256 propertyId;
        uint256 agreementId;
        RentalStatus status;
        address owner;
        uint256 startTime;
        uint256 endTime;
        address[] applicants;
        address selectedTenant;
    }
    Estate.EstateToken public estateToken;

    uint256 private _rentalAgreementIdCounter;

    mapping(uint256 => RentalAgreement) public rentalAgreements;

    event RentalListed(uint256 indexed agreementId, uint256 indexed propertyId);
    event RentalClosed(uint256 indexed agreementId);
    event TenantApplied(uint256 indexed agreementId, address applicant);
    event TenantSelected(uint256 indexed agreementId, address tenant);

    constructor(address _estateTokenAddress) ERC721("RentalNFT", "RNFT") {
        estateToken = Estate.EstateToken(_estateTokenAddress);
    }

    function listProperty(uint256 propertyId, uint256 startTime, uint256 endTime) external returns (uint256) {
        require(estateToken.ownerOf(propertyId) == _msgSender(), "Caller is not the estate holder");
        _rentalAgreementIdCounter++;
        uint256 agreementId = _rentalAgreementIdCounter;

        RentalAgreement storage agreement = rentalAgreements[agreementId];
        agreement.propertyId = propertyId;
        agreement.agreementId = agreementId;
        agreement.status = RentalStatus.Listed;
        agreement.owner = _msgSender();
        agreement.startTime = startTime;
        agreement.endTime = endTime;

        _safeMint(_msgSender(), agreementId);

        emit RentalListed(agreementId, propertyId);
        return agreementId;
    }

    function applyForRent(uint256 agreementId) external {
        RentalAgreement storage agreement = rentalAgreements[agreementId];
        require(agreement.status == RentalStatus.Listed, "Rental is not available for application");
        agreement.applicants.push(_msgSender());
        emit TenantApplied(agreementId, _msgSender());
    }

    function selectTenant(uint256 agreementId, address tenant) external {
        RentalAgreement storage agreement = rentalAgreements[agreementId];
        require(_msgSender() == agreement.owner, "Caller is not the owner");
        require(agreement.status == RentalStatus.Listed, "Rental must be listed");
        agreement.selectedTenant = tenant;
        agreement.status = RentalStatus.Active;
        safeTransferFrom(agreement.owner, tenant, agreementId);
        emit TenantSelected(agreementId, tenant);
    }

    function closeRental(uint256 agreementId) external {
        RentalAgreement storage agreement = rentalAgreements[agreementId];
        require(_msgSender() == agreement.owner, "Caller is not the owner");
        require(agreement.status == RentalStatus.Active, "Rental is not active");
        agreement.status = RentalStatus.Closed;
        safeTransferFrom(agreement.selectedTenant, agreement.owner, agreementId);
        emit RentalClosed(agreementId);
    }
}
