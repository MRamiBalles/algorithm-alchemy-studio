$baseDir = "D:\AA-1\algorithm-alchemy-studio\public\content\official_docs\ugr"
$degreesToRescue = @(
    "Antropología Social y Cultural",
    "Ingeniería Civil",
    "Enfermería"
)

foreach ($degree in $degreesToRescue) {
    Write-Host "`n[Surgical Rescue] $degree"
    $targetFolder = Join-Path $baseDir $degree
    if (-not (Test-Path $targetFolder)) { New-Item -ItemType Directory -Path $targetFolder | Out-Null }

    $urlSegment = "grado-" + $degree.ToLower().Replace(" ", "-").Replace("í", "i").Replace("ó", "o").Replace("é", "e").Replace("á", "a").Replace("ñ", "n")
    if ($degree -eq "Antropología Social y Cultural") { $urlSegment = "grado-antropologia-social-cultural" }
    elseif ($degree -eq "Ingeniería Civil") { $urlSegment = "grado-ingenieria-civil" }
    elseif ($degree -eq "Enfermería") { $urlSegment = "grado-enfermeria" }

    $portalUrl = "https://grados.ugr.es/informacion/guias-docentes-firmadas/2024-2025/$urlSegment"
    Write-Host "  - Fetching: $portalUrl"
    
    try {
        $html = (Invoke-WebRequest -Uri $portalUrl -UseBasicParsing).Content
        $matches = [regex]::Matches($html, '<a\s+[^>]*href="([^"]+\.pdf)"[^>]*>(.*?)</a>', 'Singleline')
        
        foreach ($m in $matches) {
            $pdfUrl = $m.Groups[1].Value
            # Clean HTML tags and entities, and remove the trailing "(pdf)" or ".pdf" from the name
            $subj = ($m.Groups[2].Value -replace '<.*?>', '' -replace '&quot;', '"' -replace '&amp;', '&').Trim()
            $subj = $subj -replace '\s*\(pdf\)\s*$', '' -replace '\.pdf$', ''
            $subj = $subj -replace '[\\/:*?"<>|]', '_'
            
            if ($subj.Length -gt 2) {
                if ($pdfUrl -notmatch "^http") { $pdfUrl = "https://grados.ugr.es" + $pdfUrl }
                $savePath = Join-Path $targetFolder "$subj.pdf"
                
                if (-not (Test-Path $savePath)) {
                    Write-Host "    + Downloading: $subj.pdf"
                    Invoke-WebRequest -Uri $pdfUrl -OutFile $savePath -ErrorAction SilentlyContinue
                }
            }
        }
    }
    catch {
        Write-Warning "  - Failed rescue for $degree"
    }
    Write-Host "  - Final Count: $((Get-ChildItem $targetFolder -File).Count)"
}

Write-Host "`nExhaustive Rescue Complete."
