# Final Setup Guide - You're Almost Ready! 🚀

## ✅ What You Have

- ✅ **15 Beautiful Cosmic Guardians Images**
- ✅ **WalletConnect Project ID:** 3044ade6ab3e5bbbc46d23a19db94321
- ✅ **Pinata API Keys** (configured)
- ✅ **Infura API Key** (configured)
- ✅ **Etherscan API Key** (configured)
- ✅ **MetaMask Private Key** (you mentioned you have it)

---

## 🎯 Quick Setup (30 Minutes)

### Step 1: Organize Your Images (5 minutes)

Run this PowerShell script to rename and organize your images:

```powershell
cd "c:\Users\kreg9\Downloads\kreggscode\windsurf\NFT project"
.\rename-images.ps1
```

This will:
- Copy all 15 images to `art-generator/output/`
- Rename them to 1.jpg, 2.jpg, 3.jpg, ... 15.jpg
- Create a mapping file

---

### Step 2: Generate Metadata (2 minutes)

```bash
node generate-metadata.js
```

This will create metadata for all 15 Cosmic Guardians with:
- Unique names (Shadow Sentinel, Azure Protector, etc.)
- Attributes (armor type, energy type, rarity)
- Descriptions
- Pricing based on rarity

---

### Step 3: Create Environment Files (5 minutes)

#### A. Create `backend/.env`

Create a new file: `backend/.env`

```env
# Server
PORT=3001
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/cosmic-guardians

# Blockchain (UPDATE AFTER CONTRACT DEPLOYMENT)
CONTRACT_ADDRESS=
CHAIN_ID=137
RPC_URL=https://polygon-mainnet.infura.io/v3/35d7e3d9e86943c295610f44c0b37815
PRIVATE_KEY=YOUR_METAMASK_PRIVATE_KEY_HERE

# IPFS - Pinata
PINATA_API_KEY=b83b6a4fd5871a0c9c09
PINATA_SECRET_KEY=5536173b410abe5209116965f38f9a58eafeb2bc65d4a93ab3fd1159c0e5fbaa
PINATA_JWT=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJiYzU5MzY1Mi01MjAwLTRkZWYtYjc0YS1lZGJjYmE4YjdhYjgiLCJlbWFpbCI6ImtyZWc5ZGFAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjEsImlkIjoiRlJBMSJ9LHsiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjEsImlkIjoiTllDMSJ9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6ImI4M2I2YTRmZDU4NzFhMGM5YzA5Iiwic2NvcGVkS2V5U2VjcmV0IjoiNTUzNjE3M2I0MTBhYmU1MjA5MTE2OTY1ZjM4ZjlhNThlYWZlYjJiYzY1ZDRhOTNhYjNmZDExNTljMGU1ZmJhYSIsImV4cCI6MTc5MTcwMTY0Mn0.MY3sseDYXyNMD3C1NRLuItRQXQLgkWyfhXf7g9H1Xvw

# Security
JWT_SECRET=cosmic_guardians_secret_2024
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

**⚠️ REPLACE:** `YOUR_METAMASK_PRIVATE_KEY_HERE` with your actual private key!

---

#### B. Create `contracts/.env`

Create a new file: `contracts/.env`

```env
# Wallet Private Key
PRIVATE_KEY=YOUR_METAMASK_PRIVATE_KEY_HERE

# Infura API Key
INFURA_API_KEY=35d7e3d9e86943c295610f44c0b37815

# RPC URLs
SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/35d7e3d9e86943c295610f44c0b37815
POLYGON_RPC_URL=https://polygon-mainnet.infura.io/v3/35d7e3d9e86943c295610f44c0b37815
MUMBAI_RPC_URL=https://polygon-mumbai.infura.io/v3/35d7e3d9e86943c295610f44c0b37815

# Etherscan API Keys
ETHERSCAN_API_KEY=BFTCAD1V2YR8DJWQF6QEUANNHMADDC5IA3
POLYGONSCAN_API_KEY=BFTCAD1V2YR8DJWQF6QEUANNHMADDC5IA3
```

**⚠️ REPLACE:** `YOUR_METAMASK_PRIVATE_KEY_HERE` with your actual private key!

---

#### C. Create `frontend/.env`

Create a new file: `frontend/.env`

```env
# API
VITE_API_URL=http://localhost:3001

# Blockchain (UPDATE AFTER CONTRACT DEPLOYMENT)
VITE_CONTRACT_ADDRESS=
VITE_CHAIN_ID=137

# WalletConnect
VITE_WALLETCONNECT_PROJECT_ID=3044ade6ab3e5bbbc46d23a19db94321

# Network
VITE_NETWORK=polygon
```

---

### Step 4: Install Dependencies (10 minutes)

Open 3 terminals and run:

**Terminal 1 - Contracts:**
```bash
cd contracts
npm install
```

**Terminal 2 - Backend:**
```bash
cd backend
npm install
```

**Terminal 3 - Frontend:**
```bash
cd frontend
npm install
```

---

### Step 5: Deploy Contract (5 minutes)

#### Option A: Test on Sepolia First (FREE)

1. Get free test ETH:
   - Go to https://sepoliafaucet.com
   - Connect MetaMask
   - Get free Sepolia ETH

2. Deploy:
```bash
cd contracts
npm run deploy:sepolia
```

#### Option B: Deploy to Polygon ($1)

1. Get MATIC:
   - Buy $5 worth of MATIC
   - Send to your MetaMask
   - Switch to Polygon network

2. Deploy:
```bash
cd contracts
npm run deploy:polygon
```

3. **SAVE THE CONTRACT ADDRESS!**

4. Update `.env` files:
   - `backend/.env` → `CONTRACT_ADDRESS=0x...`
   - `frontend/.env` → `VITE_CONTRACT_ADDRESS=0x...`

---

### Step 6: Upload to IPFS (5 minutes)

```bash
cd art-generator
npm install
npm run upload
```

This will:
- Upload all 15 images to IPFS
- Upload all metadata to IPFS
- Save results to `uploaded.json`

---

### Step 7: Import to Database (2 minutes)

```bash
cd art-generator
npm run import
```

This will add all 15 Cosmic Guardians to your backend database.

---

### Step 8: Start Everything (3 minutes)

**Terminal 1 - MongoDB:**
```bash
mongod
```

**Terminal 2 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 3 - Frontend:**
```bash
cd frontend
npm run dev
```

---

### Step 9: Test! (5 minutes)

1. Open http://localhost:5173
2. Click "Connect Wallet"
3. Connect MetaMask
4. Go to "Mint" page
5. See your 15 Cosmic Guardians!
6. Try minting one
7. Check "My NFTs" page

---

## 🎨 Your Collection Details

### Cosmic Guardians Collection

**Total:** 15 Unique Guardians

**Legendary (2)** - 0.20 ETH (~$600 each)
- #7: Golden Champion
- #15: Celestial Paragon

**Epic (4)** - 0.12 ETH (~$360 each)
- #1: Shadow Sentinel
- #4: Crimson Destroyer
- #9: Magenta Phantom
- #13: Storm Bringer

**Rare (5)** - 0.08 ETH (~$240 each)
- #2: Azure Protector
- #5: Frost Guardian
- #6: Emerald Keeper
- #11: Violet Sovereign
- #14: Plasma Sentinel

**Uncommon (4)** - 0.05 ETH (~$150 each)
- #3: Bronze Warrior
- #8: Verdant Warden
- #10: Inferno Knight
- #12: Scarlet Avenger

**Total Collection Value:** ~1.35 ETH (~$4,050)

---

## 💰 Revenue Potential

If you sell all 15 Guardians:
- **Total Revenue:** 1.35 ETH (~$4,050)
- **Your Cost:** $1 (deployment)
- **Profit:** ~$4,049 🎉

---

## 📝 Quick Command Reference

```bash
# Organize images
.\rename-images.ps1

# Generate metadata
node generate-metadata.js

# Deploy contract (test)
cd contracts && npm run deploy:sepolia

# Deploy contract (production)
cd contracts && npm run deploy:polygon

# Upload to IPFS
cd art-generator && npm run upload

# Import to database
cd art-generator && npm run import

# Start backend
cd backend && npm run dev

# Start frontend
cd frontend && npm run dev
```

---

## ⚠️ Important Reminders

1. **Private Key Security:**
   - Never share your private key
   - Never commit .env files to GitHub
   - Keep backups in a safe place

2. **Contract Address:**
   - After deployment, update both .env files
   - Save it somewhere safe

3. **IPFS Hashes:**
   - After upload, check uploaded.json
   - Verify images are accessible

4. **Testing:**
   - Always test on Sepolia first
   - Only deploy to Polygon when everything works

---

## 🎉 You're Ready to Launch!

Everything is set up! Just follow the steps above and you'll have your Cosmic Guardians NFT collection live in about 30 minutes!

**Good luck!** 🚀✨
