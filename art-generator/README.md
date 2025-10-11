# NFT Art Generator

Generate unique NFT artwork by combining layers (backgrounds, bodies, accessories, etc.)

## How It Works

The generator combines different layers (like Lego pieces) to create unique NFTs:

```
Background + Body + Eyes + Mouth + Accessories = Unique NFT
```

## Setup

### 1. Install Dependencies

```bash
cd art-generator
npm install
```

### 2. Create Your Layers

Create a folder structure like this:

```
layers/
├── backgrounds/
│   ├── blue.png
│   ├── red.png
│   ├── green.png
│   └── purple.png
├── bodies/
│   ├── robot.png
│   ├── alien.png
│   └── human.png
├── eyes/
│   ├── normal.png
│   ├── laser.png
│   └── closed.png
├── mouths/
│   ├── smile.png
│   ├── frown.png
│   └── neutral.png
├── accessories/
│   ├── glasses.png
│   ├── earring.png
│   └── necklace.png
└── hats/
    ├── cap.png
    ├── crown.png
    └── beanie.png
```

**Important:**
- All images must be **PNG format**
- All images must be **same size** (1000x1000 recommended)
- Use **transparent backgrounds** for layers (except background layer)
- Name files descriptively (the name will appear in NFT metadata)

### 3. Configure Generation

Edit `index.js` to customize:

```javascript
const CONFIG = {
  width: 1000,        // Image width
  height: 1000,       // Image height
  totalNFTs: 100,     // How many to generate
  // ...
};
```

### 4. Generate NFTs

```bash
npm run generate
```

## Output

After generation, you'll have:

```
output/           # Generated NFT images
├── 1.png
├── 2.png
├── 3.png
└── ...

metadata/         # NFT metadata (JSON)
├── 1.json
├── 2.json
├── 3.json
└── ...
```

## Example Metadata

```json
{
  "name": "NFT #1",
  "description": "A unique NFT from the collection",
  "image": "1.png",
  "attributes": [
    {
      "trait_type": "Background",
      "value": "blue"
    },
    {
      "trait_type": "Body",
      "value": "robot"
    },
    {
      "trait_type": "Eyes",
      "value": "laser"
    }
  ]
}
```

## Tips for Creating Layers

### Option 1: Use AI Art Generators

**Free Tools:**
- **DALL-E 3** (via Bing Image Creator) - https://www.bing.com/create
- **Midjourney** (free trial) - https://midjourney.com
- **Stable Diffusion** (free, local) - https://stability.ai

**Prompts for layers:**
```
"robot body, transparent background, pixel art style"
"laser eyes, transparent background, cartoon style"
"golden crown, transparent background, 3D render"
```

### Option 2: Use Free Design Tools

- **Canva** - https://canva.com (free templates)
- **Figma** - https://figma.com (free design tool)
- **GIMP** - https://gimp.org (free Photoshop alternative)

### Option 3: Commission Artists

- **Fiverr** - $5-50 per layer
- **Upwork** - Professional artists
- **Reddit r/HungryArtists** - Commission artists

## Rarity System

You can make some traits rarer:

```javascript
{
  name: 'Hat',
  folder: 'hats',
  required: false,
  rarity: 0.3, // Only 30% of NFTs will have a hat
}
```

## Advanced: Trait Rarity Weights

For more control, you can add rarity to individual files:

```
hats/
├── common_cap.png
├── uncommon_beanie.png
├── rare_crown.png
└── legendary_diamond_crown.png
```

Then modify the code to parse rarity from filenames.

## Next Steps

After generating your NFTs:

1. **Review the images** - Make sure they look good
2. **Upload to IPFS** - Use the upload script (see below)
3. **Update backend** - Add NFTs to your database
4. **Deploy contract** - Follow deployment guide
5. **Launch!** 🚀

## Upload to IPFS Script

See `upload-to-ipfs.js` for bulk IPFS upload.
