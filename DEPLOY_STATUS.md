# 🎉 Frontend Deployed to Vercel!

Your frontend is now building on Vercel. Once it succeeds, you'll get a URL like:
`https://cosmic-guardians-nft.vercel.app`

---

## ✅ Step 2: Deploy Backend to Railway (10 minutes)

### Option A: Quick Deploy (Recommended)

1. **Go to Railway:** [railway.app](https://railway.app)

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
   - Set **Start Command:** `npm run dev`

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

### Option B: Manual Deploy

```bash
# If Railway auto-detect doesn't work:
cd backend
railway init
railway up
```

---

## 🔑 API Keys You Need

### **1. Pinata (IPFS Storage)**
📍 **Get from:** [pinata.cloud](https://pinata.cloud)
- Sign up for free
- API Keys → New Key
- Enable Admin permissions
- Copy API Key and API Secret

🎯 **Paste in Railway:**
- `PINATA_API_KEY` = your API key
- `PINATA_SECRET_KEY` = your secret

### **2. Wallet Private Key (Signing)**
⚠️ **Create a NEW wallet for signing!**

1. **MetaMask** → Create new account (doesn't need ETH)
2. **Export private key:**
   - Account Details → Export Private Key
   - Copy the long string

🎯 **Paste in Railway:**
- `PRIVATE_KEY` = your new wallet private key

### **3. Contract Address**
You'll get this after deploying the smart contract in Step 3.

---

## 📋 Current Status

- ✅ **Frontend:** Deploying on Vercel
- ⏳ **Backend:** Waiting for Railway
- ⏳ **Smart Contract:** Waiting for deployment

---

## 🎯 Next Steps

1. **Wait for Vercel to finish** (should be done in 2-3 minutes)
2. **Deploy to Railway** using the steps above
3. **Get your API keys** from Pinata and create signing wallet
4. **Tell me when Railway deployment is done!**

Once Railway is deployed, we'll:
- Update Vercel with the Railway backend URL
- Deploy the smart contract
- Connect everything together

---

## 💡 Pro Tip

**Keep this window open** - we'll continue from here once Railway is deployed!

🚀 **You're making great progress!**
