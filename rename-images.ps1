# PowerShell Script to Rename Cosmic Guardians Images
# This will rename your images from long names to simple numbers

Write-Host "🎨 Cosmic Guardians - Image Renamer" -ForegroundColor Cyan
Write-Host ""

$sourcePath = "c:\Users\kreg9\Downloads\kreggscode\windsurf\NFT project\Pictures"
$destPath = "c:\Users\kreg9\Downloads\kreggscode\windsurf\NFT project\art-generator\output"

# Create output directory if it doesn't exist
if (-not (Test-Path $destPath)) {
    New-Item -ItemType Directory -Path $destPath -Force | Out-Null
    Write-Host "✅ Created output directory" -ForegroundColor Green
}

# Get all image files
$images = Get-ChildItem -Path $sourcePath -Filter "*.jpg" | Sort-Object Name

Write-Host "📊 Found $($images.Count) images" -ForegroundColor Yellow
Write-Host ""

# Counter for naming
$counter = 1

# Mapping for metadata generation
$mappings = @()

foreach ($image in $images) {
    $newName = "$counter.jpg"
    $destFile = Join-Path $destPath $newName
    
    # Copy and rename
    Copy-Item -Path $image.FullName -Destination $destFile -Force
    
    # Extract attributes from filename
    $originalName = $image.BaseName
    
    # Store mapping
    $mappings += [PSCustomObject]@{
        Number = $counter
        OriginalName = $originalName
        NewName = $newName
    }
    
    Write-Host "✅ Copied: $newName" -ForegroundColor Green
    Write-Host "   From: $($image.Name.Substring(0, [Math]::Min(60, $image.Name.Length)))..." -ForegroundColor Gray
    
    $counter++
}

# Save mappings to JSON for metadata generation
$mappings | ConvertTo-Json | Out-File -FilePath "$destPath\mappings.json" -Encoding UTF8

Write-Host ""
Write-Host "🎉 Done! All images copied and renamed!" -ForegroundColor Cyan
Write-Host "📁 Location: $destPath" -ForegroundColor Yellow
Write-Host ""
Write-Host "📝 Next step: Run the metadata generator" -ForegroundColor Cyan
Write-Host "   Command: node generate-metadata.js" -ForegroundColor White
