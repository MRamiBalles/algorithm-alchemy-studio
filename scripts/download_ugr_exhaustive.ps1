# Force TLS 1.2
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12

$baseDir = "D:\AA-1\algorithm-alchemy-studio\public\content\official_docs\ugr"
$indexUrl = "https://grados.ugr.es/informacion/guias-docentes-firmadas/2024-2025"

Write-Host "Fetching main degree index..."
try {
    $indexHtml = Invoke-WebRequest -Uri $indexUrl -UseBasicParsing
    # Ultra-permissive link discovery
    $matches = [regex]::Matches($indexHtml.Content, '<a [^>]*href="([^"]*/grado-[^"]+)"[^>]*>([^<]+)</a>')
}
catch {
    Write-Error "Failed to reach UGR portal index."
    exit
}

Write-Host "Found $($matches.Count) potential degree links."

$folders = Get-ChildItem $baseDir -Directory

foreach ($m in $matches) {
    $degreeRelUrl = $m.Groups[1].Value
    $degreeName = $m.Groups[2].Value.Trim() -replace '&amp;', '&'
    
    # Ensure full URL
    $degreeUrl = $degreeRelUrl
    if (-not $degreeUrl.StartsWith("http")) { $degreeUrl = "https://grados.ugr.es" + $degreeRelUrl }

    # Skip specific variations (User wants core Spanish degrees)
    if ($degreeName -match "\(Ceuta\)" -or $degreeName -match "\(Melilla\)" -or $degreeName -match "\(Mel.\)" -or $degreeName -match "\(Bilingue\)") {
        continue
    }

    # Dynamic pattern matching: prioritize long words for unique match
    $tokens = $degreeName -replace 'Grado en ', '' -replace 'Doble ', '' -replace 'de ', '' -replace 'y ', '' -replace 'la ', '' -replace 'del ', ''
    $importantTokens = $tokens.Split(' ') | Where-Object { $_.Length -gt 3 }
    if ($importantTokens.Count -eq 0) { $importantTokens = $tokens.Split(' ') }
    $pattern = "*" + ($importantTokens -join '*') + "*"
    
    $targetFolder = $folders | Where-Object { $_.Name -like $pattern } | Select-Object -First 1

    if ($targetFolder) {
        Write-Host "`n[Match] $($degreeName) -> folder: $($targetFolder.Name)"
        try {
            $degreeHtml = Invoke-WebRequest -Uri $degreeUrl -UseBasicParsing
            
            # Find PDF links that are not English
            # Pattern: <a href="...pdf">Subject Name</a>
            $pdfMatches = [regex]::Matches($degreeHtml.Content, '<a [^>]*href="([^"]+/guias-firmadas/[^"]+\.pdf)"[^>]*>([^<]+)</a>')
            
            foreach ($pm in $pdfMatches) {
                $rawLink = $pm.Groups[1].Value
                $linkText = $pm.Groups[2].Value.Trim() -replace '&amp;', '&'
                
                # Full URL resolution
                $fullPdfUrl = $rawLink
                if (-not $rawLink.StartsWith("http")) { $fullPdfUrl = "https://grados.ugr.es" + $rawLink }

                # Filter English
                if ($fullPdfUrl -match "-en.pdf" -or $linkText -match "pdf-en" -or $linkText -match "English") { continue }

                # Extract and sanitize Subject Name
                # Common pattern: "Biología (pdf)" or "[Biología (pdf)]"
                $subjectName = $linkText -replace '\(pdf\)', '' -replace '[\[\]]', ''
                $safeName = $subjectName.Trim() -replace '[\\\/:*?"<>|]', '_'
                $destPath = Join-Path $targetFolder.FullName "$($safeName).pdf"
                
                if (-not (Test-Path $destPath)) {
                    Write-Host "  - Downloading: $($safeName).pdf"
                    try {
                        Invoke-WebRequest -Uri $fullPdfUrl -OutFile $destPath -ErrorAction Stop
                    }
                    catch {
                        Write-Warning "    - Download failed for: $($safeName)"
                    }
                }
            }
        }
        catch {
            Write-Warning "  - Skip portal error: $($degreeUrl)"
        }
    }
    else {
        # Optional: uncomment to see missed matches
        # Write-Host "[Miss] No folder for: $($degreeName) (Pattern: $($pattern))" -ForegroundColor Gray
    }
}

Write-Host "`nGlobal Rescue Operation Complete."
