# Cosmic Guardians - Quick Setup Script
# This automates the entire setup process

Write-Host "🚀 Cosmic Guardians - Quick Setup" -ForegroundColor Cyan
Write-Host "=================================" -ForegroundColor Cyan
Write-Host ""

$projectRoot = "c:\Users\kreg9\Downloads\kreggscode\windsurf\NFT project"
Set-Location $projectRoot

# Step 1: Organize Images
Write-Host "📸 Step 1: Organizing images..." -ForegroundColor Yellow
.\rename-images.ps1
Write-Host ""

# Step 2: Generate Metadata
Write-Host "📝 Step 2: Generating metadata..." -ForegroundColor Yellow
node generate-metadata.js
Write-Host ""

# Step 3: Install Dependencies
Write-Host "📦 Step 3: Installing dependencies..." -ForegroundColor Yellow

Write-Host "   Installing contracts dependencies..." -ForegroundColor Gray
Set-Location "$projectRoot\contracts"
npm install --silent
Write-Host "   ✅ Contracts dependencies installed" -ForegroundColor Green

Write-Host "   Installing backend dependencies..." -ForegroundColor Gray
Set-Location "$projectRoot\backend"
npm install --silent
Write-Host "   ✅ Backend dependencies installed" -ForegroundColor Green

Write-Host "   Installing frontend dependencies..." -ForegroundColor Gray
Set-Location "$projectRoot\frontend"
npm install --silent
Write-Host "   ✅ Frontend dependencies installed" -ForegroundColor Green

Write-Host "   Installing art-generator dependencies..." -ForegroundColor Gray
Set-Location "$projectRoot\art-generator"
npm install --silent
Write-Host "   ✅ Art-generator dependencies installed" -ForegroundColor Green

Set-Location $projectRoot
Write-Host ""

# Step 4: Check Environment Files
Write-Host "🔍 Step 4: Checking environment files..." -ForegroundColor Yellow

$envFiles = @(
    "backend\.env",
    "contracts\.env",
    "frontend\.env"
)

$missingEnv = @()
foreach ($envFile in $envFiles) {
    if (-not (Test-Path $envFile)) {
        $missingEnv += $envFile
        Write-Host "   ⚠️  Missing: $envFile" -ForegroundColor Red
    } else {
        Write-Host "   ✅ Found: $envFile" -ForegroundColor Green
    }
}

Write-Host ""

if ($missingEnv.Count -gt 0) {
    Write-Host "⚠️  WARNING: Some .env files are missing!" -ForegroundColor Red
    Write-Host "Please create these files using the templates in FINAL_SETUP_GUIDE.md" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Missing files:" -ForegroundColor Yellow
    foreach ($file in $missingEnv) {
        Write-Host "   - $file" -ForegroundColor Red
    }
    Write-Host ""
    Write-Host "Press any key to continue anyway, or Ctrl+C to exit and create the files first..."
    $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
}

# Summary
Write-Host "🎉 Setup Complete!" -ForegroundColor Green
Write-Host ""
Write-Host "📊 Your Cosmic Guardians Collection:" -ForegroundColor Cyan
Write-Host "   - 15 Unique Guardians" -ForegroundColor White
Write-Host "   - 2 Legendary - 0.20 ETH each" -ForegroundColor Magenta
Write-Host "   - 4 Epic - 0.12 ETH each" -ForegroundColor Red
Write-Host "   - 5 Rare - 0.08 ETH each" -ForegroundColor Blue
Write-Host "   - 4 Uncommon - 0.05 ETH each" -ForegroundColor Green
Write-Host "   - Total Value: 1.35 ETH or 4050 USD" -ForegroundColor Yellow
Write-Host ""

Write-Host "📝 Next Steps:" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. Make sure all .env files are created with your private key" -ForegroundColor White
Write-Host "   See: FINAL_SETUP_GUIDE.md" -ForegroundColor Gray
Write-Host ""
Write-Host "2. Deploy your smart contract:" -ForegroundColor White
Write-Host "   cd contracts" -ForegroundColor Gray
Write-Host "   npm run deploy:sepolia    # Test (FREE)" -ForegroundColor Gray
Write-Host "   npm run deploy:polygon    # Production ($1)" -ForegroundColor Gray
Write-Host ""
Write-Host "3. Upload to IPFS:" -ForegroundColor White
Write-Host "   cd art-generator" -ForegroundColor Gray
Write-Host "   npm run upload" -ForegroundColor Gray
Write-Host ""
Write-Host "4. Import to database:" -ForegroundColor White
Write-Host "   cd art-generator" -ForegroundColor Gray
Write-Host "   npm run import" -ForegroundColor Gray
Write-Host ""
Write-Host "5. Start your servers:" -ForegroundColor White
Write-Host "   Terminal 1: mongod" -ForegroundColor Gray
Write-Host "   Terminal 2: cd backend && npm run dev" -ForegroundColor Gray
Write-Host "   Terminal 3: cd frontend && npm run dev" -ForegroundColor Gray
Write-Host ""
Write-Host "🚀 Good luck with your launch!" -ForegroundColor Cyan
