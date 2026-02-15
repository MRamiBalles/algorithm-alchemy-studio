$baseDir = "D:\AA-1\algorithm-alchemy-studio\public\content\official_docs\ugr"
$folders = Get-ChildItem $baseDir -Directory

Write-Host "--- UGR FINAL AUDIT ---"
foreach ($f in $folders) {
    $count = (Get-ChildItem $f.FullName -File).Count
    Write-Host "$($f.Name): $count"
}

# Targeted populate for Antropologia if it's still low
$antropPath = Join-Path $baseDir "Antropología Social y Cultural"
$count = (Get-ChildItem $antropPath -File).Count
if ($count -lt 30) {
    Write-Host "`nPopulating Antropología Social y Cultural (currently $count)..."
    $url = "https://grados.ugr.es/informacion/guias-docentes-firmadas/2024-2025/grado-antropologia-social-cultural"
    try {
        $html = Invoke-WebRequest -Uri $url -UseBasicParsing
        $links = [regex]::Matches($html.Content, '<a(?=[^>]*href="([^"]+\.pdf)")[^>]*>(.*?)</a>', 'Singleline')
        foreach ($link in $links) {
            $pdfUrl = $link.Groups[1].Value
            $rawName = $link.Groups[2].Value -replace '<.*?>', '' -replace '&quot;', '"' -replace '&amp;', '&' -replace '\.pdf$', ''
            $subj = $rawName.Trim() -replace '[\\/:*?"<>|]', '_'
            if ($subj.Length -gt 3 -and $subj -notmatch "pdf") {
                if ($pdfUrl -notmatch "^http") { $pdfUrl = "https://grados.ugr.es" + $pdfUrl }
                $save = Join-Path $antropPath "$subj.pdf"
                if (-not (Test-Path $save)) {
                    Invoke-WebRequest -Uri $pdfUrl -OutFile $save -ErrorAction SilentlyContinue
                }
            }
        }
    }
    catch {}
    Write-Host "Final count for Antropología: $((Get-ChildItem $antropPath -File).Count)"
}
