$baseDir = "D:\AA-1\algorithm-alchemy-studio\public\content\official_docs\ugr"
$degrees = @("Antropología Social y Cultural", "Enfermería", "Ingeniería Civil")

Write-Host "--- Final Audit Check ---"
foreach ($d in $degrees) {
    $path = Join-Path $baseDir $d
    if (Test-Path $path) {
        $count = (Get-ChildItem $path -File).Count
        Write-Host "${d}: $count files"
    }
    else {
        Write-Host "${d}: NOT FOUND"
    }
}

# Final download specifically for Antropologia (to be sure)
Write-Host "`nRefreshing Antropología..."
$url = "https://grados.ugr.es/informacion/guias-docentes-firmadas/2024-2025/grado-antropologia-social-cultural"
$target = Join-Path $baseDir "Antropología Social y Cultural"
if (-not (Test-Path $target)) { New-Item -ItemType Directory -Path $target | Out-Null }

try {
    $html = Invoke-WebRequest -Uri $url -UseBasicParsing
    $links = [regex]::Matches($html.Content, '<a(?=[^>]*href="([^"]+\.pdf)")[^>]*>(.*?)</a>', 'Singleline')
    foreach ($link in $links) {
        $pdfUrl = $link.Groups[1].Value
        $rawName = $link.Groups[2].Value -replace '<.*?>', '' -replace '&quot;', '"' -replace '&amp;', '&' -replace '\.pdf$', ''
        $subjectName = $rawName.Trim() -replace '[\\/:*?"<>|]', '_'
        if ($subjectName.Length -gt 3 -and $subjectName -notmatch "pdf") {
            if ($pdfUrl -notmatch "^http") { $pdfUrl = "https://grados.ugr.es" + $pdfUrl }
            $savePath = Join-Path $target "$subjectName.pdf"
            if (-not (Test-Path $savePath)) {
                Write-Host "  + New: $subjectName"
                Invoke-WebRequest -Uri $pdfUrl -OutFile $savePath -ErrorAction SilentlyContinue
            }
        }
    }
}
catch { Write-Warning "Failed fetch" }

Write-Host "`nFinal Count for Antropología: $((Get-ChildItem $target -File).Count)"
