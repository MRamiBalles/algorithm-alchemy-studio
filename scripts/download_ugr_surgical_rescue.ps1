$baseDir = "D:\AA-1\algorithm-alchemy-studio\public\content\official_docs\ugr"
$degreesToRescue = @(
    "Antropología Social y Cultural",
    "Ingeniería Civil",
    "Enfermería"
)

# Reuse the nuclear logic but only for these 3
foreach ($degree in $degreesToRescue) {
    Write-Host "`n[Surgical Rescue] $degree"
    $targetFolder = Join-Path $baseDir $degree
    if (-not (Test-Path $targetFolder)) { New-Item -ItemType Directory -Path $targetFolder }

    # Map to portal URL segment (guess/match logic)
    $urlSegment = $degree.ToLower().Replace(" ", "-").Replace("í", "i").Replace("ó", "o").Replace("é", "e").Replace("á", "a").Replace("ñ", "n")
    if ($degree -eq "Antropología Social y Cultural") { $urlSegment = "grado-antropologia-social-cultural" }
    elseif ($degree -eq "Ingeniería Civil") { $urlSegment = "grado-ingenieria-civil" }
    elseif ($degree -eq "Enfermería") { $urlSegment = "grado-enfermeria" }

    $portalUrl = "https://grados.ugr.es/informacion/guias-docentes-firmadas/2024-2025/$urlSegment"
    Write-Host "  - Fetching: $portalUrl"
    
    try {
        $html = Invoke-WebRequest -Uri $portalUrl -UseBasicParsing
        $links = [regex]::Matches($html.Content, '<a(?=[^>]*href="([^"]+\.pdf)")[^>]*>(.*?)</a>', 'Singleline')
        
        foreach ($link in $links) {
            $pdfUrl = $link.Groups[1].Value
            $subjectName = $link.Groups[2].Value -replace '<.*?>', '' -replace '&quot;', '"' -replace '&amp;', '&' -replace '\.pdf$', '' -trim
            $subjectName = $subjectName -replace '[\\/:*?"<>|]', '_'
            
            if ($subjectName -notmatch "pdf" -and $subjectName.Length -gt 3) {
                if ($pdfUrl -notmatch "^http") { $pdfUrl = "https://grados.ugr.es" + $pdfUrl }
                $savePath = Join-Path $targetFolder "$subjectName.pdf"
                
                if (-not (Test-Path $savePath)) {
                    Write-Host "    + Downloading: $subjectName.pdf"
                    Invoke-WebRequest -Uri $pdfUrl -OutFile $savePath -ErrorAction SilentlyContinue
                }
            }
        }
    }
    catch {
        Write-Warning "  - Failed to fetch or parse $portalUrl"
    }
}

Write-Host "`nSurgical Rescue Complete."
