// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract EstateContract {
    struct BuildingData {
        uint yearBuilt;
        string material;
    }

    struct Estate {
        uint256 area;
        uint256 rooms;
        BuildingData building;
        string ipfs3DModelLink;
    }

    uint256 public totalEstates;
    mapping(uint256 => Estate) public estates;
    mapping(uint256 => address) public estateOwners;

    event EstateAdded(
        uint256 indexed estateId,
        uint256 area,
        uint256 rooms,
        uint yearBuilt,
        string material,
        string ipfs3DModelLink,
        address indexed owner
    );

    event OwnershipTransferred(
        uint256 indexed estateId,
        address previousOwner,
        address newOwner
    );

    modifier validEstate(uint256 _area, uint256 _rooms) {
        require(_area > 0, "Area must be greater than zero.");
        require(_rooms > 0, "Number of rooms must be greater than zero.");
        _;
    }

    function addEstate(
        uint256 _area,
        uint256 _rooms,
        uint _yearBuilt,
        string memory _material,
        string memory _ipfs3DModelLink,
        address _owner
    ) public validEstate(_area, _rooms) {
        require(_owner != address(0), "Owner address cannot be zero.");
        uint256 estateId = totalEstates++;
        estates[estateId] = Estate({
            area: _area,
            rooms: _rooms,
            building: BuildingData({
                yearBuilt: _yearBuilt,
                material: _material
            }),
            ipfs3DModelLink: _ipfs3DModelLink
        });
        estateOwners[estateId] = _owner;
        emit EstateAdded(estateId, _area, _rooms, _yearBuilt, _material, _ipfs3DModelLink, _owner);
    }

    function transferOwnership(uint256 _estateId, address _newOwner) public {
        require(msg.sender == estateOwners[_estateId], "Only the current owner can transfer ownership.");
        require(_newOwner != address(0), "New owner address cannot be zero.");
        address previousOwner = estateOwners[_estateId];
        estateOwners[_estateId] = _newOwner;
        emit OwnershipTransferred(_estateId, previousOwner, _newOwner);
    }
}
