// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract EstateContract {
    struct BuildingData {
        uint yearBuilt;
        string material;
    }

    struct Estate {
        uint256 area;            // Area in square meters
        uint256 rooms;           // Number of rooms
        BuildingData building;   // Nested struct for building details
        string ipfs3DModelLink;  // IPFS link to a 3D model of the estate
    }

    mapping(uint256 => Estate) public estates;
    mapping(uint256 => address) public estateOwners;
    uint256 public totalEstates;

    event EstateAdded(uint256 indexed estateId, uint256 area, uint256 rooms, uint yearBuilt, string material, string ipfs3DModelLink, address indexed owner);
    event OwnershipTransferred(uint256 indexed estateId, address indexed previousOwner, address indexed newOwner);

    function addEstate(uint256 _area, uint256 _rooms, uint _yearBuilt, string memory _material, string memory _ipfs3DModelLink, address _owner) public {
        uint256 estateId = totalEstates++;
        estates[estateId] = Estate(_area, _rooms, BuildingData(_yearBuilt, _material), _ipfs3DModelLink);
        estateOwners[estateId] = _owner;
        emit EstateAdded(estateId, _area, _rooms, _yearBuilt, _material, _ipfs3DModelLink, _owner);
    }

    function transferOwnership(uint256 _estateId, address _newOwner) public {
        require(estateOwners[_estateId] == msg.sender, "Only current owner can transfer ownership");
        address previousOwner = estateOwners[_estateId];
        estateOwners[_estateId] = _newOwner;
        emit OwnershipTransferred(_estateId, previousOwner, _newOwner);
    }

    function getEstateDetails(uint256 _estateId) public view returns (uint256, uint256, uint, string memory, string memory) {
        Estate storage estate = estates[_estateId];
        return (estate.area, estate.rooms, estate.building.yearBuilt, estate.building.material, estate.ipfs3DModelLink);
    }
}
