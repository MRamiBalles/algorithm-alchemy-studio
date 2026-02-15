[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12

$baseDir = "D:\AA-1\algorithm-alchemy-studio\public\content\official_docs\ugr"
$indexUrl = "https://grados.ugr.es/informacion/guias-docentes-firmadas/2024-2025"

Write-Host "Starting Nuclear Refinement..."

try {
    $indexHtml = Invoke-WebRequest -Uri $indexUrl -UseBasicParsing
    $matches = [regex]::Matches($indexHtml.Content, '<a [^>]*href="([^"]*/grado-[^"]+)"[^>]*>([^<]+)</a>')
}
catch {
    Write-Error "Failed to reach index."
    exit
}

$folders = Get-ChildItem $baseDir -Directory

foreach ($m in $matches) {
    $degreeRawUrl = $m.Groups[1].Value
    $degreeName = $m.Groups[2].Value.Trim() -replace '&amp;', '&'
    $degreeUrl = if ($degreeRawUrl.StartsWith("http")) { $degreeRawUrl } else { "https://grados.ugr.es" + $degreeRawUrl }

    if ($degreeName -match "\(Ceuta\)" -or $degreeName -match "\(Melilla\)" -or $degreeName -match "\(Mel.\)" -or $degreeName -match "\(Bilingue\)") { continue }

    # Strict Folder Match
    $cleanDegreeName = $degreeName -replace 'Grado en ', '' -replace 'Doble ', ''
    $targetFolder = $folders | Where-Object { 
        $_.Name -eq $cleanDegreeName -or 
        $_.Name -eq ($cleanDegreeName -replace ' y ', ' y de ')
    } | Select-Object -First 1

    if ($targetFolder) {
        Write-Host "`n[Portal] $($degreeName) -> folder: $($targetFolder.Name)"
        try {
            $degreeHtml = Invoke-WebRequest -Uri $degreeUrl -UseBasicParsing
            
            # Robust extraction: Capture everything between <a> and </a>
            $pdfMatches = [regex]::Matches($degreeHtml.Content, '<a [^>]*href="([^"]+\.pdf)"[^>]*>([\s\S]*?)</a>')
            
            foreach ($link in $pdfMatches) {
                $rawPdfUrl = $link.Groups[1].Value
                $innerHtml = $link.Groups[2].Value
                
                $fullPdfUrl = if ($rawPdfUrl.StartsWith("http")) { $rawPdfUrl } else { "https://grados.ugr.es" + $rawPdfUrl }

                # Filter English
                if ($fullPdfUrl -match "-en\.pdf" -or $innerHtml -match "pdf-en" -or $innerHtml -match "English") { continue }

                # Clean Subject Name (strip HTML tags like <i> and trim)
                $subject = $innerHtml -replace '<[^>]*>', '' -replace '\(pdf\)', '' -replace '[\[\]]', ''
                $safeName = $subject.Trim() -replace '[\\\/:*?"<>|]', '_'
                
                if (-not $safeName) { continue }

                # Extract numeric code for renaming
                $code = if ($fullPdfUrl -match "/(\d+[A-Z0-9]?)\.pdf") { $Matches[1] } else { "" }

                $namedFile = Join-Path $targetFolder.FullName "$($safeName).pdf"
                $numericFile = if ($code) { Join-Path $targetFolder.FullName "$($code).pdf" } else { $null }

                if (Test-Path $namedFile) {
                    if ($numericFile -and (Test-Path $numericFile)) { Remove-Item $numericFile -Force }
                }
                elseif ($numericFile -and (Test-Path $numericFile)) {
                    Write-Host "  - Renaming: $($code).pdf -> $($safeName).pdf"
                    Rename-Item $numericFile -NewName "$($safeName).pdf" -ErrorAction SilentlyContinue
                }
                else {
                    Write-Host "  - Downloading: $($safeName).pdf"
                    try {
                        Invoke-WebRequest -Uri $fullPdfUrl -OutFile $namedFile -ErrorAction Stop
                    }
                    catch {
                        Write-Warning "    - Error for: $($safeName)"
                    }
                }
            }
        }
        catch {
            Write-Warning "  - Error portal: $($degreeUrl)"
        }
    }
}

Write-Host "`nNuclear Refinement Complete."
