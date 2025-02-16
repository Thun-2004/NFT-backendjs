//local blockchain for testing 
import hre from "hardhat"; 

async function main() {
    try {
        const AuctionContract = await hre.ethers.getContractFactory("AuctionNFT"); 
        const contract = await AuctionContract.deploy(); 
        await contract.waitForDeployment(); 

        console.log("Contract deployed to:", await contract.getAddress());
    }catch (error) {
        console.error(error); 
        process.exit(1); 
    }
}

main(); 