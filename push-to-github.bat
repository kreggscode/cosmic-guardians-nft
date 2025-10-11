@echo off
echo ========================================
echo Pushing Cosmic Guardians NFT to GitHub
echo ========================================
echo.

REM Check if git is initialized
if not exist ".git" (
    echo Initializing git repository...
    git init
)

echo.
echo Adding all files...
git add .

echo.
echo Committing changes...
git commit -m "Update: Cosmic Guardians NFT Collection"

echo.
echo Setting main branch...
git branch -M main

echo.
echo Adding remote origin...
git remote remove origin 2>nul
git remote add origin https://github.com/kreggscode/cosmic-guardians-nft.git

echo.
echo Pushing to GitHub...
git push -u origin main --force

echo.
echo ========================================
echo Push complete!
echo ========================================
pause
