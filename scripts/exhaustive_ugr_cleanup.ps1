$baseDir = "D:\AA-1\algorithm-alchemy-studio\public\content\official_docs\ugr"
$folders = Get-ChildItem $baseDir -Directory

# Define official names to protect/consolidate into
$officialNames = @(
    "Antropología Social y Cultural",
    "Enfermería",
    "Ingeniería Civil",
    "Información y Documentación",
    "Geología",
    "Historia",
    "Historia del Arte",
    "Historia y Ciencias de la Música",
    "Ingeniería de Tecnologías de Telecomunicación",
    "Ingeniería Electrónica Industrial",
    "Ingeniería Informática",
    "Ingeniería Química",
    "Lenguas Modernas y sus Literaturas",
    "Literaturas Comparadas",
    "Marketing e Investigación de Mercados",
    "Matemáticas",
    "Nutrición Humana y Dietética",
    "Odontología",
    "Óptica y optometría",
    "Pedagogía",
    "Psicología",
    "Química",
    "Relaciones Laborales y Recursos Humanos",
    "Bioquímica"
)

function Get-CleanString($s) {
    return $s.ToLower().Replace(" ", "").Replace("í", "i").Replace("ó", "o").Replace("é", "e").Replace("á", "a").Replace("ñ", "n").Replace("Ã­", "i").Replace("", "i")
}

foreach ($f in $folders) {
    $cleanF = Get-CleanString $f.Name
    foreach ($off in $officialNames) {
        $cleanOff = Get-CleanString $off
        if ($cleanF -eq $cleanOff -and $f.Name -ne $off) {
            Write-Host "Consolidating ghost folder: $($f.Name) -> $off"
            $targetPath = Join-Path $baseDir $off
            if (-not (Test-Path $targetPath)) { New-Item -ItemType Directory -Path $targetPath | Out-Null }
            Get-ChildItem $f.FullName -File | ForEach-Object {
                $dest = Join-Path $targetPath $_.Name
                if (-not (Test-Path $dest)) { Move-Item $_.FullName $dest }
                else { Remove-Item $_.FullName }
            }
            Remove-Item $f.FullName -Recurse -Force
            break
        }
    }
}

Write-Host "Cleanup Complete."
