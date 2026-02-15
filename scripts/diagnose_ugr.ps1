[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
$url = "https://grados.ugr.es/informacion/guias-docentes-firmadas/2024-2025/grado-administracion-direccion-empresas"
Write-Host "Fetching diagnostic HTML..."
$resp = Invoke-WebRequest -Uri $url -UseBasicParsing
$content = $resp.Content
# Look for a known PDF link to see the structure
if ($content -match "2351115.pdf") {
    $idx = $content.IndexOf("2351115.pdf")
    $start = [Math]::Max(0, $idx - 200)
    $length = [Math]::Min(1000, $content.Length - $start)
    Write-Host "Snippet around 2351115.pdf:"
    Write-Host $content.Substring($start, $length)
}
else {
    Write-Warning "Could not find expected subject code in HTML."
}
