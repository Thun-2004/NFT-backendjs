//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28; 

import "hardhat/console.sol"; 
import "@openzeppelin/contracts/token/ERC1155/utils/ERC1155Holder.sol";

contract NFT is ERC1155Holder {
    uint256 public tokenCounter;
    mapping(uint256 => string) public tokenURIs;

    constructor(){
        tokenCounter = 0;
    }

    function createToken(string memory _tokenURI, uint256 _amount) public {
        for (uint256 i = 0; i < _amount; i++) {
            tokenCounter++;
            _mint(msg.sender, tokenCounter, 1, "");
            tokenURIs[tokenCounter] = _tokenURI;
        }
    }

    function burnToken(uint256 _tokenId) public {
        _burn(msg.sender, _tokenId, 1);
    }
}


