# 🚀 Deploy Cosmic Guardians NFT - Step by Step

## ✅ Step 1: Deploy Frontend to Vercel (5 minutes)

### Option A: Using Vercel CLI (Recommended)

1. **Install Vercel CLI:**
```bash
npm install -g vercel
```

2. **Deploy:**
```bash
cd frontend
vercel
```

3. **Follow the prompts:**
   - Login with GitHub
   - Link to existing project? **No**
   - Project name: `cosmic-guardians-nft`
   - Directory: `./` (current directory)
   - Override settings? **No**

4. **Vercel will give you a URL like:**
   `https://cosmic-guardians-nft.vercel.app`

### Option B: Using Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click "Add New" → "Project"
4. Import `cosmic-guardians-nft` repository
5. Configure:
   - **Framework Preset:** Vite
   - **Root Directory:** `frontend`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
6. Click "Deploy"

### 🔑 Add Environment Variables in Vercel

After deployment, go to your project settings:

1. Click on your project → "Settings" → "Environment Variables"
2. Add these variables:

```
VITE_API_URL=https://your-backend-url.railway.app
VITE_CONTRACT_ADDRESS=0xYourContractAddress
VITE_CHAIN_ID=11155111
VITE_WALLETCONNECT_PROJECT_ID=your_walletconnect_project_id
```

**Where to get WalletConnect Project ID:**
- Go to [cloud.walletconnect.com](https://cloud.walletconnect.com)
- Sign up/Login
- Create new project
- Copy the Project ID

---

## ✅ Step 2: Deploy Backend to Railway (10 minutes)

### Using Railway Dashboard

1. **Go to [railway.app](https://railway.app)**

2. **Sign in with GitHub**

3. **Create New Project:**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose `cosmic-guardians-nft`
   - Railway will auto-detect the backend

4. **Configure Root Directory:**
   - Click on your service
   - Go to "Settings"
   - Set **Root Directory:** `backend`
   - Set **Start Command:** `npm run dev` (for testing) or `npm start` (for production)

5. **Add Environment Variables:**
   Click "Variables" tab and add:

```
PORT=3001
MONGODB_URI=mongodb://localhost:27017/nft-project
PINATA_API_KEY=your_pinata_api_key
PINATA_SECRET_KEY=your_pinata_secret_key
CONTRACT_ADDRESS=0xYourContractAddress
PRIVATE_KEY=your_wallet_private_key
FRONTEND_URL=https://cosmic-guardians-nft.vercel.app
NODE_ENV=production
```

6. **Deploy!**
   - Railway will automatically deploy
   - You'll get a URL like: `https://cosmic-guardians-production.up.railway.app`

### 🔑 Where to Get API Keys

#### Pinata API Keys (IPFS Storage)
1. Go to [pinata.cloud](https://pinata.cloud)
2. Sign up for free account
3. Go to "API Keys" → "New Key"
4. Enable "Admin" permissions
5. Copy **API Key** and **API Secret**
6. Paste in Railway environment variables

#### Private Key (Wallet for Signing)
⚠️ **IMPORTANT:** Use a NEW wallet for signing, NOT your main wallet!

1. Create a new MetaMask wallet
2. Export private key:
   - MetaMask → Account Details → Export Private Key
3. Copy the private key
4. Paste in Railway `PRIVATE_KEY` variable

**Security Note:** This wallet only needs to sign vouchers, it doesn't need ETH or tokens.

---

## ✅ Step 3: Deploy Smart Contract to Sepolia (10 minutes)

### Get Sepolia ETH (Free)

1. Go to [sepoliafaucet.com](https://sepoliafaucet.com)
2. Connect your wallet
3. Request test ETH (free)

### Configure Contract Environment

1. **Create `contracts/.env` file:**
```
PRIVATE_KEY=your_deployer_wallet_private_key
INFURA_API_KEY=your_infura_api_key
ETHERSCAN_API_KEY=your_etherscan_api_key
```

2. **Where to get Infura API Key:**
   - Go to [infura.io](https://infura.io)
   - Sign up for free
   - Create new project
   - Copy the API Key

3. **Where to get Etherscan API Key:**
   - Go to [etherscan.io](https://etherscan.io)
   - Sign up
   - Go to "API Keys" → Create new key
   - Copy the key

### Deploy Contract

```bash
cd contracts
npm install
npx hardhat run scripts/deploy.js --network sepolia
```

**Save the contract address!** You'll need it for frontend and backend.

---

## ✅ Step 4: Update Environment Variables

### Update Vercel (Frontend)

1. Go to Vercel dashboard
2. Your project → Settings → Environment Variables
3. Update:
   - `VITE_API_URL` = Your Railway backend URL
   - `VITE_CONTRACT_ADDRESS` = Your deployed contract address

4. Redeploy:
   - Go to "Deployments"
   - Click "..." → "Redeploy"

### Update Railway (Backend)

1. Go to Railway dashboard
2. Your project → Variables
3. Update:
   - `CONTRACT_ADDRESS` = Your deployed contract address
   - `FRONTEND_URL` = Your Vercel frontend URL

4. Redeploy automatically happens

---

## ✅ Step 5: Test Everything

1. **Visit your Vercel URL:**
   `https://cosmic-guardians-nft.vercel.app`

2. **Connect Wallet:**
   - Click "Connect Wallet"
   - Switch to Sepolia network in MetaMask

3. **View NFTs:**
   - Go to "Mint" page
   - You should see all 15 NFTs

4. **Test Minting:**
   - Click "Mint" on an NFT
   - Confirm transaction
   - Check "My NFTs" page

---

## 📋 Complete Environment Variables Checklist

### Frontend (Vercel)
```
✅ VITE_API_URL=https://your-backend.railway.app
✅ VITE_CONTRACT_ADDRESS=0xYourContractAddress
✅ VITE_CHAIN_ID=11155111
✅ VITE_WALLETCONNECT_PROJECT_ID=your_project_id
```

### Backend (Railway)
```
✅ PORT=3001
✅ MONGODB_URI=mongodb://localhost:27017/nft-project
✅ PINATA_API_KEY=your_pinata_key
✅ PINATA_SECRET_KEY=your_pinata_secret
✅ CONTRACT_ADDRESS=0xYourContractAddress
✅ PRIVATE_KEY=your_signing_wallet_key
✅ FRONTEND_URL=https://your-frontend.vercel.app
✅ NODE_ENV=production
```

### Contracts (Local .env)
```
✅ PRIVATE_KEY=your_deployer_wallet_key
✅ INFURA_API_KEY=your_infura_key
✅ ETHERSCAN_API_KEY=your_etherscan_key
```

---

## 🎯 Quick Reference: Where to Paste API Keys

| Service | Where to Get | Where to Paste |
|---------|-------------|----------------|
| **Pinata API Key** | pinata.cloud → API Keys | Railway → Variables → `PINATA_API_KEY` |
| **Pinata Secret** | pinata.cloud → API Keys | Railway → Variables → `PINATA_SECRET_KEY` |
| **Infura API Key** | infura.io → Create Project | `contracts/.env` → `INFURA_API_KEY` |
| **Etherscan API Key** | etherscan.io → API Keys | `contracts/.env` → `ETHERSCAN_API_KEY` |
| **WalletConnect ID** | cloud.walletconnect.com | Vercel → Variables → `VITE_WALLETCONNECT_PROJECT_ID` |
| **Private Key (Signing)** | New MetaMask wallet | Railway → Variables → `PRIVATE_KEY` |
| **Private Key (Deploy)** | Your MetaMask wallet | `contracts/.env` → `PRIVATE_KEY` |

---

## 💰 Cost Summary

- **Vercel:** FREE
- **Railway:** FREE (500 hours/month)
- **Sepolia Testnet:** FREE
- **Pinata:** FREE (1GB storage)
- **Infura:** FREE (100k requests/day)
- **Total:** $0

---

## 🆘 Troubleshooting

### Frontend not connecting to backend
- Check `VITE_API_URL` in Vercel
- Check CORS settings in backend
- Verify Railway backend is running

### Contract deployment fails
- Check you have Sepolia ETH
- Verify Infura API key is correct
- Check private key has funds

### Images not loading
- Verify Pinata API keys
- Check `uploaded.json` exists
- Try different IPFS gateway

---

## 🎉 After Deployment

Your NFT collection will be live at:
- **Frontend:** `https://cosmic-guardians-nft.vercel.app`
- **Backend:** `https://cosmic-guardians-production.up.railway.app`
- **Contract:** `https://sepolia.etherscan.io/address/YOUR_CONTRACT`

Share your collection and start minting! 🌌✨
