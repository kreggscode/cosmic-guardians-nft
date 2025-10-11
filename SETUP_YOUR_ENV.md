# Your API Keys Setup Guide

## ✅ You Have All Required API Keys!

Great job getting all the API keys! Here's how to set them up:

---

## 📝 Step 1: Create Backend .env File

**Location:** `backend/.env`

Copy this and save as `backend/.env`:

```env
# Server
PORT=3001
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/nft-project

# Blockchain (UPDATE AFTER CONTRACT DEPLOYMENT)
CONTRACT_ADDRESS=
CHAIN_ID=137
RPC_URL=https://polygon-mainnet.infura.io/v3/35d7e3d9e86943c295610f44c0b37815
PRIVATE_KEY=your_metamask_private_key_here

# IPFS - Pinata (YOUR KEYS)
PINATA_API_KEY=b83b6a4fd5871a0c9c09
PINATA_SECRET_KEY=5536173b410abe5209116965f38f9a58eafeb2bc65d4a93ab3fd1159c0e5fbaa
PINATA_JWT=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJiYzU5MzY1Mi01MjAwLTRkZWYtYjc0YS1lZGJjYmE4YjdhYjgiLCJlbWFpbCI6ImtyZWc5ZGFAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjEsImlkIjoiRlJBMSJ9LHsiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjEsImlkIjoiTllDMSJ9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6ImI4M2I2YTRmZDU4NzFhMGM5YzA5Iiwic2NvcGVkS2V5U2VjcmV0IjoiNTUzNjE3M2I0MTBhYmU1MjA5MTE2OTY1ZjM4ZjlhNThlYWZlYjJiYzY1ZDRhOTNhYjNmZDExNTljMGU1ZmJhYSIsImV4cCI6MTc5MTcwMTY0Mn0.MY3sseDYXyNMD3C1NRLuItRQXQLgkWyfhXf7g9H1Xvw

# Price Feed (Optional)
COINGECKO_API_KEY=

# Security
JWT_SECRET=cosmic_guardians_secret_key_2024
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

**⚠️ IMPORTANT:** Replace `your_metamask_private_key_here` with your actual MetaMask private key!

---

## 📝 Step 2: Create Contracts .env File

**Location:** `contracts/.env`

Copy this and save as `contracts/.env`:

```env
# Wallet Private Key (GET FROM METAMASK)
PRIVATE_KEY=your_metamask_private_key_here

# Infura API Key (YOUR KEY)
INFURA_API_KEY=35d7e3d9e86943c295610f44c0b37815

# RPC URLs (Already configured with your Infura key)
SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/35d7e3d9e86943c295610f44c0b37815
POLYGON_RPC_URL=https://polygon-mainnet.infura.io/v3/35d7e3d9e86943c295610f44c0b37815
MUMBAI_RPC_URL=https://polygon-mumbai.infura.io/v3/35d7e3d9e86943c295610f44c0b37815

# Etherscan API Keys (YOUR KEY)
ETHERSCAN_API_KEY=BFTCAD1V2YR8DJWQF6QEUANNHMADDC5IA3
POLYGONSCAN_API_KEY=BFTCAD1V2YR8DJWQF6QEUANNHMADDC5IA3
```

**⚠️ IMPORTANT:** Replace `your_metamask_private_key_here` with your actual MetaMask private key!

---

## 📝 Step 3: Create Frontend .env File

**Location:** `frontend/.env`

Copy this and save as `frontend/.env`:

```env
# API
VITE_API_URL=http://localhost:3001

# Blockchain (UPDATE AFTER CONTRACT DEPLOYMENT)
VITE_CONTRACT_ADDRESS=
VITE_CHAIN_ID=137

# WalletConnect (GET FROM https://cloud.walletconnect.com)
VITE_WALLETCONNECT_PROJECT_ID=your_walletconnect_project_id

# Network
VITE_NETWORK=polygon
```

**⚠️ TODO:** Get WalletConnect Project ID from https://cloud.walletconnect.com

---

## 🔑 How to Get Your MetaMask Private Key

**⚠️ WARNING: Never share your private key with anyone! Keep it secret!**

1. Open MetaMask extension
2. Click the three dots (⋮) in top right
3. Click "Account details"
4. Click "Show private key"
5. Enter your MetaMask password
6. Copy the private key
7. Paste it in both `.env` files where it says `your_metamask_private_key_here`

---

## 🔑 How to Get WalletConnect Project ID

1. Go to https://cloud.walletconnect.com
2. Sign up / Log in (free)
3. Click "Create New Project"
4. Name it "Cosmic Guardians" (or your project name)
5. Copy the Project ID
6. Paste it in `frontend/.env` where it says `your_walletconnect_project_id`

---

## ✅ What You Have So Far

- ✅ Pinata API Keys (for IPFS storage)
- ✅ Infura API Key (for blockchain connection)
- ✅ Etherscan API Key (for contract verification)
- ⏳ MetaMask Private Key (need to get from MetaMask)
- ⏳ WalletConnect Project ID (need to get from WalletConnect)

---

## 🎨 Next Step: Create Your NFT Images!

See the next file: `CREATE_YOUR_ART.md`
