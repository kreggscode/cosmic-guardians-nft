# 🚀 Backend Deployment Alternatives

## Option 1: Render.com (Recommended Alternative)

**Best for:** Easy setup, reliable free tier

### Steps:
1. **Go to [render.com](https://render.com)**
2. **Sign up/Login**
3. **New → Web Service**
4. **Connect GitHub** → Select `cosmic-guardians-nft`
5. **Configure:**
   - **Root Directory:** `backend`
   - **Build Command:** `npm install`
   - **Start Command:** `npm run dev`
6. **Add Environment Variables:**
   ```
   PORT=10000
   MONGODB_URI=mongodb://localhost:27017/nft-project
   PINATA_API_KEY=your_pinata_key
   PINATA_SECRET_KEY=your_pinata_secret
   CONTRACT_ADDRESS=your_contract_address
   PRIVATE_KEY=your_signing_wallet_key
   FRONTEND_URL=https://cosmic-guardians-nft.vercel.app
   NODE_ENV=production
   ```
7. **Deploy!**

**URL:** `https://cosmic-guardians.onrender.com`

---

## Option 2: Fly.io (Good Alternative)

**Best for:** Global CDN, fast performance

### Steps:
1. **Install Fly CLI:**
   ```bash
   # Windows
   iwr https://fly.io/install.ps1 -useb | iex
   ```

2. **Login:**
   ```bash
   fly auth login
   ```

3. **Deploy:**
   ```bash
   cd backend
   fly launch
   ```

4. **Add Environment Variables:**
   ```bash
   fly secrets set PINATA_API_KEY=your_key
   fly secrets set PINATA_SECRET_KEY=your_secret
   fly secrets set PRIVATE_KEY=your_signing_key
   fly secrets set FRONTEND_URL=https://cosmic-guardians-nft.vercel.app
   fly secrets set CONTRACT_ADDRESS=your_contract_address
   ```

---

## Option 3: DigitalOcean App Platform

**Best for:** Simple interface, good performance

### Steps:
1. **Go to [digitalocean.com](https://digitalocean.com)**
2. **Create account**
3. **Apps → Create App**
4. **Connect GitHub** → `cosmic-guardians-nft`
5. **Configure:**
   - **Source Directory:** `backend`
   - **Run Command:** `npm run dev`
6. **Add Environment Variables** (same as above)

---

## Option 4: Vercel (Deploy Backend to Vercel Too)

**Note:** Not ideal for persistent backends, but works for testing

### Steps:
1. **Go to [vercel.com](https://vercel.com)**
2. **New Project**
3. **Import** `cosmic-guardians-nft` again
4. **Configure:**
   - **Root Directory:** `backend`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`
5. **Add Environment Variables** (same as above)

**URL:** `https://cosmic-guardians-backend.vercel.app`

---

## Option 5: Manual Deploy (Last Resort)

### Using PM2 + VPS:

1. **Get a VPS:** DigitalOcean Droplet ($6/month)
2. **SSH into server**
3. **Clone repository:**
   ```bash
   git clone https://github.com/kreggscode/cosmic-guardians-nft.git
   cd cosmic-guardians-nft/backend
   ```
4. **Install dependencies:**
   ```bash
   npm install
   ```
5. **Create .env file:**
   ```
   PORT=3001
   # ... other variables
   ```
6. **Start with PM2:**
   ```bash
   npm install -g pm2
   pm2 start npm --name "nft-backend" -- run dev
   pm2 startup
   pm2 save
   ```

---

## 🎯 Quick Recommendation

**Try Render.com first** - it's the most similar to Railway:

1. **render.com** → New Web Service → Connect GitHub
2. **Root directory:** `backend`
3. **Start command:** `npm run dev`
4. **Add environment variables**
5. **Deploy!**

Let me know if Render works, or we can try another option!

---

## 📋 Environment Variables Template

Copy-paste this when setting up any backend:

```
PORT=3001
MONGODB_URI=mongodb://localhost:27017/nft-project
PINATA_API_KEY=YOUR_PINATA_API_KEY
PINATA_SECRET_KEY=YOUR_PINATA_SECRET_KEY
CONTRACT_ADDRESS=YOUR_CONTRACT_ADDRESS
PRIVATE_KEY=YOUR_SIGNING_WALLET_PRIVATE_KEY
FRONTEND_URL=https://cosmic-guardians-nft.vercel.app
NODE_ENV=production
```

**Render will provide MongoDB automatically - just copy the connection string!**
