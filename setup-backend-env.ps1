# Setup Backend .env File
Write-Host "🔧 Setting up backend .env file..." -ForegroundColor Cyan

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
PRIVATE_KEY=0000000000000000000000000000000000000000000000000000000000000000

# IPFS (Pinata)
PINATA_API_KEY=b83b6a4fd5871a0c9c09
PINATA_SECRET_KEY=5536173b410abe5209116965f38f9a58eafeb2bc65d4a93ab3fd1159c0e5fbaa
PINATA_JWT=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJiYzU5MzY1Mi01MjAwLTRkZWYtYjc0YS1lZGJjYmE4YjdhYjgiLCJlbWFpbCI6ImtyZWc5ZGFAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjEsImlkIjoiRlJBMSJ9LHsiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjEsImlkIjoiTllDMSJ9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6ImI4M2I2YTRmZDU4NzFhMGM5YzA5Iiwic2NvcGVkS2V5U2VjcmV0IjoiNTUzNjE3M2I0MTBhYmU1MjA5MTE2OTY1ZjM4ZjlhNThlYWZlYjJiYzY1ZDRhOTNhYjNmZDExNTljMGU1ZmJhYSIsImV4cCI6MTc5MTcwMTY0Mn0.MY3sseDYXyNMD3C1NRLuItRQXQLgkWyfhXf7g9H1Xvw

# Security
JWT_SECRET=cosmic_guardians_secret_key_2024
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
"@

$envContent | Out-File -FilePath ".\backend\.env" -Encoding UTF8 -NoNewline

Write-Host "✅ Backend .env file created!" -ForegroundColor Green
Write-Host ""
Write-Host "Now starting backend server..." -ForegroundColor Cyan
Write-Host ""

cd backend
npm run dev
