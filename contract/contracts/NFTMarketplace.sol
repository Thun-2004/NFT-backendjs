//SPDX-License_Identifier: UNLICENSED

pragma solidity ^0.8.0; 

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract NFTMarketplace is ERC1155 {
    using Counters for Counters.Counter; 
    Counters.Counter private _tokenId;
    Counters.Counter private _itemsSold;
    address payable owner;  //owner of contract(marketplace)
    uint256 listPrice = 0.01 ether;

    //info listed token
    struct ListedToken {
        uint256 tokenId; 
        address payable owner; 
        address payable seller; 
        address payable buyer;
        uint256 price;
    }

    struct AuctionToken {
        uint256 tokenId; 
        address payable owner;
        address payable seller;
        address payable highestBidder; 
        uint256 startingPrice;
        uint256 highestBid; 
        uint256 auctionEndTime; 
    }
    //auctionEndTime = mint date + time till expire 

    //emitted event if token successfully listed
    event TokenListedSuccess (
        uint256 indexed tokenId, 
        address owner, 
        address seller,
        address buyer, 
        uint256 price, 
    ); 

    //only for logging not transfering thus payable not working
    event TokenAuctionSuccess (
        uint256 tokenId; 
        address owner;
        address seller;
        address highestBidder; 
        uint256 startingPrice;
        uint256 highestBid; 
        uint256 auctionEndTime;  
    ); 

    mapping(uint256 => ListedToken) private idToListedToken; 
    mapping(uint256 => ListedToken) private idToListedToken; 

    constructor() ERC1155("NFTMarketplace"){
        owner = payable(msg.sender); 
        //msg.sender = address that call the function
    }   

    function updateListPrice(uint256 _listPrice) public {
        require(msg.sender == owner, "Only owner can update lsiting price");
        listPrice = _listPrice; 
    }

    function getListPrice() public view returns (uint256){ //view = not modify blockchain state , view only
        return listPrice; 
    }

    //token URI = nft metadata
    //memory = only need inside a function 
    // msg.sender = one calling fn 
    //newTokenId represents type of NFT
    function createToken(string memory tokenURI, uint256 amount, uint256 price) public payable returns (uint) {
        require(msg.value == listPrice); 
        require(price > 0, "price can't be negative"); 
       
        _tokenId.increment();
        uint256 newTokenId = _tokenIds.current();

        //mint -> msg.sender owns NFR
        _mint(msg.sender, newTokenId, amount, "");

        //transfer ownership to marketplace owner, 
        //to avoid msg.sender to burn NFT before selling to buyers
        //address(this) = address of the smart contract
        safeTransferFrom(msg.sender, address(this), newTokenId, amount, "");

        _setTokenURI(newTokenId, tokenURI); //map id to URI

        createListedToken(newTokenId, price); 
        return newTokenId; 
    }

    function createListedToken(uint256 tokenId, uint256 price) private {
        idToListedToken[tokenId] = ListedToken(
            tokenId, 
            payable(address(this)), 
            payable(msg.sender),  
            price, 
            LISTED
        ); 

        _transfer(msg.sender, address(this), tokenId); 

        emit TokenListedSuccess(
            tokenId, 
            address(this), 
            msg.sender,
            price, 
            LISTED 
        ); 
    }

    //update listing price
    function updateTokenPrice(uint256 tokenId, uint256 newPrice){
        idToListedToken[tokenId].price = newPrice; 
    }


    function sellListedToken(uint256 tokenId) public payable{
        //trasfer ownership
        //call when status: listed/ auction being sold
        //auction : buyer = highest bid
        //no bid : burned ?
        uint price =  idToListedToken[tokenId].price; 
        address seller = idToListedToken[tokenId].seller; 

        require(msg.value == price, "price paid is not equal to price listed"); 

        _itemsSold.increment(); 

        //trasfer ownership
        _safeTransferFrom(address(this), msg.sender, tokenId, value, data);
        
        //approve marketplace to sell NFTs
        approve(address(this), tokenId);

        //transfer listing fee to marketplace owner 
        payable(owner).transfer(listPrice); 

        //transfer the rest to seller
        payable(seller).transfer(msg.value); 
    }

    function setListedTokenForAuction(uint256 tokenId, uint256 newPrice, ) public {
        updateTokenPrice(tokenId, newPrice); 
    }

}


//security concern 
//check data in postgres with matching one in smart contract

//task
//stored partial data in IPFS