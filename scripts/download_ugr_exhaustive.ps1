[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12

$baseDir = "D:\AA-1\algorithm-alchemy-studio\public\content\official_docs\ugr"
$indexUrl = "https://grados.ugr.es/informacion/guias-docentes-firmadas/2024-2025"

Write-Host "Fetching main degree index..."
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
    
    # Correct URL Resolution
    $degreeUrl = if ($degreeRawUrl.StartsWith("http")) { $degreeRawUrl } else { "https://grados.ugr.es" + $degreeRawUrl }

    if ($degreeName -match "\(Ceuta\)" -or $degreeName -match "\(Melilla\)" -or $degreeName -match "\(Mel.\)" -or $degreeName -match "\(Bilingue\)") { continue }

    # Robust Folder Matching
    $cleanDegreeName = $degreeName -replace 'Grado en ', '' -replace 'Doble ', ''
    $targetFolder = $folders | Where-Object { 
        $_.Name -eq $cleanDegreeName -or 
        $_.Name -eq ($cleanDegreeName -replace ' y ', ' y de ') -or
        $_.Name -eq ($cleanDegreeName -replace ' y de ', ' y ') -or
        $_.Name -like "*$($cleanDegreeName)*"
    } | Sort-Object { $_.Name.Length } | Select-Object -First 1

    if ($targetFolder) {
        Write-Host "`n[Portal] $($degreeName) -> folder: $($targetFolder.Name)"
        try {
            $degreeHtml = Invoke-WebRequest -Uri $degreeUrl -UseBasicParsing
            # Permissive PDF and Subject capture
            $pdfMatches = [regex]::Matches($degreeHtml.Content, '<a [^>]*href="([^"]+\.pdf)"[^>]*>([^<]+)</a>')
            
            foreach ($link in $pdfMatches) {
                $rawPdfUrl = $link.Groups[1].Value
                $pdfText = $link.Groups[2].Value.Trim() -replace '&amp;', '&'
                $fullPdfUrl = if ($rawPdfUrl.StartsWith("http")) { $rawPdfUrl } else { "https://grados.ugr.es" + $rawPdfUrl }

                # Filter English
                if ($fullPdfUrl -match "-en\.pdf" -or $pdfText -match "pdf-en" -or $pdfText -match "English") { continue }

                # Extract Code
                $code = if ($fullPdfUrl -match "/(\d+[A-Z0-9]?)\.pdf") { $Matches[1] } else { "" }
                $subject = $pdfText -replace '\(pdf\)', '' -replace '[\[\]]', ''
                $safeName = $subject.Trim() -replace '[\\\/:*?"<>|]', '_'
                
                if (-not $safeName) { continue }

                $namedFile = Join-Path $targetFolder.FullName "$($safeName).pdf"
                $numericFile = if ($code) { Join-Path $targetFolder.FullName "$($code).pdf" } else { $null }

                # Handle files
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
