@echo off
echo Cleaning up redundant files...
echo.

del /Q "COMPLETE_ANSWERS.md" 2>nul
del /Q "CREATE_YOUR_ART.md" 2>nul
del /Q "ORGANIZE_YOUR_IMAGES.md" 2>nul
del /Q "PROJECT_OVERVIEW.md" 2>nul
del /Q "YOUR_ACTION_PLAN.md" 2>nul
del /Q "YOUR_CHECKLIST.md" 2>nul
del /Q "VIEW_NFT_IN_METAMASK.md" 2>nul

echo.
echo Cleanup complete!
echo.
echo Repository: cosmic-guardians-nft
pause
