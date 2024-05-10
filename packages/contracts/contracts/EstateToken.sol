// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract EstateToken is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    // Events
    event WhitelistAdded(address user);
    event WhitelistRemoved(address user);
    event EstateMinted(uint256 tokenId, address to);

    mapping(address => bool) public whitelistedUsers;

    constructor() ERC721("ZKEstateToken", "ESTATE") {}

    function mint(address to, string memory tokenURI) public {
        // require(whitelistedUsers[msg.sender], "User not whitelisted for minting");
        _tokenIds.increment();
        uint256 tokenId = _tokenIds.current();

        _mint(to, tokenId);
        _setTokenURI(tokenId, tokenURI);
        emit EstateMinted(tokenId, to);
    }

    function addToWhitelist(address user) public onlyOwner {
        whitelistedUsers[user] = true;
    }

    function removeFromWhitelist(address user) public onlyOwner {
        whitelistedUsers[user] = false;
    }
}
