

const { expect, should } = require("chai"); 
const { ethers } = require("hardhat");

describe("AuctionNFT Contract", function () {
    //variables
    let AuctionContract, owner, seller, bidder1, bidder2; 
    
    //before each 
    before(async () => {
        [owner, seller, bidder1, bidder2] = await ethers.getSigners(); 

        const NFTRegistry = await ethers.getContractFactory("NFTRegistry");
        const registry = await NFTRegistry.deploy();
        await registry.waitForDeployment();
        const registryAddress = await registry.getAddress();

        const AuctionNFT = await ethers.getContractFactory("AuctionNFT");
        AuctionContract = await AuctionNFT.deploy(registryAddress);
        await AuctionContract.waitForDeployment();

        // const registry = await ethers.deployContract("NFTRegistry"); 
        // const registryAddress = await registry.getAddress();

        // AuctionContract = await ethers.deployContract("AuctionNFT", registryAddress); 
    });

    describe("Minting NFT", function() {
        let tokenURI = "ipfs://test-uri";
        let nftPrice = ethers.parseEther("1"); 
        let auctionDuration = 2; 
        let marketFee = ethers.parseEther("0.01");
        let receipt;

        beforeEach(async () => {
            const tx = await AuctionContract.mint(tokenURI, nftPrice, auctionDuration, { value: marketFee });
            receipt = await tx.wait(); 
        })
       
        it("Sub test 1: check if contract owns NFT", async () => {
            expect(await AuctionContract.ownerOf(1)).to.equal(AuctionContract.target); 
        });

        it("Sub test 2: token id valid ", async () => {
            const event = receipt.logs.find((log) => log.args[2] > 0);
            expect(event).to.not.be.undefined;
        });

        it("Sub test 3: event was found", async () => {
            const event = receipt.logs.find((log) => log.topics[0] === AuctionContract.interface.getEvent("Transfer").topic); 
            expect(event).to.be.undefined; 
        });

    }); 
})

