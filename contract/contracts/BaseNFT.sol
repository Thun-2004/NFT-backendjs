//SPDX-License_Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";


contract BaseNFT is Ownable {
    uint256 public _tokenId = 1; 

    constructor() Ownable(msg.sender) {

    }

    function _incrementToken() public returns(uint256) {
        _tokenId += 1;
       return _tokenId;
    }
}


