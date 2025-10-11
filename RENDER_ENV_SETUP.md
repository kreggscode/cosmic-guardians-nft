# 📋 Environment Variables for Render.com

## Option A: Upload .env File Directly

**Yes! You can upload your `.env` file directly to Render:**

1. **In Render Dashboard:**
   - Go to your backend service
   - Click **"Environment"** tab
   - Click **"Add from .env"** button
   - Upload your `backend/.env` file

**Render will automatically parse the file and set all variables!**

---

## Option B: Add Variables Manually

If you prefer to add them one by one:

### Required Variables (Copy from your .env file):

```
PORT=3001
NODE_ENV=production
MONGODB_URI=mongodb://localhost:27017/nft-project
CONTRACT_ADDRESS=0xYourContractAddress
CHAIN_ID=11155111
RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_KEY
PRIVATE_KEY=your_signing_wallet_private_key
PINATA_API_KEY=your_pinata_api_key
PINATA_SECRET_KEY=your_pinata_secret_key
FRONTEND_URL=https://cosmic-guardians-nft.vercel.app
```

### Optional Variables:
```
PINATA_JWT=your_pinata_jwt
NFT_STORAGE_API_KEY=your_nft_storage_key
COINGECKO_API_KEY=optional
BTCPAY_SERVER_URL=https://your-btcpay-server.com
BTCPAY_API_KEY=your_btcpay_api_key
JWT_SECRET=your_jwt_secret
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

---

## 📁 How to Upload .env File

1. **Go to Render Dashboard**
2. **Select your backend service**
3. **Click "Environment" tab**
4. **Click "Add from .env"**
5. **Browse and select** `backend/.env`
6. **Click "Upload"**

**Done!** Render will set all your variables automatically.

---

## ⚠️ Important Notes

### For Production:
- Change `NODE_ENV=development` to `NODE_ENV=production`
- Update `FRONTEND_URL` to your actual Vercel URL
- Add your deployed contract address later

### Database:
- Render provides free MongoDB - use their connection string
- Replace `MONGODB_URI=mongodb://localhost:27017/nft-project`

### Security:
- Never commit `.env` files to Git
- Use different private keys for development/production
- Rotate API keys regularly

---

## 🔑 Where to Get the Keys

### Pinata API Keys:
1. [pinata.cloud](https://pinata.cloud)
2. API Keys → New Key
3. Enable Admin permissions
4. Copy API Key + Secret

### Infura RPC URL:
1. [infura.io](https://infura.io)
2. Create project → Copy Project ID
3. Use: `https://sepolia.infura.io/v3/YOUR_PROJECT_ID`

### Private Key (Signing):
1. Create NEW MetaMask wallet
2. Export private key
3. Use this (not your main wallet!)

---

## 🚀 After Uploading .env

1. **Click "Manual Deploy"** in Render
2. **Wait for deployment** (2-3 minutes)
3. **Copy the Render URL** (something like `https://cosmic-guardians.onrender.com`)
4. **Update Vercel** with this backend URL

Let me know when Render deployment succeeds! 🎉
