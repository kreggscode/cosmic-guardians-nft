# 🚀 Deployment Checklist

## Pre-Deployment Security Check

- [ ] ✅ No private keys in code (checked - all clear)
- [ ] ✅ No API keys in code (checked - all clear)
- [ ] ✅ `.env` files are in `.gitignore`
- [ ] ✅ `minted-nfts.json` is in `.gitignore`
- [ ] ✅ `uploaded.json` is in `.gitignore`
- [ ] Review all `.env.example` files - no real values

## Repository Setup

**Recommended Repository Name:** `cosmic-guardians-nft`

Alternative names:
- `cosmic-guardians-collection`
- `nft-cosmic-guardians`
- `guardians-nft-platform`

### Files to EXCLUDE from GitHub:

```
# Already in .gitignore:
- node_modules/
- .env files
- minted-nfts.json
- art-generator/uploaded.json
- build/ and dist/

# Documentation files to KEEP:
- README.md
- QUICK_START.md
- DEPLOYMENT_GUIDE.md
- BLOCKCHAIN_GUIDE.md
- SETUP_YOUR_ENV.md

# Documentation files to REMOVE (redundant):
- COMPLETE_ANSWERS.md
- CREATE_YOUR_ART.md
- ORGANIZE_YOUR_IMAGES.md
- PROJECT_OVERVIEW.md
- YOUR_ACTION_PLAN.md
- YOUR_CHECKLIST.md
- VIEW_NFT_IN_METAMASK.md
```

## Step 1: Create GitHub Repository

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Cosmic Guardians NFT Collection"

# Create repository on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/cosmic-guardians-nft.git
git branch -M main
git push -u origin main
```

## Step 2: Deploy Smart Contract

### Sepolia Testnet (FREE - for testing)

```bash
cd contracts
npx hardhat run scripts/deploy.js --network sepolia
```

**Save the contract address!** You'll need it for backend and frontend.

### Polygon Mainnet (LOW COST - ~$1)

```bash
npx hardhat run scripts/deploy.js --network polygon
```

## Step 3: Deploy Backend

### Option A: Railway.app (Recommended)

1. Go to [railway.app](https://railway.app)
2. Sign in with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your `cosmic-guardians-nft` repository
5. Railway will detect the backend automatically
6. Add environment variables:
   - `PORT=3001`
   - `MONGODB_URI=` (Railway provides free MongoDB)
   - `PINATA_API_KEY=your_key`
   - `PINATA_SECRET_KEY=your_secret`
   - `CONTRACT_ADDRESS=your_deployed_contract`
   - `PRIVATE_KEY=your_wallet_private_key`
   - `FRONTEND_URL=https://your-frontend.vercel.app`

7. Deploy!

**Backend URL:** `https://cosmic-guardians-production.up.railway.app`

### Option B: Render.com

1. Go to [render.com](https://render.com)
2. New → Web Service
3. Connect GitHub repository
4. Settings:
   - **Root Directory:** `backend`
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm start`
5. Add environment variables (same as above)

## Step 4: Deploy Frontend

### Option A: Vercel (Recommended)

```bash
cd frontend

# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

Follow prompts:
- Project name: `cosmic-guardians-nft`
- Root directory: `frontend`
- Build command: `npm run build`
- Output directory: `dist`

Add environment variables in Vercel dashboard:
- `VITE_API_URL=https://your-backend.railway.app`
- `VITE_CONTRACT_ADDRESS=your_deployed_contract`
- `VITE_CHAIN_ID=11155111` (Sepolia) or `137` (Polygon)
- `VITE_WALLETCONNECT_PROJECT_ID=your_project_id`

### Option B: Netlify

1. Go to [netlify.com](https://netlify.com)
2. New site from Git
3. Connect GitHub repository
4. Settings:
   - **Base directory:** `frontend`
   - **Build command:** `npm run build`
   - **Publish directory:** `frontend/dist`
5. Add environment variables (same as above)

## Step 5: Test Everything

- [ ] Frontend loads correctly
- [ ] Connect wallet works
- [ ] Can view NFT collection
- [ ] Can mint NFT (test with small amount)
- [ ] NFT appears in "My NFTs"
- [ ] Images load from IPFS
- [ ] Transaction shows on blockchain explorer

## Step 6: Update Contract on OpenSea

1. Go to [testnets.opensea.io](https://testnets.opensea.io) (for Sepolia)
2. Or [opensea.io](https://opensea.io) (for mainnet/Polygon)
3. Connect wallet
4. Import contract: Paste your contract address
5. Your NFTs will appear automatically!

## Cost Summary

### Development (Testing)
- **Total: $0**
- Sepolia testnet: Free
- Backend: Free tier (Railway/Render)
- Frontend: Free (Vercel/Netlify)
- IPFS: Free tier (Pinata)

### Production (Real NFTs)
- **Total: $1-10**
- Polygon deployment: ~$1
- Backend: Free tier sufficient
- Frontend: Free
- IPFS: Free tier sufficient

### Monthly Costs
- **$0** (all free tiers)
- Upgrade only if you get thousands of users

## Troubleshooting

### Backend not connecting to frontend
- Check CORS settings in `backend/src/index.ts`
- Verify `FRONTEND_URL` environment variable
- Check backend logs in Railway/Render dashboard

### Images not loading
- Verify IPFS hashes in `uploaded.json`
- Check Pinata dashboard - files should be pinned
- Try different IPFS gateway: `https://ipfs.io/ipfs/HASH`

### Contract errors
- Verify contract address in frontend `.env`
- Check network ID matches (Sepolia=11155111, Polygon=137)
- Ensure wallet is on correct network

### Wallet connection issues
- Get WalletConnect Project ID from [cloud.walletconnect.com](https://cloud.walletconnect.com)
- Add to `VITE_WALLETCONNECT_PROJECT_ID`

## Post-Deployment

- [ ] Share your collection URL
- [ ] Tweet about your NFT launch
- [ ] List on OpenSea
- [ ] Join NFT communities
- [ ] Monitor gas prices (for Ethereum mainnet)

## Support

If you encounter issues:
1. Check Railway/Render logs for backend errors
2. Check browser console for frontend errors
3. Verify all environment variables are set
4. Test on Sepolia testnet first before mainnet

---

**Ready to deploy?** Start with Sepolia testnet, test everything, then deploy to Polygon mainnet!
