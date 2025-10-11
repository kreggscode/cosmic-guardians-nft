# Quick Start Guide - 5 Minutes to Running NFT Platform

## TL;DR - Fastest Path to Testing

### 1. Install Everything (2 minutes)
```bash
# Install all dependencies at once
cd contracts && npm install && cd ../backend && npm install && cd ../frontend && npm install && cd ..
```

### 2. Setup Environment (1 minute)
```bash
# Copy all example env files
cp contracts/.env.example contracts/.env
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

**Edit these 3 files with your keys:**
- `contracts/.env` - Add your MetaMask private key and Infura key
- `backend/.env` - Add same private key, Pinata keys, and Infura key
- `frontend/.env` - Add WalletConnect project ID

### 3. Deploy Contract (1 minute)
```bash
cd contracts
npm run deploy:sepolia
# Copy the contract address from output
```

**Update contract address in:**
- `backend/.env` → `CONTRACT_ADDRESS=0x...`
- `frontend/.env` → `VITE_CONTRACT_ADDRESS=0x...`

### 4. Start Everything (1 minute)
```bash
# Terminal 1 - Start MongoDB (if using local)
mongod

# Terminal 2 - Start Backend
cd backend
npm run dev

# Terminal 3 - Start Frontend
cd frontend
npm run dev
```

### 5. Test It! 🎉
1. Open http://localhost:5173
2. Connect MetaMask
3. Go to Mint page
4. Click "Mint Now" on any NFT

---

## What You Need (Get These First)

### Required Accounts (All Free)
1. **Infura** - https://infura.io
   - Sign up → Create project → Copy API key

2. **Pinata** - https://pinata.cloud
   - Sign up → API Keys → Create → Copy all keys

3. **WalletConnect** - https://cloud.walletconnect.com
   - Sign up → Create project → Copy Project ID

4. **Sepolia Testnet ETH** - https://sepoliafaucet.com
   - Connect wallet → Get free test ETH

### Required Software
- Node.js 18+ - https://nodejs.org
- MongoDB - https://www.mongodb.com/try/download/community
- MetaMask - https://metamask.io

---

## Minimal .env Configuration

### contracts/.env
```env
PRIVATE_KEY=your_metamask_private_key
INFURA_API_KEY=your_infura_key
```

### backend/.env
```env
PORT=3001
MONGODB_URI=mongodb://localhost:27017/nft-project
CONTRACT_ADDRESS=0x_your_deployed_contract_address
RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_KEY
PRIVATE_KEY=your_metamask_private_key
PINATA_API_KEY=your_pinata_key
PINATA_SECRET_KEY=your_pinata_secret
PINATA_JWT=your_pinata_jwt
```

### frontend/.env
```env
VITE_API_URL=http://localhost:3001
VITE_CONTRACT_ADDRESS=0x_your_deployed_contract_address
VITE_CHAIN_ID=11155111
VITE_WALLETCONNECT_PROJECT_ID=your_project_id
```

---

## Troubleshooting

### "Cannot find module"
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### "MongoDB connection failed"
```bash
# Start MongoDB
mongod
# Or use MongoDB Atlas connection string
```

### "Contract deployment failed"
- Make sure you have Sepolia ETH in your wallet
- Check your private key is correct
- Verify Infura API key is valid

### "Transaction failed"
- Make sure contract address is set in both backend and frontend .env
- Verify you're on Sepolia network in MetaMask
- Check backend is running and accessible

---

## Next Steps After Testing

1. **Add Your Own NFTs**
   - Create images
   - Use backend API to upload to IPFS
   - Generate metadata

2. **Customize Design**
   - Edit frontend components
   - Change colors in tailwind.config.js
   - Update branding

3. **Deploy to Production**
   - Deploy contract to Polygon (cheap) or Ethereum (expensive)
   - Host backend on Railway/Render
   - Host frontend on Vercel/Netlify

---

## One-Line Commands

```bash
# Install all
cd contracts && npm i && cd ../backend && npm i && cd ../frontend && npm i && cd ..

# Copy env files
cp contracts/.env.example contracts/.env && cp backend/.env.example backend/.env && cp frontend/.env.example frontend/.env

# Deploy contract
cd contracts && npm run deploy:sepolia

# Start backend
cd backend && npm run dev

# Start frontend
cd frontend && npm run dev
```

---

## Important Notes

⚠️ **Never commit your private keys!**
⚠️ **Use testnet (Sepolia) for testing first!**
⚠️ **Buyers pay gas fees, not you (lazy minting)!**

✅ **Free to test on Sepolia**
✅ **Cheap on Polygon (~$0.01 per mint)**
✅ **Expensive on Ethereum ($5-50 per mint)**

---

Need detailed instructions? See `DEPLOYMENT_GUIDE.md`
