$baseDir = "D:\AA-1\algorithm-alchemy-studio\public\content\official_docs\ugr"

$degreeMap = @{
    "Sociolog*"        = @{
        "Sociologia_General"         = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2141111.pdf"
        "Teoria_Sociologica_Clasica" = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2141127.pdf"
        "Analisis_Demografico"       = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2141141.pdf"
    }
    "Bioquim*"         = @{
        "Biologia_Celular" = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2611114.pdf"
        "Enzimologia"      = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2611123.pdf"
        "Biocomputacion"   = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/26111B1.pdf"
    }
    "Ingenier*Inform*" = @{
        "Algebra_Lineal"           = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2961111.pdf"
        "Fundamentos_Programacion" = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2961115.pdf"
        "Inteligencia_Artificial"  = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2961129.pdf"
        "Ingenieria_Servidores"    = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2961135.pdf"
    }
    "Geolog*"          = @{
        "Geologia_General"      = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2681111.pdf"
        "Cristalografia"        = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2681113.pdf"
        "Tectonica_Estructural" = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/268112B.pdf"
    }
    "Histori*"         = @{
        "Filosofia"         = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2921115.pdf"
        "Historia_Antigua"  = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2921112.pdf"
        "Historia_Medieval" = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2921113.pdf"
    }
    "Quimic*"          = @{
        "Quimica_General_I"  = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2911113.pdf"
        "Quimica_General_II" = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2911114.pdf"
        "Quimica_Organica"   = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2911125.pdf"
    }
    "Antropol*"        = @{
        "Antropologia_Social"    = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2941111.pdf"
        "Antropologia_Evolucion" = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2941116.pdf"
        "Creencias_Rituales"     = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2941124.pdf"
    }
    "Ingenier*Civil*"  = @{
        "Hidraulica_Hidrologia" = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2371139.pdf"
        "Seguridad_Salud"       = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2371133.pdf"
        "Estructuras_Metalicas" = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2371141.pdf"
    }
    "Optica*"          = @{
        "Optica_Geometrica" = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2871119.pdf"
        "Optica_Fisica"     = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2871125.pdf"
        "Optometria"        = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2871128.pdf"
    }
}

foreach ($pattern in $degreeMap.Keys) {
    # Special handle for Quimic* to avoid matching Ingenieria Quimica if possible
    # But usually Get-ChildItem with Filter will return multiple, we take the one that contains 'Grado en' or just the first hit if unambiguous.
    # Actually, the folders are named 'Quimica', 'Ingeniera Quimica', etc.
    # Let's use a more specific check.
    $dirs = Get-ChildItem -Path $baseDir -Directory -Filter $pattern
    
    $targetDir = $null
    if ($pattern -eq "Quimic*") {
        $targetDir = $dirs | Where-Object { $_.Name -match "^Quimica" } | Select-Object -ExpandProperty FullName -First 1
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
