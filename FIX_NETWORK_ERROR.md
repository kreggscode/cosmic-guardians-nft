# 🔧 Fix: Network Error & No Images Showing

## Problem
You're seeing:
- ❌ "Network Error" on the website
- ❌ No NFT images showing
- ❌ Connected to Ethereum Mainnet (wrong network)

## Solution

### Step 1: Switch MetaMask to Sepolia Network ⚠️ CRITICAL

**Your MetaMask is on Ethereum Mainnet, but the contract is on Sepolia Testnet!**

1. **Click the network dropdown** in MetaMask (currently shows "Ethereum Mainnet")
2. **Select "Sepolia test network"**

**If you don't see Sepolia:**
1. Click MetaMask menu (three lines)
2. Go to "Settings"
3. Go to "Advanced"
4. Turn ON "Show test networks"
5. Go back and select "Sepolia"

---

### Step 2: Start Backend Server

Open PowerShell/Terminal and run:

```powershell
cd "c:\Users\kreg9\Downloads\kreggscode\windsurf\NFT project\backend"
npm run dev
```

**Expected output:**
```
🔧 Backend Server Starting...
Server running on port 3001
```

**Leave this terminal open!**

---

### Step 3: Refresh the Website

1. Go back to http://localhost:5173
2. **Make sure MetaMask shows "Sepolia"** (not Ethereum Mainnet)
3. Refresh the page (F5)
4. You should now see your 15 Cosmic Guardians!

---

## Why This Happened

### 1. Wrong Network
- Your contract is on **Sepolia Testnet**
- MetaMask was on **Ethereum Mainnet**
- They're completely different networks!

### 2. Backend Not Running
- Frontend can't load NFTs without backend
- Backend provides the NFT data and vouchers
- "Network Error" = backend not responding

---

## Quick Test

After fixing, you should see:

✅ MetaMask shows "Sepolia" network
✅ Backend terminal shows "Server running on port 3001"
✅ Website shows 15 Cosmic Guardian NFTs
✅ No "Network Error" message

---

## If Still Not Working

### Check Backend is Running:
```powershell
# In a new terminal
curl http://localhost:3001/api/health
```

Should return: `{"status":"ok"}`

### Check Frontend .env:
File: `frontend\.env`

Should have:
```env
VITE_CONTRACT_ADDRESS=0x2cd2936c4D34B926100ceE1EcF279E6E04ba5234
VITE_CHAIN_ID=11155111
VITE_API_URL=http://localhost:3001
```

### Check Backend .env:
File: `backend\.env`

Should have:
```env
CONTRACT_ADDRESS=0x2cd2936c4D34B926100ceE1EcF279E6E04ba5234
CHAIN_ID=11155111
PORT=3001
```

---

## Summary

**The main issue:** You're on the wrong network!

**Fix:**
1. Switch MetaMask to Sepolia
2. Start backend server
3. Refresh website
4. See your NFTs!

**Once you switch to Sepolia and start the backend, everything will work!** 🚀
