# Quick Start Script for NFT Project
# This starts both backend and frontend servers

Write-Host "🚀 Starting NFT Project Servers..." -ForegroundColor Cyan
Write-Host ""

# Check if backend .env exists
$backendEnv = ".\backend\.env"
if (-not (Test-Path $backendEnv)) {
    Write-Host "⚠️  Backend .env file not found!" -ForegroundColor Yellow
    Write-Host "Creating backend .env file..." -ForegroundColor Yellow
    
    $envContent = @"
# Server
PORT=3001
NODE_ENV=development

# Database (optional - will work without MongoDB)
MONGODB_URI=mongodb://localhost:27017/nft-project

# Blockchain
CONTRACT_ADDRESS=0x2cd2936c4D34B926100ceE1EcF279E6E04ba5234
CHAIN_ID=11155111
RPC_URL=https://sepolia.infura.io/v3/35d7e3d9e86943c295610f44c0b37815
PRIVATE_KEY=your_private_key_here

# IPFS (Pinata)
PINATA_API_KEY=b83b6a4fd5871a0c9c09
PINATA_SECRET_KEY=5536173b410abe5209116965f38f9a58eafeb2bc65d4a93ab3fd1159c0e5fbaa
PINATA_JWT=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJiYzU5MzY1Mi01MjAwLTRkZWYtYjc0YS1lZGJjYmE4YjdhYjgiLCJlbWFpbCI6ImtyZWc5ZGFAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjEsImlkIjoiRlJBMSJ9LHsiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjEsImlkIjoiTllDMSJ9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6ImI4M2I2YTRmZDU4NzFhMGM5YzA5Iiwic2NvcGVkS2V5U2VjcmV0IjoiNTUzNjE3M2I0MTBhYmU1MjA5MTE2OTY1ZjM4ZjlhNThlYWZlYjJiYzY1ZDRhOTNhYjNmZDExNTljMGU1ZmJhYSIsImV4cCI6MTc5MTcwMTY0Mn0.MY3sseDYXyNMD3C1NRLuItRQXQLgkWyfhXf7g9H1Xvw

# Security
JWT_SECRET=cosmic_guardians_secret_key_2024
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
"@
    
    $envContent | Out-File -FilePath $backendEnv -Encoding UTF8
    Write-Host "✅ Created backend .env file" -ForegroundColor Green
    Write-Host ""
}

# Check if frontend .env exists
$frontendEnv = ".\frontend\.env"
if (-not (Test-Path $frontendEnv)) {
    Write-Host "⚠️  Frontend .env file not found!" -ForegroundColor Yellow
    Write-Host "Creating frontend .env file..." -ForegroundColor Yellow
    
    $envContent = @"
# Contract Configuration
VITE_CONTRACT_ADDRESS=0x2cd2936c4D34B926100ceE1EcF279E6E04ba5234
VITE_CHAIN_ID=11155111

# API Configuration
VITE_API_URL=http://localhost:3001

# WalletConnect
VITE_WALLETCONNECT_PROJECT_ID=3044ade6ab3e5bbbc46d23a19db94321

# Network Configuration
VITE_NETWORK_NAME=Sepolia
VITE_RPC_URL=https://sepolia.infura.io/v3/35d7e3d9e86943c295610f44c0b37815
"@
    
    $envContent | Out-File -FilePath $frontendEnv -Encoding UTF8
    Write-Host "✅ Created frontend .env file" -ForegroundColor Green
    Write-Host ""
}

Write-Host "📦 Starting Backend Server..." -ForegroundColor Cyan
Write-Host "   Port: 3001" -ForegroundColor Gray
Write-Host ""

# Start backend in new window
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD\backend'; Write-Host '🔧 Backend Server Starting...' -ForegroundColor Cyan; npm run dev"

# Wait a bit for backend to start
Start-Sleep -Seconds 3

Write-Host "🌐 Starting Frontend Server..." -ForegroundColor Cyan
Write-Host "   Port: 5173" -ForegroundColor Gray
Write-Host ""

# Start frontend in new window
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD\frontend'; Write-Host '🎨 Frontend Server Starting...' -ForegroundColor Cyan; npm run dev"

Write-Host ""
Write-Host "✅ Servers are starting!" -ForegroundColor Green
Write-Host ""
Write-Host "📝 Next Steps:" -ForegroundColor Cyan
Write-Host "   1. Wait for both servers to start (10-20 seconds)" -ForegroundColor White
Write-Host "   2. Open: http://localhost:5173" -ForegroundColor White
Write-Host "   3. In MetaMask: Switch to Sepolia network" -ForegroundColor Yellow
Write-Host "   4. Connect your wallet" -ForegroundColor White
Write-Host "   5. See your 15 Cosmic Guardians!" -ForegroundColor White
Write-Host ""
Write-Host "⚠️  IMPORTANT: Switch MetaMask to Sepolia Network!" -ForegroundColor Yellow
Write-Host ""
