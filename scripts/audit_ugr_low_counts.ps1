$baseDir = "D:\AA-1\algorithm-alchemy-studio\public\content\official_docs\ugr"
$folders = Get-ChildItem $baseDir -Directory

Write-Host "--- Folders with < 40 files ---"
foreach ($f in $folders) {
    $count = (Get-ChildItem $f.FullName -File).Count
    if ($count -lt 40) {
        Write-Host "$($f.Name): $count files"
    }
}

Write-Host "`n--- Empty Folders ---"
foreach ($f in $folders) {
    if ((Get-ChildItem $f.FullName -File).Count -eq 0) {
        Write-Host "EMPTY: $($f.Name)"
    }
}
