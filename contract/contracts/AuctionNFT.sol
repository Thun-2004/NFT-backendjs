//SPDX-License_Identifier: MIT

pragma solidity ^0.8.0; 

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "./BaseNFT.sol"; 

contract AuctionNFT is ERC721, BaseNFT {
   
    uint256 marketFee = 0.01 ether; 
    
    //edit : add struct
    struct AuctionToken{
        uint256 tokenId; 
        uint256 startingPrice;
        uint256 highestBid; 
        address payable owner;
        address payable seller;
        address payable highestBidder; 
        uint256 auctionEndTime; 
        bool isActive; 
    }

    mapping(uint256 => AuctionToken) private idToAuctionToken; 

    constructor() ERC721("AuctionedNFT"){
        owner = payable(msg.sender); 
    }

    function mint(string memory tokenURI, uint256 price, uint256 auctionDuration) public payable{
        require(msg.value == marketFee, "Not enough ether to pay for listing fee"); 
        require(price > 0, "price can't be negative"); 

        //edit 
        require(auctionDuration > 0, "Endtime can't be earlier or equal to current time"); 

        tokenId = _incrementToken(); 

        idToAuctionToken[tokenId] = AuctionToken(
            tokenId,
            price, 
            price, 
            address(this), 
            msg.sender, 
            address(this), 
            block.timestamp + auctionDuration,
            true 
        ); 

        _mint(msg.sender, tokenId); 

        safeTransferFrom(msg.sender, address(this), tokenId); 

        _setTokenURI(tokenId, tokenURI); 
    }

    function getCurrentPrice(uint tokenId) public returns (uint256){
        return highestBid; 
    }

    function endAuction(uint256 tokenId) private {

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