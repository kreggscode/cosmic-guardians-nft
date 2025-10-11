# Simple script to copy and rename images

$sourcePath = "c:\Users\kreg9\Downloads\kreggscode\windsurf\NFT project\Pictures"
$destPath = "c:\Users\kreg9\Downloads\kreggscode\windsurf\NFT project\art-generator\output"

# Create output directory
New-Item -ItemType Directory -Path $destPath -Force | Out-Null

# Get all JPG files
$images = Get-ChildItem -Path $sourcePath -Filter "*.jpg" | Sort-Object Name

Write-Host "Found $($images.Count) images"

# Copy and rename
$counter = 1
foreach ($image in $images) {
    $newName = "$counter.jpg"
    $destFile = Join-Path $destPath $newName
    Copy-Item -Path $image.FullName -Destination $destFile -Force
    Write-Host "Copied: $newName"
    $counter++
}

Write-Host "Done! Images are in: $destPath"
