# 🔧 Manual Backend Setup

## The Problem
Backend server can't start because `.env` file is empty or missing.

## Quick Fix (Copy-Paste Method)

### Step 1: Create backend/.env file

1. Open: `backend/.env` file (create it if it doesn't exist)
2. **Delete everything** in it
3. **Copy and paste** this EXACT content:

```
PORT=3001
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/nft-project
CONTRACT_ADDRESS=0x2cd2936c4D34B926100ceE1EcF279E6E04ba5234
CHAIN_ID=11155111
RPC_URL=https://sepolia.infura.io/v3/35d7e3d9e86943c295610f44c0b37815
PRIVATE_KEY=0000000000000000000000000000000000000000000000000000000000000000
PINATA_API_KEY=b83b6a4fd5871a0c9c09
PINATA_SECRET_KEY=5536173b410abe5209116965f38f9a58eafeb2bc65d4a93ab3fd1159c0e5fbaa
PINATA_JWT=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJiYzU5MzY1Mi01MjAwLTRkZWYtYjc0YS1lZGJjYmE4YjdhYjgiLCJlbWFpbCI6ImtyZWc5ZGFAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjEsImlkIjoiRlJBMSJ9LHsiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjEsImlkIjoiTllDMSJ9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6ImI4M2I2YTRmZDU4NzFhMGM5YzA5Iiwic2NvcGVkS2V5U2VjcmV0IjoiNTUzNjE3M2I0MTBhYmU1MjA5MTE2OTY1ZjM4ZjlhNThlYWZlYjJiYzY1ZDRhOTNhYjNmZDExNTljMGU1ZmJhYSIsImV4cCI6MTc5MTcwMTY0Mn0.MY3sseDYXyNMD3C1NRLuItRQXQLgkWyfhXf7g9H1Xvw
JWT_SECRET=cosmic_guardians_secret_key_2024
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

4. **Save the file** (Ctrl+S)

---

### Step 2: Start Backend Server

Open PowerShell and run:

```powershell
cd "c:\Users\kreg9\Downloads\kreggscode\windsurf\NFT project\backend"
npm run dev
```

**Expected output:**
```
Server running on port 3001
✅ Connected to blockchain
```

**Keep this terminal open!**

---

### Step 3: Refresh Your Website

1. Go to http://localhost:5173
2. **Make sure MetaMask is on Sepolia network** (not Ethereum Mainnet!)
3. Press F5 to refresh
4. You should now see your 15 Cosmic Guardians!

---

## Checklist

- [ ] Created `backend/.env` file with the content above
- [ ] Started backend server (`npm run dev`)
- [ ] Backend shows "Server running on port 3001"
- [ ] MetaMask switched to Sepolia network
- [ ] Refreshed website
- [ ] Can see 15 NFTs!

---

## If Backend Won't Start

### Error: "Missing dependencies"
```powershell
cd backend
npm install
npm run dev
```

### Error: "Port 3001 already in use"
```powershell
# Find and kill the process
netstat -ano | findstr :3001
# Then kill it (replace PID with actual number)
taskkill /PID <PID> /F
# Try again
npm run dev
```

### Error: "Cannot find module"
```powershell
cd backend
rm -r node_modules
rm package-lock.json
npm install
npm run dev
```

---

## Summary

**Two things needed:**
1. ✅ Backend `.env` file configured
2. ✅ Backend server running on port 3001

**Then:**
- Switch MetaMask to Sepolia
- Refresh website
- See your NFTs!

🚀 **You're almost there!**
