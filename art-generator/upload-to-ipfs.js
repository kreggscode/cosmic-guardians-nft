const axios = require('axios');
const fs = require('fs-extra');
const path = require('path');
const FormData = require('form-data');

// Pinata configuration
const PINATA_API_KEY = process.env.PINATA_API_KEY || 'your_pinata_api_key';
const PINATA_SECRET_KEY = process.env.PINATA_SECRET_KEY || 'your_pinata_secret_key';

const CONFIG = {
  imagesDir: './output',
  metadataDir: './metadata',
  uploadedDataFile: './uploaded.json',
};

/**
 * Upload a single file to IPFS via Pinata
 */
async function uploadFileToPinata(filePath, filename) {
  const url = 'https://api.pinata.cloud/pinning/pinFileToIPFS';
  
  const formData = new FormData();
  formData.append('file', fs.createReadStream(filePath), filename);
  
  const metadata = JSON.stringify({
    name: filename,
  });
  formData.append('pinataMetadata', metadata);

  try {
    const response = await axios.post(url, formData, {
      headers: {
        'Content-Type': `multipart/form-data; boundary=${formData.getBoundary()}`,
        pinata_api_key: PINATA_API_KEY,
        pinata_secret_api_key: PINATA_SECRET_KEY,
      },
      maxContentLength: Infinity,
      maxBodyLength: Infinity,
    });

    return {
      hash: response.data.IpfsHash,
      url: `ipfs://${response.data.IpfsHash}`,
      gateway: `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`,
    };
  } catch (error) {
    console.error(`Failed to upload ${filename}:`, error.response?.data || error.message);
    throw error;
  }
}

/**
 * Upload JSON metadata to IPFS
 */
async function uploadJSONToPinata(data, name) {
  const url = 'https://api.pinata.cloud/pinning/pinJSONToIPFS';

  try {
    const response = await axios.post(
      url,
      {
        pinataContent: data,
        pinataMetadata: { name },
      },
      {
        headers: {
          'Content-Type': 'application/json',
          pinata_api_key: PINATA_API_KEY,
          pinata_secret_api_key: PINATA_SECRET_KEY,
        },
      }
    );

    return {
      hash: response.data.IpfsHash,
      url: `ipfs://${response.data.IpfsHash}`,
      gateway: `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`,
    };
  } catch (error) {
    console.error(`Failed to upload JSON ${name}:`, error.response?.data || error.message);
    throw error;
  }
}

/**
 * Upload all images to IPFS
 */
async function uploadImages() {
  console.log('📤 Uploading images to IPFS...\n');

  const imageFiles = fs.readdirSync(CONFIG.imagesDir)
    .filter(file => file.endsWith('.jpg') || file.endsWith('.png'))
    .sort((a, b) => {
      const numA = parseInt(a.replace(/\.(jpg|png)/, ''));
      const numB = parseInt(b.replace(/\.(jpg|png)/, ''));
      return numA - numB;
    });

  const uploadedImages = {};

  for (const file of imageFiles) {
    const tokenId = file.replace(/\.(jpg|png)/, '');
    const filePath = path.join(CONFIG.imagesDir, file);

    try {
      console.log(`⏳ Uploading image ${tokenId}...`);
      const result = await uploadFileToPinata(filePath, file);
      
      uploadedImages[tokenId] = result;
      
      console.log(`✅ Uploaded image ${tokenId}`);
      console.log(`   IPFS: ${result.url}`);
      console.log(`   Gateway: ${result.gateway}\n`);

      // Small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 500));
    } catch (error) {
      console.error(`❌ Failed to upload image ${tokenId}\n`);
    }
  }

  return uploadedImages;
}

/**
 * Upload all metadata to IPFS
 */
async function uploadMetadata(uploadedImages) {
  console.log('\n📤 Uploading metadata to IPFS...\n');

  const metadataFiles = fs.readdirSync(CONFIG.metadataDir)
    .filter(file => file.endsWith('.json') && !file.startsWith('_'))
    .sort((a, b) => {
      const numA = parseInt(a.replace('.json', ''));
      const numB = parseInt(b.replace('.json', ''));
      return numA - numB;
    });

  const uploadedMetadata = {};

  for (const file of metadataFiles) {
    const tokenId = file.replace('.json', '');
    const filePath = path.join(CONFIG.metadataDir, file);

    try {
      // Read metadata
      const metadata = await fs.readJson(filePath);

      // Update image URL to IPFS hash
      if (uploadedImages[tokenId]) {
        metadata.image = uploadedImages[tokenId].url;
      }

      console.log(`⏳ Uploading metadata ${tokenId}...`);
      const result = await uploadJSONToPinata(metadata, `metadata-${tokenId}.json`);
      
      uploadedMetadata[tokenId] = {
        ...result,
        metadata,
      };
      
      console.log(`✅ Uploaded metadata ${tokenId}`);
      console.log(`   IPFS: ${result.url}`);
      console.log(`   Gateway: ${result.gateway}\n`);

      // Small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 500));
    } catch (error) {
      console.error(`❌ Failed to upload metadata ${tokenId}\n`);
    }
  }

  return uploadedMetadata;
}

/**
 * Main upload function
 */
async function uploadToIPFS() {
  console.log('🚀 IPFS Upload Script Starting...\n');

  // Check API keys
  if (PINATA_API_KEY === 'your_pinata_api_key') {
    console.error('❌ Please set PINATA_API_KEY environment variable');
    console.log('\nSet it in your terminal:');
    console.log('Windows: set PINATA_API_KEY=your_key');
    console.log('Mac/Linux: export PINATA_API_KEY=your_key');
    return;
  }

  try {
    // Step 1: Upload images
    const uploadedImages = await uploadImages();

    // Step 2: Upload metadata (with updated image URLs)
    const uploadedMetadata = await uploadMetadata(uploadedImages);

    // Step 3: Save results
    const results = {
      uploadedAt: new Date().toISOString(),
      totalImages: Object.keys(uploadedImages).length,
      totalMetadata: Object.keys(uploadedMetadata).length,
      images: uploadedImages,
      metadata: uploadedMetadata,
    };

    await fs.writeJson(CONFIG.uploadedDataFile, results, { spaces: 2 });

    console.log('\n🎉 Upload Complete!');
    console.log(`   - Images uploaded: ${results.totalImages}`);
    console.log(`   - Metadata uploaded: ${results.totalMetadata}`);
    console.log(`   - Results saved to: ${CONFIG.uploadedDataFile}`);
    console.log('\n📝 Next steps:');
    console.log('   1. Review uploaded.json');
    console.log('   2. Add NFTs to your backend database');
    console.log('   3. Deploy your smart contract');
  } catch (error) {
    console.error('\n❌ Upload failed:', error.message);
  }
}

// Run the upload
uploadToIPFS().catch(console.error);
