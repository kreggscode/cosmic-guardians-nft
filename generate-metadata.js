const fs = require('fs');
const path = require('path');

// Metadata for each Cosmic Guardian based on attributes
const guardiansData = [
  {
    id: 1,
    name: "Shadow Sentinel",
    armor: "Black with Silver Accents",
    energy: "Shadow Energy",
    background: "Spiral Galaxy",
    rarity: "Epic",
    description: "A mysterious guardian from the depths of the Shadow Nebula, wielding the ancient power of darkness and silver light."
  },
  {
    id: 2,
    name: "Azure Protector",
    armor: "Blue",
    energy: "Cosmic Energy",
    background: "Nebula Starfield",
    rarity: "Rare",
    description: "Guardian of the Azure Nebula, channeling pure cosmic energy to defend the galaxies from chaos."
  },
  {
    id: 3,
    name: "Bronze Warrior",
    armor: "Bronze",
    energy: "Fire Energy",
    background: "Purple Nebula",
    rarity: "Uncommon",
    description: "A fierce warrior from the Bronze Sector, commanding flames and fire in epic cosmic battles."
  },
  {
    id: 4,
    name: "Crimson Destroyer",
    armor: "Crimson",
    energy: "Lava Energy",
    background: "Fiery Starfield",
    rarity: "Epic",
    description: "The legendary Crimson Destroyer, wielding molten lava energy from the core of dying stars."
  },
  {
    id: 5,
    name: "Frost Guardian",
    armor: "Cyan",
    energy: "Ice Energy",
    background: "Nebula Cosmos",
    rarity: "Rare",
    description: "Master of ice and frost, protecting the frozen sectors of the cosmos with crystalline power."
  },
  {
    id: 6,
    name: "Emerald Keeper",
    armor: "Emerald",
    energy: "Nature Energy",
    background: "Deep Galaxy",
    rarity: "Rare",
    description: "Guardian of life and nature, channeling the essence of cosmic forests and living nebulas."
  },
  {
    id: 7,
    name: "Golden Champion",
    armor: "Golden",
    energy: "Divine Energy",
    background: "Nebula Starfield",
    rarity: "Legendary",
    description: "The supreme Golden Champion, blessed with divine cosmic energy and unmatched power."
  },
  {
    id: 8,
    name: "Verdant Warden",
    armor: "Green",
    energy: "Life Energy",
    background: "Nebula Starfield",
    rarity: "Uncommon",
    description: "Warden of the verdant galaxies, protecting all living cosmic entities with life energy."
  },
  {
    id: 9,
    name: "Magenta Phantom",
    armor: "Magenta",
    energy: "Shadow Energy",
    background: "Deep Space",
    rarity: "Epic",
    description: "A phantom guardian dwelling in deep space, wielding mysterious shadow powers."
  },
  {
    id: 10,
    name: "Inferno Knight",
    armor: "Orange",
    energy: "Fire Energy",
    background: "Stardust Nebula",
    rarity: "Uncommon",
    description: "The Inferno Knight, blazing through stardust clouds with unstoppable fire energy."
  },
  {
    id: 11,
    name: "Violet Sovereign",
    armor: "Purple",
    energy: "Mystic Energy",
    background: "Nebula Starfield",
    rarity: "Rare",
    description: "Sovereign of the violet cosmos, commanding mystic energies beyond mortal comprehension."
  },
  {
    id: 12,
    name: "Scarlet Avenger",
    armor: "Red",
    energy: "Rage Energy",
    background: "Nebula Starfield",
    rarity: "Uncommon",
    description: "The Scarlet Avenger, fueled by cosmic rage and an unbreakable will to protect."
  },
  {
    id: 13,
    name: "Storm Bringer",
    armor: "Silver",
    energy: "Lightning Energy",
    background: "Swirling Galaxy",
    rarity: "Epic",
    description: "Master of cosmic storms, wielding lightning from the heart of swirling galaxies."
  },
  {
    id: 14,
    name: "Plasma Sentinel",
    armor: "Teal",
    energy: "Plasma Energy",
    background: "Cosmic Nebula",
    rarity: "Rare",
    description: "Guardian of plasma fields, controlling the raw energy that powers the stars."
  },
  {
    id: 15,
    name: "Celestial Paragon",
    armor: "White",
    energy: "Light Energy",
    background: "Galactic Constellations",
    rarity: "Legendary",
    description: "The ultimate Celestial Paragon, embodiment of pure light and cosmic perfection."
  }
];

// Rarity to price mapping (in ETH)
const rarityPrices = {
  "Common": "0.03",
  "Uncommon": "0.05",
  "Rare": "0.08",
  "Epic": "0.12",
  "Legendary": "0.20"
};

// Create metadata directory
const metadataDir = path.join(__dirname, 'art-generator', 'metadata');
if (!fs.existsSync(metadataDir)) {
  fs.mkdirSync(metadataDir, { recursive: true });
}

console.log('🎨 Cosmic Guardians - Metadata Generator\n');

// Generate metadata for each guardian
guardiansData.forEach(guardian => {
  const metadata = {
    name: `Cosmic Guardian #${guardian.id} - ${guardian.name}`,
    description: guardian.description,
    image: `${guardian.id}.jpg`, // Will be replaced with IPFS hash later
    external_url: `https://cosmicguardians.io/guardian/${guardian.id}`,
    attributes: [
      {
        trait_type: "Guardian Name",
        value: guardian.name
      },
      {
        trait_type: "Armor Type",
        value: guardian.armor
      },
      {
        trait_type: "Energy Type",
        value: guardian.energy
      },
      {
        trait_type: "Background",
        value: guardian.background
      },
      {
        trait_type: "Rarity",
        value: guardian.rarity
      },
      {
        trait_type: "Power Level",
        value: Math.floor(Math.random() * 50) + 50 // 50-100
      },
      {
        trait_type: "Generation",
        value: "Genesis"
      }
    ],
    price: rarityPrices[guardian.rarity]
  };

  const filename = path.join(metadataDir, `${guardian.id}.json`);
  fs.writeFileSync(filename, JSON.stringify(metadata, null, 2));
  
  console.log(`✅ Generated metadata for #${guardian.id} - ${guardian.name} (${guardian.rarity})`);
});

// Create collection metadata
const collectionMetadata = {
  name: "Cosmic Guardians",
  description: "A legendary collection of 15 unique cosmic warriors, each protecting different sectors of the universe with their unique powers and abilities.",
  image: "collection.jpg",
  external_link: "https://cosmicguardians.io",
  seller_fee_basis_points: 500, // 5% royalty
  fee_recipient: "0x0000000000000000000000000000000000000000" // Update with your wallet
};

fs.writeFileSync(
  path.join(metadataDir, '_collection.json'),
  JSON.stringify(collectionMetadata, null, 2)
);

console.log('\n🎉 All metadata generated successfully!');
console.log(`📁 Location: ${metadataDir}`);
console.log('\n📊 Collection Summary:');
console.log(`   Total Guardians: 15`);
console.log(`   Legendary: 2 (0.20 ETH each)`);
console.log(`   Epic: 4 (0.12 ETH each)`);
console.log(`   Rare: 5 (0.08 ETH each)`);
console.log(`   Uncommon: 4 (0.05 ETH each)`);
console.log('\n💰 Total Collection Value: ~1.35 ETH (~$4,050)');
console.log('\n📝 Next steps:');
console.log('   1. Review metadata files in art-generator/metadata/');
console.log('   2. Run: cd art-generator && npm run upload');
console.log('   3. Upload images to IPFS');
