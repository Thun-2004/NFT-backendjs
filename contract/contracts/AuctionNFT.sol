//SPDX-License_Identifier: MIT

pragma solidity ^0.8.0

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract AuctionNFT is ERC721 {
    uint256 tokenId; 
    uint256 marketFee = 0.01 ether
    address payable owner;
    address payable seller;
    address payable highestBidder; 
    uint256 startingPrice;
    uint256 highestBid; 
    uint256 auctionEndTime; 

    constructor() ERC721("AuctionedNFT"){
        owner = payable(msg.sender)
    }

    function mint(uint256 currentTokenId, string memory tokenURI, uint256 price) public payable{
        require(msg.value == marketFee, "Not enough ether to pay for listing fee"); 
        require(price > 0, "price can't be negative"); 

        tokenId = currentTokenId; 
        _mint(msg.sender, tokenId); 

        safeTransferFrom(msg.sender, address(this), tokenId); 

        _setTokenURI(tokenId, tokenURI); 
    }


    function getCurrentPrice(uint tokenId) returns (uint256){
        return highestBid; 
    }

}