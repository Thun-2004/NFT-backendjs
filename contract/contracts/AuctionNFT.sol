//SPDX-License_Identifier: MIT

pragma solidity ^0.8.0; 

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "./BaseNFT.sol"; 

contract AuctionNFT is ERC721, BaseNFT, ERC721URIStorage, IERC721Receiver{
   
    uint256 marketFee = 0.01 ether;
    // address payable owner; 
    
    //edit : add struct
    //use struct to avoid multiple mapping 
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

    constructor() ERC721("AuctionedNFT", "AUC") BaseNFT() ERC721URIStorage() { // ✅ Call BaseNFT explicitly
        // owner = payable(msg.sender);
    }

    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC721, ERC721URIStorage) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory){
        return super.tokenURI(tokenId);
    }

    function onERC721Received(
        address operator,
        address from,
        uint256 tokenId,
        bytes calldata data
    ) public override returns (bytes4) {
        return this.onERC721Received.selector;
    }

    function mint(string memory _tokenURI, uint256 price, uint256 auctionDuration) public payable{
        require(msg.value == marketFee, "Not enough ether to pay for listing fee"); 
        require(price > 0, "price can't be negative"); 

        //edit 
        require(auctionDuration > 0, "Endtime can't be earlier or equal to current time"); 

        uint256 tokenId = _incrementToken(); 
        console.log("Token ID: ", tokenId);

        idToAuctionToken[tokenId] = AuctionToken(
            tokenId,
            price, 
            price,
            payable(address(this)), 
            payable(msg.sender), 
            payable(address(this)), 
            block.timestamp + auctionDuration,
            true
        );

        _mint(msg.sender, tokenId); 

        safeTransferFrom(msg.sender, address(this),  tokenId); 

        // should store URI in 
        _setTokenURI(tokenId, _tokenURI); 
    }

    function getCurrentPrice(uint tokenId) public returns (uint256){
        return idToAuctionToken[tokenId].highestBid; 
    }

    function placeBid(uint256 tokenId) public payable {
        AuctionToken storage auction = idToAuctionToken[tokenId];
        require(auction.isActive, "Auction not active");
        require(block.timestamp < auction.auctionEndTime, "Auction ended");
        require(msg.value > auction.highestBid, "Bid too low");

        // Refund the previous highest bidder
        if (auction.highestBidder != address(0)) {
            auction.highestBidder.transfer(auction.highestBid);
        }

        // Update auction details
        auction.highestBid = msg.value;
        auction.highestBidder = payable(msg.sender);

    }

    function endAuction(uint256 tokenId) public {
        AuctionToken storage auction = idToAuctionToken[tokenId];
        require(block.timestamp >= auction.auctionEndTime, "Auction still ongoing");
        require(auction.isActive, "Auction already ended");
        require(msg.sender == auction.seller, "Only seller can end auction");

        auction.isActive = false;

        if (auction.highestBidder != address(0)) {
            // Transfer NFT to winner
            _transfer(auction.seller, auction.highestBidder, tokenId);
            // Transfer funds to seller
            auction.seller.transfer(auction.highestBid);

        } else {
            // No bids placed, return NFT to seller
            _transfer(address(this), auction.seller, tokenId);
        }
    }

    function getHighestBidder(uint256 tokenId) public returns (address){
        return idToAuctionToken[tokenId].highestBidder; 
    }

    // function ownerOf(uint256 tokenId) public view returns (address){
    //     return ownerOf(tokenId); 
    // }

    function getAuctionContract() public returns (address){
        return address(this); 
    }

}

