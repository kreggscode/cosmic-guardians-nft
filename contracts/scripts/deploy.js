const hre = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
  console.log("🚀 Starting NFT contract deployment...\n");

  // Get the deployer account
  const [deployer] = await hre.ethers.getSigners();
  console.log("📝 Deploying contracts with account:", deployer.address);
  
  const balance = await hre.ethers.provider.getBalance(deployer.address);
  console.log("💰 Account balance:", hre.ethers.formatEther(balance), "ETH\n");

  // Contract parameters
  const NAME = "My Awesome NFT Collection";
  const SYMBOL = "MANFT";
  const MINT_PRICE = hre.ethers.parseEther("0.05"); // 0.05 ETH per NFT
  const MAX_SUPPLY = 10000; // Maximum 10,000 NFTs
  const SIGNER_ADDRESS = deployer.address; // Use deployer as signer (can be changed later)

  console.log("📋 Contract Parameters:");
  console.log("   Name:", NAME);
  console.log("   Symbol:", SYMBOL);
  console.log("   Mint Price:", hre.ethers.formatEther(MINT_PRICE), "ETH");
  console.log("   Max Supply:", MAX_SUPPLY);
  console.log("   Signer Address:", SIGNER_ADDRESS);
  console.log();

  // Deploy LazyNFT contract
  console.log("⏳ Deploying LazyNFT contract...");
  const LazyNFT = await hre.ethers.getContractFactory("LazyNFT");
  const lazyNFT = await LazyNFT.deploy(
    NAME,
    SYMBOL,
    MINT_PRICE,
    MAX_SUPPLY,
    SIGNER_ADDRESS
  );

  await lazyNFT.waitForDeployment();
  const contractAddress = await lazyNFT.getAddress();

  console.log("✅ LazyNFT deployed to:", contractAddress);
  console.log();

  // Save deployment info
  const deploymentInfo = {
    network: hre.network.name,
    contractAddress: contractAddress,
    deployer: deployer.address,
    name: NAME,
    symbol: SYMBOL,
    mintPrice: MINT_PRICE.toString(),
    maxSupply: MAX_SUPPLY,
    signerAddress: SIGNER_ADDRESS,
    deployedAt: new Date().toISOString(),
    blockNumber: await hre.ethers.provider.getBlockNumber()
  };

  const deploymentsDir = path.join(__dirname, "../deployments");
  if (!fs.existsSync(deploymentsDir)) {
    fs.mkdirSync(deploymentsDir, { recursive: true });
  }

  const filename = `${hre.network.name}-${Date.now()}.json`;
  const filepath = path.join(deploymentsDir, filename);
  fs.writeFileSync(filepath, JSON.stringify(deploymentInfo, null, 2));

  console.log("💾 Deployment info saved to:", filepath);
  console.log();

  // Verify contract on Etherscan (if not local network)
  if (hre.network.name !== "hardhat" && hre.network.name !== "localhost") {
    console.log("⏳ Waiting for block confirmations...");
    await lazyNFT.deploymentTransaction().wait(6);

    console.log("🔍 Verifying contract on Etherscan...");
    try {
      await hre.run("verify:verify", {
        address: contractAddress,
        constructorArguments: [
          NAME,
          SYMBOL,
          MINT_PRICE,
          MAX_SUPPLY,
          SIGNER_ADDRESS
        ],
      });
      console.log("✅ Contract verified on Etherscan");
    } catch (error) {
      console.log("⚠️  Verification failed:", error.message);
    }
  }

  console.log("\n🎉 Deployment complete!");
  console.log("\n📝 Next steps:");
  console.log("1. Update backend .env with CONTRACT_ADDRESS:", contractAddress);
  console.log("2. Update frontend .env with VITE_CONTRACT_ADDRESS:", contractAddress);
  console.log("3. Start the backend server");
  console.log("4. Start the frontend application");
  console.log("\n💡 To mint NFTs, users will need to:");
  console.log("   - Connect their wallet");
  console.log("   - Get a signed voucher from your backend");
  console.log("   - Call lazyMint() with payment");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
