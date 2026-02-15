$baseDir = "D:\AA-1\algorithm-alchemy-studio\public\content\official_docs\ugr"

# 1. Force cleanup of duplicates/typos for Antropologia
$folders = Get-ChildItem $baseDir -Directory
$antropTarget = Join-Path $baseDir "Antropología Social y Cultural"
if (-not (Test-Path $antropTarget)) { New-Item -ItemType Directory -Path $antropTarget | Out-Null }

foreach ($f in $folders) {
    if ($f.Name -like "*Antro*Social*y*Cultural*") {
        if ($f.FullName -ne $antropTarget) {
            Write-Host "Moving files from $($f.Name) to target..."
            Get-ChildItem $f.FullName -File | ForEach-Object {
                $dest = Join-Path $antropTarget $_.Name
                if (-not (Test-Path $dest)) { Move-Item $_.FullName $dest }
            }
            Remove-Item $f.FullName -Recurse -Force
        }
    }
}

# 2. Re-fetch Antropologia to ensure 40+ subjects
Write-Host "Fetching Antropología subjects..."
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
            $save = Join-Path $antropTarget "$subj.pdf"
            if (-not (Test-Path $save)) {
                Write-Host "  + Downloading: $subj.pdf"
                Invoke-WebRequest -Uri $pdfUrl -OutFile $save -ErrorAction SilentlyContinue
            }
        }
    }
}
catch { Write-Warning "Fetch failed" }

$finalCount = (Get-ChildItem $antropTarget -File).Count
Write-Host "`nFinal Count for Antropología Social y Cultural: $finalCount"
