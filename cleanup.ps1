# Cleanup Script for Cosmic Guardians NFT
# Run this before pushing to GitHub

Write-Host "🧹 Cleaning up redundant files..." -ForegroundColor Cyan

# Files to delete
$filesToDelete = @(
    "COMPLETE_ANSWERS.md",
    "CREATE_YOUR_ART.md",
    "ORGANIZE_YOUR_IMAGES.md",
    "PROJECT_OVERVIEW.md",
    "YOUR_ACTION_PLAN.md",
    "YOUR_CHECKLIST.md",
    "VIEW_NFT_IN_METAMASK.md"
)

foreach ($file in $filesToDelete) {
    if (Test-Path $file) {
        Remove-Item $file
        Write-Host "✅ Deleted: $file" -ForegroundColor Green
    } else {
        Write-Host "⚠️  Not found: $file" -ForegroundColor Yellow
    }
}

Write-Host ""
Write-Host "✨ Cleanup complete!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Next steps:" -ForegroundColor Cyan
Write-Host "1. Review GITHUB_PUSH_GUIDE.md"
Write-Host "2. Test locally (npm run dev in backend and frontend)"
Write-Host "3. Push to GitHub"
Write-Host "4. Deploy to Railway + Vercel"
Write-Host ""
Write-Host "Repository name: cosmic-guardians-nft" -ForegroundColor Magenta
