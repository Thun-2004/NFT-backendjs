//SPDX-License_Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/ownership/Ownable.sol";

contract BaseNFT is Ownable{
    uint256 _tokenId = 1; 

    function _incrementToken(){
        _tokenId += 1; 
       return _tokenId; 
    }
}


