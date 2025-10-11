const { createCanvas, loadImage } = require('canvas');
const fs = require('fs-extra');
const path = require('path');

// Configuration
const CONFIG = {
  width: 1000,
  height: 1000,
  totalNFTs: 100, // How many NFTs to generate
  outputDir: './output',
  metadataDir: './metadata',
  layersDir: './layers',
};

// Layer configuration - define your traits here
const LAYERS = [
  {
    name: 'Background',
    folder: 'backgrounds',
    required: true,
  },
  {
    name: 'Body',
    folder: 'bodies',
    required: true,
  },
  {
    name: 'Eyes',
    folder: 'eyes',
    required: true,
  },
  {
    name: 'Mouth',
    folder: 'mouths',
    required: true,
  },
  {
    name: 'Accessory',
    folder: 'accessories',
    required: false, // Optional layer
    rarity: 0.5, // 50% chance
  },
  {
    name: 'Hat',
    folder: 'hats',
    required: false,
    rarity: 0.3, // 30% chance
  },
];

// Rarity weights for each trait (optional)
const RARITY_WEIGHTS = {
  common: 60,
  uncommon: 25,
  rare: 10,
  legendary: 5,
};

/**
 * Get all files from a layer folder
 */
function getLayerFiles(layerFolder) {
  const folderPath = path.join(CONFIG.layersDir, layerFolder);
  
  if (!fs.existsSync(folderPath)) {
    console.warn(`⚠️  Layer folder not found: ${folderPath}`);
    return [];
  }

  return fs.readdirSync(folderPath)
    .filter(file => file.endsWith('.png'))
    .map(file => ({
      name: file.replace('.png', ''),
      path: path.join(folderPath, file),
    }));
}

/**
 * Select random trait based on rarity
 */
function selectRandomTrait(traits, rarity = 1.0) {
  if (Math.random() > rarity) {
    return null; // Skip this layer
  }

  if (traits.length === 0) return null;

  const randomIndex = Math.floor(Math.random() * traits.length);
  return traits[randomIndex];
}

/**
 * Generate a single NFT
 */
async function generateNFT(tokenId) {
  const canvas = createCanvas(CONFIG.width, CONFIG.height);
  const ctx = canvas.getContext('2d');

  const attributes = [];
  const usedLayers = [];

  // Process each layer
  for (const layer of LAYERS) {
    const traits = getLayerFiles(layer.folder);
    
    if (traits.length === 0 && layer.required) {
      console.error(`❌ Required layer "${layer.name}" has no images!`);
      continue;
    }

    const selectedTrait = selectRandomTrait(traits, layer.rarity || 1.0);

    if (selectedTrait) {
      try {
        const image = await loadImage(selectedTrait.path);
        ctx.drawImage(image, 0, 0, CONFIG.width, CONFIG.height);

        attributes.push({
          trait_type: layer.name,
          value: selectedTrait.name,
        });

        usedLayers.push(`${layer.name}: ${selectedTrait.name}`);
      } catch (error) {
        console.error(`❌ Failed to load image: ${selectedTrait.path}`, error.message);
      }
    }
  }

  // Save the image
  const outputPath = path.join(CONFIG.outputDir, `${tokenId}.png`);
  const buffer = canvas.toBuffer('image/png');
  await fs.writeFile(outputPath, buffer);

  // Generate metadata
  const metadata = {
    name: `NFT #${tokenId}`,
    description: `A unique NFT from the collection`,
    image: `${tokenId}.png`, // Will be replaced with IPFS hash later
    attributes,
  };

  // Save metadata
  const metadataPath = path.join(CONFIG.metadataDir, `${tokenId}.json`);
  await fs.writeJson(metadataPath, metadata, { spaces: 2 });

  return {
    tokenId,
    layers: usedLayers,
    attributes,
  };
}

/**
 * Main generation function
 */
async function generateCollection() {
  console.log('🎨 NFT Art Generator Starting...\n');

  // Create output directories
  await fs.ensureDir(CONFIG.outputDir);
  await fs.ensureDir(CONFIG.metadataDir);

  // Check if layers directory exists
  if (!fs.existsSync(CONFIG.layersDir)) {
    console.error(`❌ Layers directory not found: ${CONFIG.layersDir}`);
    console.log('\n📝 Please create the following folder structure:');
    console.log('layers/');
    LAYERS.forEach(layer => {
      console.log(`  ├── ${layer.folder}/`);
      console.log(`  │   ├── trait1.png`);
      console.log(`  │   ├── trait2.png`);
      console.log(`  │   └── ...`);
    });
    return;
  }

  console.log(`📊 Configuration:`);
  console.log(`   - Image size: ${CONFIG.width}x${CONFIG.height}`);
  console.log(`   - Total NFTs: ${CONFIG.totalNFTs}`);
  console.log(`   - Layers: ${LAYERS.length}`);
  console.log();

  const generated = [];
  const duplicates = new Set();

  for (let i = 1; i <= CONFIG.totalNFTs; i++) {
    try {
      const nft = await generateNFT(i);
      
      // Check for duplicates (based on attributes)
      const signature = JSON.stringify(nft.attributes);
      if (duplicates.has(signature)) {
        console.log(`⚠️  NFT #${i} is a duplicate, regenerating...`);
        i--; // Retry this NFT
        continue;
      }

      duplicates.add(signature);
      generated.push(nft);

      console.log(`✅ Generated NFT #${i}`);
      console.log(`   Layers: ${nft.layers.join(', ')}`);
    } catch (error) {
      console.error(`❌ Failed to generate NFT #${i}:`, error.message);
    }
  }

  // Generate collection metadata
  const collectionMetadata = {
    name: 'My NFT Collection',
    description: 'A unique collection of generated NFTs',
    total: generated.length,
    generatedAt: new Date().toISOString(),
  };

  await fs.writeJson(
    path.join(CONFIG.metadataDir, '_collection.json'),
    collectionMetadata,
    { spaces: 2 }
  );

  console.log('\n🎉 Generation Complete!');
  console.log(`   - Generated: ${generated.length} NFTs`);
  console.log(`   - Images: ${CONFIG.outputDir}/`);
  console.log(`   - Metadata: ${CONFIG.metadataDir}/`);
  console.log('\n📝 Next steps:');
  console.log('   1. Review the generated images');
  console.log('   2. Upload to IPFS using the upload script');
  console.log('   3. Deploy your NFT contract');
}

// Run the generator
generateCollection().catch(console.error);
