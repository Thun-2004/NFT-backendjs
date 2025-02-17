//SPDX-License_Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";


contract NFTRegistry {
    // uint256 private _tokenId = 1; 
    uint256 private _globalTokenId; 

    // constructor() Ownable(msg.sender) {

    // }

    function _incrementToken() external returns(uint256) {
        _globalTokenId++;
       return _globalTokenId;
    }
}


