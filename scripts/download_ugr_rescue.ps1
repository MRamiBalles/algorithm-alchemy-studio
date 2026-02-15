$baseDir = "D:\AA-1\algorithm-alchemy-studio\public\content\official_docs\ugr"

$degreeMap = @{
    "*Bioquim*"      = @{
        "Biologia_Celular" = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2611114.pdf"
        "Enzimologia"      = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2611123.pdf"
        "Biocomputacion"   = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/26111B1.pdf"
    }
    "*Quimica*"      = @{
        "Quimica_General_I"  = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2911113.pdf"
        "Quimica_General_II" = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2911114.pdf"
        "Quimica_Organica"   = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2911125.pdf"
    }
    "*Antropolog*"   = @{
        "Antropologia_Social"    = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2941111.pdf"
        "Antropologia_Evolucion" = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2941116.pdf"
        "Creencias_Rituales"     = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2941124.pdf"
    }
    "*Optica*"       = @{
        "Optica_Geometrica" = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2871119.pdf"
        "Optica_Fisica"     = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2871125.pdf"
        "Optometria"        = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2871128.pdf"
    }
    "*Bellas Artes*" = @{
        "Fotografia"           = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2601115.pdf"
        "Principios_Escultura" = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2601113.pdf"
        "Principios_Pintura"   = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2601114.pdf"
        "Teoria_Historia_Arte" = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2601111.pdf"
    }
}

foreach ($pattern in $degreeMap.Keys) {
    $dirs = Get-ChildItem -Path $baseDir -Directory -Filter $pattern
    
    $targetDir = $null
    if ($pattern -eq "*Quimica*") {
        # Avoid 'Ingenieria Quimica'
        $targetDir = $dirs | Where-Object { $_.Name -match "^Quimica" -or $_.Name -match "^Qumica" } | Select-Object -ExpandProperty FullName -First 1
    }
    else {
        $targetDir = $dirs | Select-Object -ExpandProperty FullName -First 1
    }

    if ($targetDir) {
        Write-Host "Processing $targetDir..."
        $subjects = $degreeMap[$pattern]
        foreach ($subName in $subjects.Keys) {
            $dest = Join-Path $targetDir ($subName + ".pdf")
            if (-not (Test-Path $dest)) {
                Write-Host "  Downloading $subName..."
                try {
                    Invoke-WebRequest -Uri $subjects[$subName] -OutFile $dest -ErrorAction Stop
                }
                catch {
                    Write-Warning "  Failed to download $subName"
                }
            }
            else {
                Write-Host "  $subName already exists."
            }
        }
    }
    else {
        Write-Warning "No directory found for pattern: $pattern"
    }
}
