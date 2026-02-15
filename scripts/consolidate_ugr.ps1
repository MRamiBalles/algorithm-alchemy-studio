$baseDir = "D:\AA-1\algorithm-alchemy-studio\public\content\official_docs\ugr"

function Consolidate($sourceName, $targetName) {
    $sourcePath = Join-Path $baseDir $sourceName
    $targetPath = Join-Path $baseDir $targetName
    
    if (Test-Path $sourcePath) {
        Write-Host "Consolidating $sourceName -> $targetName"
        if (-not (Test-Path $targetPath)) { New-Item -ItemType Directory -Path $targetPath | Out-Null }
        Get-ChildItem $sourcePath -File | ForEach-Object {
            $dest = Join-Path $targetPath $_.Name
            if (-not (Test-Path $dest)) { Move-Item $_.FullName $dest }
            else { Remove-Item $_.FullName } # Duplicate
        }
        Remove-Item $sourcePath -Recurve -Force
    }
}

# Consolidate known mangled patterns
Consolidate "Antrologa Social y Cultural" "Antropología Social y Cultural"
Consolidate "AntropologÃ­a Social y Cultural" "Antropología Social y Cultural"
Consolidate "EnfermerÃ­a" "Enfermería"
Consolidate "IngenierÃ­a Civil" "Ingeniería Civil"

Write-Host "Consolidation Complete."
