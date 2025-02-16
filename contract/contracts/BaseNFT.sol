//SPDX-License_Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";


contract BaseNFT is Ownable {
    // uint256 private _tokenId = 1; 
    uint256 private _tokenId; 

    constructor() Ownable(msg.sender) {

    }

    function _incrementToken() public returns(uint256) {
        _tokenId++;
       return _tokenId;
    }
}


