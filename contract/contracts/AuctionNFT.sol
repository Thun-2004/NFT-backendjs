//SPDX-License_Identifier: MIT

pragma solidity ^0.8.0

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract AuctionNFT is ERC721, BaseNFT {
    uint256 tokenId; 
    uint256 marketFee = 0.01 ether
    address payable owner;
    address payable seller;
    address payable highestBidder; 
    uint256 startingPrice;
    uint256 highestBid = 0; 
    uint256 auctionEndTime; 

    constructor() ERC721("AuctionedNFT"){
        owner = payable(msg.sender)
    }

    function mint(string memory tokenURI, uint256 price, uint256 auctionEndTime) public payable{
        require(msg.value == marketFee, "Not enough ether to pay for listing fee"); 
        require(price > 0, "price can't be negative"); 
        require(auctionEndTime > currentTime, "Endtime can't be earlier or equal to current time"); 

        tokenId = _incrementToken(); 
        auctionEndTime = auctionEndTime; 
        startingPrice = price; 

        _mint(msg.sender, tokenId); 

        safeTransferFrom(msg.sender, address(this), tokenId); 

        _setTokenURI(tokenId, tokenURI); 
    }

    function getCurrentPrice(uint tokenId) returns (uint256){
        return highestBid; 
    }

    function startAuction(){

    }

    function endAuction(){

    }

}


//save data into state variable
// uint256 tokenId; 
//     uint256 marketFee = 0.01 ether
//     address payable owner;
//     address payable seller;
//     address payable highestBidder; 
//     uint256 startingPrice;
//     uint256 highestBid; 
//     uint256 auctionEndTime; 