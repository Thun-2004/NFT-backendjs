
// //SPDX-License-Identifier: MIT
// pragma solidity ^0.8.0; 

// import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
// import "@openzeppelin/contracts/utils/Counters.sol";
// import "./BaseNFT.sol"; 

// //ERC 721 saves most gas cost(store base URL + tokenId)

// contract ListedNFT is ERC1155, BaseNFT{
//     uint256 tokenId; 
//     uint256 marketFee = 0.01 ether; 
//     uint256 tokenId; 
//     address payable owner; 
//     address payable seller; 
//     address payable buyer;
//     string memory metaDataURL;
//     uint256 price;
//     uint amount;

//     struct ListedNFT{

//     }

//     constructor() ERC1155("ListedToken"){
//         owner = payable(msg.sender)
//     }

//     function mint(string memory tokenURI, uint256 amount, uint256 price) public payable{
//         require(msg.value == marketFee, "Not enough ether to pay for listing fee"); 
//         require(price > 0, "price can't be negative"); 

//         tokenId = _incrementToken(); 

//         _mint(msg.sender, currentTokenId, amount, ""); 
//         safeTransferFrom(msg.sender, address(this), newTokenId, amount, "");

//         _setTokenURI(currentTokenId, tokenURI); //map id to URI
//         //return success message
//     }

//     function getPrice(uint tokenId) returns (uint256){
//         return price
//     }

// }


// //save data in 
// // uint256 tokenId; 
// //     uint256 marketFee = 0.01 ether
// //     uint256 tokenId; 
// //     address payable owner; 
// //     address payable seller; 
// //     address payable buyer;
// //     string memory metaDataURL; 
// //     uint256 price;
// //     uint amount; 