// import { expect } from "chai";
// import hre from "hardhat";
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("AuctionNFT Contract", function () {
    let auctionNFT, owner, seller, bidder1, bidder2;
    const auctionDuration = 60 * 60; // 1 hour in seconds
    const marketFee = ethers.parseEther("0.01");
    const nftPrice = ethers.parseEther("1");

    beforeEach(async () => {
        [owner, seller, bidder1, bidder2] = await ethers.getSigners();

        const BaseNFT = await ethers.getContractFactory("BaseNFT");
        const baseNFT = await BaseNFT.deploy();

        const AuctionNFT = await ethers.getContractFactory("AuctionNFT");
        auctionNFT = await AuctionNFT.deploy();
    });
    it("should allow a seller to mint an NFT and list it for auction", async () => {
        const tokenURI = "ipfs://test-uri";
    
        // Mint an NFT
        const tx = await auctionNFT.connect(seller).mint(tokenURI, nftPrice, auctionDuration, { value: marketFee });
        const receipt = await tx.wait();
    
        // Extract the minted token ID from the Transfer event
        // const event = receipt.logs.find((log) => log.event === "Transfer");
        // const tokenId = event.args[2]; // Extract tokenId from Transfer event
    
        // console.log("Minted Token ID:", tokenId); // ✅ Debugging output
    
        // // Check if the contract owns the NFT
        // const owner = await auctionNFT.ownerOf(tokenId);
        // expect(owner).to.equal(auctionNFT.target); 
        const event = receipt.logs.find((log) => log.topics[0] === auctionNFT.interface.getEvent("Transfer").topic);
        expect(event).to.not.be.undefined; // Ensure event was found

        const tokenId = parseInt(event.data, 16); // Convert tokenId from hex to integer
        console.log("Minted Token ID:", tokenId); // ✅ Debugging output

        // Ensure tokenId is valid
        expect(tokenId).to.be.greaterThan(0);

        // Check if the contract owns the NFT
        const owner = await auctionNFT.ownerOf(tokenId);
        expect(owner).to.equal(auctionNFT.target);
    });

    // it("should allow a seller to mint an NFT and list it for auction", async () => {
    //     const tokenURI = "ipfs://test-uri";
    //     await expect(
    //         auctionNFT.connect(seller).mint(tokenURI, nftPrice, auctionDuration, { value: marketFee })
    //     ); 
    //     const owner = await auctionNFT.ownerOf(1);
    //     expect(owner).to.equal(auctionNFT.target); 
    //     // .to.emit(auctionNFT, "Transfer").withArgs(ethers.AddressZero, seller.address, 1);

    //     // const auctionData = await auctionNFT.getCurrentPrice(1);
    //     // expect(auctionData).to.equal(nftPrice);
    // });

    it("should allow users to place a bid higher than the current price", async () => {
        const tokenURI = "ipfs://test-uri";
        await auctionNFT.connect(seller).mint(tokenURI, nftPrice, auctionDuration, { value: marketFee });

        const bidAmount = ethers.parseEther("1.5");
        await auctionNFT.connect(bidder1).placeBid(1, { value: bidAmount });

        const highestBid = await auctionNFT.getCurrentPrice(1);
        expect(highestBid).to.equal(bidAmount);
    });

    it("should refund the previous highest bidder when a new bid is placed", async () => {
        const tokenURI = "ipfs://test-uri";
        await auctionNFT.connect(seller).mint(tokenURI, nftPrice, auctionDuration, { value: marketFee });

        const firstBid = ethers.parseEther("1.2");
        const secondBid = ethers.parseEther("1.5");

        await auctionNFT.connect(bidder1).placeBid(1, { value: firstBid });

        await expect(
            auctionNFT.connect(bidder2).placeBid(1, { value: secondBid })
        ).to.changeEtherBalances([bidder1, auctionNFT], [firstBid, -firstBid]);
    });

    it("should not allow bids lower than the current highest bid", async () => {
        const tokenURI = "ipfs://test-uri";
        await auctionNFT.connect(seller).mint(tokenURI, nftPrice, auctionDuration, { value: marketFee });

        const firstBid = ethers.parseEther("1.2");
        await auctionNFT.connect(bidder1).placeBid(1, { value: firstBid });

        const lowerBid = ethers.parseEther("1.1");
        await expect(
            auctionNFT.connect(bidder2).placeBid(1, { value: lowerBid })
        ).to.be.revertedWith("Bid too low");
    });

    it("should allow the seller to end the auction and transfer NFT to the highest bidder", async () => {
        const tokenURI = "ipfs://test-uri";
        await auctionNFT.connect(seller).mint(tokenURI, nftPrice, auctionDuration, { value: marketFee });

        const bidAmount = ethers.parseEther("1.5");
        await auctionNFT.connect(bidder1).placeBid(1, { value: bidAmount });

        await ethers.provider.send("evm_increaseTime", [auctionDuration]); // Fast forward time
        await ethers.provider.send("evm_mine");

        await auctionNFT.connect(seller).endAuction(1);

        const newOwner = await auctionNFT.ownerOf(1);
        expect(newOwner).to.equal(bidder1.address);
    });
});
