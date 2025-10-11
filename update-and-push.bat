@echo off
echo ========================================
echo Quick Update and Push to GitHub
echo ========================================
echo.

echo Adding changes...
git add .

echo.
echo Committing changes...
set /p message="Enter commit message (or press Enter for default): "
if "%message%"=="" set message=Update project

git commit -m "%message%"

echo.
echo Pushing to GitHub...
git push

echo.
echo ========================================
echo Done!
echo ========================================
pause
