//local blockchain for testing 
import hre from "hardhat"; 

async function main() {
    try {
        const NFTRegistry = await hre.ethers.getContractFactory("NFTRegistry");
        const registry = await NFTRegistry.deploy();
        await registry.waitForDeployment();
        const registryAddress = await registry.getAddress();

        const AuctionContract = await hre.ethers.getContractFactory("AuctionNFT"); 
        const contract = await AuctionContract.deploy(registryAddress); 
        await contract.waitForDeployment(); 

        console.log("Contract deployed to:", await contract.getAddress());
    }catch (error) {
        console.error(error); 
        process.exit(1); 
    }
}

main(); 