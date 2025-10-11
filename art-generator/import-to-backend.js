const axios = require('axios');
const fs = require('fs-extra');
const path = require('path');

// Configuration
const CONFIG = {
  backendUrl: process.env.BACKEND_URL || 'http://localhost:3001',
  uploadedDataFile: './uploaded.json',
  pricePerNFT: '50000000000000000', // 0.05 ETH in wei
};

/**
 * Import NFTs to backend database
 */
async function importNFTsToBackend() {
  console.log('📤 Importing NFTs to backend...\n');

  // Check if uploaded.json exists
  if (!fs.existsSync(CONFIG.uploadedDataFile)) {
    console.error('❌ uploaded.json not found!');
    console.log('Please run upload-to-ipfs.js first to upload images to IPFS.');
    return;
  }

  // Read uploaded data
  const uploadedData = await fs.readJson(CONFIG.uploadedDataFile);
  const { images, metadata } = uploadedData;

  if (!images || !metadata) {
    console.error('❌ Invalid uploaded.json format');
    return;
  }

  console.log(`📊 Found ${Object.keys(metadata).length} NFTs to import\n`);

  // Import each NFT
  let successCount = 0;
  let failCount = 0;

  for (const [tokenId, nftData] of Object.entries(metadata)) {
    try {
      const imageData = images[tokenId];
      
      if (!imageData) {
        console.error(`❌ No image data for token ${tokenId}`);
        failCount++;
        continue;
      }

      // Prepare NFT data for backend
      const nftPayload = {
        tokenId: parseInt(tokenId),
        name: nftData.metadata.name,
        description: nftData.metadata.description,
        image: imageData.url, // ipfs://...
        imageHash: imageData.hash,
        metadata: nftData.url, // ipfs://...
        metadataHash: nftData.hash,
        attributes: nftData.metadata.attributes || [],
        price: CONFIG.pricePerNFT,
        minted: false,
      };

      console.log(`⏳ Importing NFT #${tokenId}...`);

      // Send to backend API
      const response = await axios.post(
        `${CONFIG.backendUrl}/api/nft/create`,
        nftPayload,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data.success) {
        console.log(`✅ Imported NFT #${tokenId}: ${nftData.metadata.name}`);
        successCount++;
      } else {
        console.error(`❌ Failed to import NFT #${tokenId}:`, response.data.error);
        failCount++;
      }

      // Small delay to avoid overwhelming the server
      await new Promise(resolve => setTimeout(resolve, 100));
    } catch (error) {
      console.error(`❌ Error importing NFT #${tokenId}:`, error.response?.data || error.message);
      failCount++;
    }
  }

  console.log('\n🎉 Import Complete!');
  console.log(`   ✅ Success: ${successCount}`);
  console.log(`   ❌ Failed: ${failCount}`);
  console.log(`   📊 Total: ${successCount + failCount}`);

  if (successCount > 0) {
    console.log('\n📝 Next steps:');
    console.log('   1. Start your frontend: cd ../frontend && npm run dev');
    console.log('   2. Visit http://localhost:5173');
    console.log('   3. Connect your wallet and test minting!');
  }
}

// Run the import
importNFTsToBackend().catch(console.error);
