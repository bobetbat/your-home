// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract EstateToken is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    event WhitelistAdded(address indexed user);
    event WhitelistRemoved(address indexed user);
    event EstateMint(uint256 indexed tokenId,address to, string tokenURI);

    mapping(address => bool) public whitelistedUsers;

    constructor() ERC721("ZKEstateToken", "ESTATE") {}

    function mint(address to, string memory tokenURI) public {
        _tokenIds.increment();
        uint256 tokenId = _tokenIds.current();

        _mint(to, tokenId);
        _setTokenURI(tokenId, tokenURI);
        emit EstateMint(tokenId, to, tokenURI);
    }

    function addToWhitelist(address user) public onlyOwner {
        whitelistedUsers[user] = true;
        emit WhitelistAdded(user);
    }

    function removeFromWhitelist(address user) public onlyOwner {
        whitelistedUsers[user] = false;
        emit WhitelistRemoved(user);
    }

}
