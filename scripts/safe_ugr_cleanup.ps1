$baseDir = "D:\AA-1\algorithm-alchemy-studio\public\content\official_docs\ugr"
$folders = Get-ChildItem $baseDir -Directory

function ConsolidateFolders($sourceName, $targetName) {
    if ($sourceName -eq $targetName) { return }
    $sourcePath = Join-Path $baseDir $sourceName
    $targetPath = Join-Path $baseDir $targetName
    
    if (Test-Path $sourcePath) {
        Write-Host "Merging $sourceName -> $targetName"
        if (-not (Test-Path $targetPath)) { New-Item -ItemType Directory -Path $targetPath | Out-Null }
        Get-ChildItem $sourcePath -File | ForEach-Object {
            $dest = Join-Path $targetPath $_.Name
            if (-not (Test-Path $dest)) { Move-Item $_.FullName $dest }
            else { Remove-Item $_.FullName }
        }
        Remove-Item $sourcePath -Recurse -Force
    }
}

foreach ($f in $folders) {
    $n = $f.Name
    if ($n -match "Antro.*Social.*y.*Cultural") { ConsolidateFolders $n "Antropología Social y Cultural" }
    elseif ($n -match "^Enfermer") { ConsolidateFolders $n "Enfermería" }
    elseif ($n -match "^Ingenier.*Civil") { ConsolidateFolders $n "Ingeniería Civil" }
    elseif ($n -match "^Informaci.*n.*y.*Documentaci") { ConsolidateFolders $n "Información y Documentación" }
    elseif ($n -eq "Informacion y Documentacion") { ConsolidateFolders $n "Información y Documentación" }
}

Write-Host "Cleanup completed."
