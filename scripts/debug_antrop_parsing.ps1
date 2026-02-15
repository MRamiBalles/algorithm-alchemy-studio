$url = "https://grados.ugr.es/informacion/guias-docentes-firmadas/2024-2025/grado-antropologia-social-cultural"
$html = (Invoke-WebRequest -Uri $url -UseBasicParsing).Content
$matches = [regex]::Matches($html, '<a\s+[^>]*href="([^"]+)"[^>]*>(.*?)</a>', 'Singleline')
Write-Host "Total links found: $($matches.Count)"
foreach ($m in $matches) {
    if ($m.Groups[1].Value -match "\.pdf") {
        Write-Host "PDF: $($m.Groups[1].Value) | Text: $($m.Groups[2].Value)"
    }
}
