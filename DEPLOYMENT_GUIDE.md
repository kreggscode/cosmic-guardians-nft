# NFT Project - Deployment Guide

This guide will walk you through deploying your complete NFT project from scratch.

## Prerequisites

Before you begin, make sure you have:

- ✅ Node.js 18+ installed
- ✅ MetaMask wallet with some ETH (for testnet: get free Sepolia ETH from faucet)
- ✅ MongoDB installed locally or MongoDB Atlas account
- ✅ Infura account (free tier is fine) - https://infura.io
- ✅ Pinata account (free tier is fine) - https://pinata.cloud
- ✅ WalletConnect Project ID - https://cloud.walletconnect.com

## Step 1: Install Dependencies

Open three terminals for contracts, backend, and frontend.

### Terminal 1 - Smart Contracts
```bash
cd contracts
npm install
```

### Terminal 2 - Backend
```bash
cd backend
npm install
```

### Terminal 3 - Frontend
```bash
cd frontend
npm install
```

## Step 2: Configure Environment Variables

### Contracts (.env)
```bash
cd contracts
cp .env.example .env
```

Edit `contracts/.env`:
```env
PRIVATE_KEY=your_metamask_private_key_here
INFURA_API_KEY=your_infura_api_key
ETHERSCAN_API_KEY=your_etherscan_api_key
```

**⚠️ IMPORTANT:** Never commit your private key! Keep it secret.

**How to get your MetaMask private key:**
1. Open MetaMask
2. Click three dots → Account details
3. Export Private Key
4. Enter password and copy the key

### Backend (.env)
```bash
cd backend
cp .env.example .env
```

Edit `backend/.env`:
```env
PORT=3001
NODE_ENV=development

# Use local MongoDB or MongoDB Atlas
MONGODB_URI=mongodb://localhost:27017/nft-project

# Will be filled after contract deployment
CONTRACT_ADDRESS=
CHAIN_ID=11155111
RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_KEY
PRIVATE_KEY=your_metamask_private_key_here

# Pinata (for IPFS)
PINATA_API_KEY=your_pinata_api_key
PINATA_SECRET_KEY=your_pinata_secret_key
PINATA_JWT=your_pinata_jwt

# Optional
COINGECKO_API_KEY=
```

**How to get Pinata API keys:**
1. Go to https://pinata.cloud
2. Sign up for free account
3. Go to API Keys section
4. Create new API key with admin permissions
5. Copy API Key, Secret Key, and JWT

### Frontend (.env)
```bash
cd frontend
cp .env.example .env
```

Edit `frontend/.env`:
```env
VITE_API_URL=http://localhost:3001

# Will be filled after contract deployment
VITE_CONTRACT_ADDRESS=
VITE_CHAIN_ID=11155111

# WalletConnect Project ID
VITE_WALLETCONNECT_PROJECT_ID=your_project_id

VITE_NETWORK=sepolia
```

**How to get WalletConnect Project ID:**
1. Go to https://cloud.walletconnect.com
2. Sign up/login
3. Create new project
4. Copy the Project ID

## Step 3: Deploy Smart Contract

### Option A: Deploy to Sepolia Testnet (Recommended for Testing)

1. Get free Sepolia ETH from faucet:
   - https://sepoliafaucet.com
   - https://www.alchemy.com/faucets/ethereum-sepolia

2. Deploy contract:
```bash
cd contracts
npm run deploy:sepolia
```

3. **Save the contract address** from the output!

### Option B: Deploy to Polygon (Low Cost Production)

1. Get MATIC tokens (very cheap, ~$0.01 per transaction)
2. Update `hardhat.config.js` if needed
3. Deploy:
```bash
cd contracts
npm run deploy:polygon
```

### Option C: Deploy to Ethereum Mainnet (Expensive)

⚠️ **WARNING:** Deployment costs $50-200 in gas fees!

```bash
cd contracts
npm run deploy:mainnet
```

## Step 4: Update Configuration with Contract Address

After deployment, you'll see output like:
```
✅ LazyNFT deployed to: 0x1234567890abcdef...
```

**Update these files with the contract address:**

1. `backend/.env`:
```env
CONTRACT_ADDRESS=0x1234567890abcdef...
```

2. `frontend/.env`:
```env
VITE_CONTRACT_ADDRESS=0x1234567890abcdef...
```

## Step 5: Start MongoDB

### Option A: Local MongoDB
```bash
# Windows
mongod

# Mac/Linux
sudo systemctl start mongod
```

### Option B: MongoDB Atlas (Cloud)
1. Create free cluster at https://www.mongodb.com/cloud/atlas
2. Get connection string
3. Update `backend/.env` with connection string

## Step 6: Start Backend Server

```bash
cd backend
npm run dev
```

You should see:
```
🚀 Server running on port 3001
✅ MongoDB connected successfully
```

## Step 7: Create Sample NFTs (Optional)

You can create NFTs through the backend API or manually add to database.

**Example: Create NFT via API**

```bash
# Using curl (Windows PowerShell)
$headers = @{ "Content-Type" = "multipart/form-data" }
$form = @{
    name = "Cool NFT #1"
    description = "An awesome NFT"
    price = "50000000000000000"  # 0.05 ETH in wei
    attributes = '[{"trait_type":"Rarity","value":"Common"}]'
    image = Get-Item -Path "path/to/image.png"
}
Invoke-RestMethod -Uri "http://localhost:3001/api/nft/create" -Method Post -Form $form
```

## Step 8: Start Frontend

```bash
cd frontend
npm run dev
```

The app will open at http://localhost:5173

## Step 9: Test the Application

1. **Connect Wallet**
   - Click "Connect Wallet" in navbar
   - Select MetaMask
   - Approve connection

2. **Browse NFTs**
   - Go to "Mint" page
   - See available NFTs

3. **Mint an NFT**
   - Click "Mint Now" on any NFT
   - Review details in modal
   - Click "Mint NFT"
   - Approve transaction in MetaMask
   - Wait for confirmation

4. **View Your NFTs**
   - Go to "My NFTs" page
   - See your minted NFTs

## Troubleshooting

### Contract Deployment Fails
- **Issue:** "Insufficient funds"
- **Solution:** Add more ETH to your wallet

### Backend Won't Start
- **Issue:** "MongoDB connection failed"
- **Solution:** Make sure MongoDB is running

### Frontend Can't Connect to Wallet
- **Issue:** WalletConnect error
- **Solution:** Check VITE_WALLETCONNECT_PROJECT_ID is set

### Transaction Fails
- **Issue:** "Invalid signature"
- **Solution:** Make sure backend PRIVATE_KEY matches contract signer

### Images Don't Load
- **Issue:** IPFS gateway timeout
- **Solution:** Images may take time to propagate. Try different gateway:
  - https://ipfs.io/ipfs/HASH
  - https://gateway.pinata.cloud/ipfs/HASH

## Production Deployment

### Backend (Railway, Render, DigitalOcean)

**Railway (Easiest):**
1. Push code to GitHub
2. Go to https://railway.app
3. Create new project from GitHub repo
4. Add environment variables
5. Deploy!

**Cost:** ~$5/month

### Frontend (Vercel, Netlify)

**Vercel (Recommended):**
1. Push code to GitHub
2. Go to https://vercel.com
3. Import project
4. Add environment variables
5. Deploy!

**Cost:** Free tier available

### Database (MongoDB Atlas)

1. Create cluster at https://mongodb.com/cloud/atlas
2. Whitelist IP addresses
3. Update connection string

**Cost:** Free tier (512MB) available

## Cost Summary

### Development (Testnet)
- Contract deployment: **FREE** (testnet ETH)
- IPFS storage: **FREE** (Pinata free tier)
- Backend hosting: **FREE** (local)
- Frontend: **FREE** (local)
- **Total: $0**

### Production (Polygon)
- Contract deployment: **~$1** (one-time)
- IPFS storage: **FREE** (Pinata free tier)
- Backend hosting: **$5/month** (Railway)
- Frontend: **FREE** (Vercel)
- Database: **FREE** (MongoDB Atlas free tier)
- **Total: ~$6 first month, $5/month after**

### Production (Ethereum Mainnet)
- Contract deployment: **$50-200** (one-time)
- Other costs same as Polygon
- **Total: ~$55-205 first month, $5/month after**

## Security Checklist

Before going to production:

- [ ] Never commit `.env` files
- [ ] Use different private keys for testnet and mainnet
- [ ] Enable rate limiting on backend
- [ ] Add CORS restrictions
- [ ] Use HTTPS for production
- [ ] Verify contract on Etherscan
- [ ] Test thoroughly on testnet first
- [ ] Set up monitoring and alerts
- [ ] Backup your private keys securely
- [ ] Consider using a hardware wallet for contract ownership

## Next Steps

1. **Customize the NFTs**
   - Create your own artwork
   - Upload to IPFS via backend API
   - Set prices and attributes

2. **Add More Features**
   - Whitelist for presale
   - Reveal mechanism
   - Rarity system
   - Admin dashboard

3. **Marketing**
   - Create Twitter/Discord
   - List on OpenSea
   - Build community

4. **Monitor**
   - Track mints
   - Monitor gas prices
   - Check IPFS availability

## Support Resources

- **Hardhat Docs:** https://hardhat.org/docs
- **OpenZeppelin:** https://docs.openzeppelin.com
- **Wagmi Docs:** https://wagmi.sh
- **Pinata Docs:** https://docs.pinata.cloud
- **Etherscan:** https://etherscan.io (mainnet) / https://sepolia.etherscan.io (testnet)

## Common Questions

**Q: How much does it cost for buyers to mint?**
A: Buyers pay the NFT price + gas fees. On Polygon, gas is ~$0.01. On Ethereum, $5-50.

**Q: Can I change the price after deployment?**
A: Yes! The contract owner can call `setMintPrice()` to update the price.

**Q: How do I add more NFTs?**
A: Use the backend API `/api/nft/create` endpoint to upload images and create metadata.

**Q: What if IPFS goes down?**
A: IPFS is decentralized. Files are pinned by Pinata and available through multiple gateways.

**Q: Can buyers pay with Bitcoin?**
A: Currently, direct minting only supports ETH. For BTC, you'd need to integrate a payment gateway like BTCPay Server.

**Q: How do I withdraw funds?**
A: Call the `withdraw()` function on the contract as the owner. Funds go to the owner's wallet.

## Congratulations! 🎉

You now have a fully functional NFT minting platform with:
- ✅ Gasless minting (lazy minting)
- ✅ Multi-currency support
- ✅ IPFS storage
- ✅ Modern web interface
- ✅ Wallet integration
- ✅ Production-ready code

Happy minting! 🚀
