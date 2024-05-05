pragma solidity ^0.8.0;

contract RentContract {
    
    // Struct representing each rental property
    struct Property {
        address landlord;           // Address of the property owner
        address[] potentialTenants; // Array of potential tenants
        uint256 pricePerMonth;      // Price per month in wei
        uint256 collateral;         // Collateral required for renting
        bool isAvailable;           // Flag indicating whether the property is available for rent
        address currentTenant;      // Address of the current tenant renting the property
        uint256 lastPaidMonth;      // The last month the tenant paid rent for
    }
    
    // Mapping of landlords and their rental properties
    mapping(address => Property[]) public properties;
    // Mapping of tenants and the amount of collateral they have locked up
    mapping(address => uint256) public tenantCollateral;
    
    /**
     * Adds a new rental property for the landlord
     */
    function addProperty(uint256 _pricePerMonth, uint256 _collateral) public {
        require(_pricePerMonth > 0, "Price per month should be greater than 0");
        require(properties[msg.sender].length == 0, "You already have a property listed");
        
        properties[msg.sender].push(Property(msg.sender, new address[](0), _pricePerMonth, _collateral, true, address(0), 0));
    }
    
    /**
     * Returns the number of rental properties for a given landlord
     */
    function getNumberOfProperties(address _landlord) public view returns (uint256) {
        return properties[_landlord].length;
    }
    
    /**
     * Removes a rental property for the landlord
     */
    function removeProperty(uint256 _index) public {
        require(_index < properties[msg.sender].length, "Index out of range");
        require(properties[msg.sender][_index].currentTenant == address(0), "Cannot remove a property with a current tenant");
        
        uint256 lastPropertyIndex = properties[msg.sender].length - 1;
        properties[msg.sender][_index] = properties[msg.sender][lastPropertyIndex];
        properties[msg.sender].pop();
    }
    
    /**
     * Locks up collateral for a tenant to express interest in renting a property
     */
    function expressInterest(uint256 _propertyIndex) public payable {
        require(_propertyIndex < properties[msg.sender].length, "Property does not exist");
        Property storage property = properties[properties[msg.sender][_propertyIndex].landlord][_propertyIndex];
        require(property.isAvailable, "Property is not available for rent");
        require(msg.value >= property.collateral + 1 wei, "Collateral should be slightly larger than the required amount");
        
        bool isNewTenant = true;
        for (uint i = 0; i < property.potentialTenants.length; i++) {
            if (property.potentialTenants[i] == msg.sender) {
                isNewTenant = false;
                break;
            }
        }
        if (isNewTenant) {
            property.potentialTenants.push(msg.sender);
        }
        tenantCollateral[msg.sender] += msg.value;
    }
    
    /**
     * Allows landlord to choose a tenant and rent out the property
     */
    function selectTenant(uint256 _propertyIndex, address _tenant) public {
        require(msg.sender == properties[msg.sender][_propertyIndex].landlord, "You're not the property owner");
        Property storage property = properties[msg.sender][_propertyIndex];
        require(property.isAvailable, "Property is not available for rent");
        require(property.potentialTenants.length > 0, "No potential tenants");
        
        for (uint i = 0; i < property.potentialTenants.length; i++) {
            if (property.potentialTenants[i] == _tenant) {
                property.currentTenant = _tenant;
                property.isAvailable = false;
                property.lastPaidMonth = 0;
                break;
            }
        }
    }
    /**
     * Allows tenant to pay rent for a property
     */
    function payRent(uint256 _propertyIndex) public payable {
        require(properties[msg.sender][_propertyIndex].currentTenant == msg.sender, "You are not the current tenant of this property");
        Property storage property = properties[properties[msg.sender][_propertyIndex].landlord][_propertyIndex];
        require(msg.value == property.pricePerMonth, "Sent amount is not equal to the monthly rent");
        require(CheckRentalDeadline(_propertyIndex), "Rental deadline passed, contract ended");
        
        property.lastPaidMonth++;
        if (msg.sender.balance < property.pricePerMonth) {
            property.isAvailable = true;
            property.currentTenant = address(0);
        }
    }

    /**
     * Check rental deadline; If the tenant hasn't paid rent for the last 2 months, the rental contract is considered over
     */
    function CheckRentalDeadline(uint256 _propertyIndex) internal view returns(bool){
        Property storage property = properties[properties[msg.sender][_propertyIndex].landlord][_propertyIndex];
        if(property.lastPaidMonth+2 < block.timestamp)
            return false;
        else
            return true;
    }

    /**
     * Allows tenants to withdraw their collateral
     */
    function withdrawCollateral() public {
        uint256 collateral = tenantCollateral[msg.sender];
        require(collateral > 0, "No locked collateral to withdraw");

        tenantCollateral[msg.sender] = 0;
        payable(msg.sender).transfer(collateral);
    }

}
