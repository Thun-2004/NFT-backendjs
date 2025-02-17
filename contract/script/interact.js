
// interaction with the contract using ethers.js

import hre from "hardhat";
import { ethers } from "ethers"; 

async function main() {
  try {
    // Get the ContractFactory of your SimpleContract
    
    const SimpleContract = await hre.ethers.getContractFactory("AuctionNFT");

    // Connect to the deployed contract
    const contractAddress = "0xE6E340D132b5f46d1e472DebcD681B2aBc16e57E"; // Replace with your deployed contract address
    const contract = await SimpleContract.attach(contractAddress);

    const tokenURI = "ipfs://test-uri";
    const nftPrice = ethers.parseEther("1");
    const auctionDuration = 20; // 1 hour in seconds
    const marketFee = ethers.parseEther("0.01");

    // contract.mint(tokenURI, nftPrice, auctionDuration, { value: marketFee }); 
    // console.log not show token id since mint didn;t wait for the transaction to be finished so it skips the console.log
    const tx = await contract.mint(tokenURI, nftPrice, auctionDuration, { value: marketFee });
    const receipt = await tx.wait();

    // console.log("Transaction Receipt:", receipt);
    const transferEvents = await contract.queryFilter("Transfer", 0, "latest");

    console.log("Receipt log:", receipt.logs);

    // if (transferEvents.length === 0) {
    //     console.log("⚠️ No past Transfer events found!");
    // } else {
    //     console.log("🔍 Found past Transfer events:", transferEvents);
    // }


    // console.log("Transaction Hash:", receipt.hash); 
    // console.log("Log:", receipt.gasUsed); 

    let tokenId;
    for (const log of receipt.logs) {
      if (log.fragment.name === "Transfer") {
        tokenId = log.args[2]; // `tokenId` is the 3rd argument (index 2)
        console.log("Token ID:", tokenId.toString());
        break; // Stop after finding the first Transfer event
      }
    }

    // if (!tokenId) {
    //   console.log("⚠️ Token ID not found in logs.");
    // }

  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

main();