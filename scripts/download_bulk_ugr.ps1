$baseDir = "D:\AA-1\algorithm-alchemy-studio\public\content\official_docs\ugr"

$degreeMap = @{
    "Derech*"               = @{
        "Derecho_Constitucional_I" = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2421115.pdf"
        "Derecho_Romano"           = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2421112.pdf"
        "Economia_Politica"        = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2421114.pdf"
        "Historia_Derecho"         = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2421111.pdf"
        "Teoria_Derecho"           = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2421113.pdf"
        "Derecho_Administrativo_I" = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2421123.pdf"
        "Derecho_Penal_II"         = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2421122.pdf"
    }
    "Medicin*"              = @{
        "Anatomia_Humana_I"  = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2221111.pdf"
        "Bioquimica_General" = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2221113.pdf"
        "Fisiologia_General" = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2221114.pdf"
        "Inmunologia"        = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/222111B.pdf"
        "Psiquiatria"        = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2221136.pdf"
    }
    "Ingeniera Informtica*" = @{
        "Algebra_Lineal"           = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2961111.pdf"
        "Fundamentos_Programacion" = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2961115.pdf"
        "Inteligencia_Artificial"  = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2961129.pdf"
        "Ingenieria_Servidores"    = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2961135.pdf"
    }
    "Bioqumica*"            = @{
        "Biologia_Celular" = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2611114.pdf"
        "Enzimologia"      = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2611123.pdf"
        "Biocomputacion"   = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/26111B1.pdf"
    }
    "Sociologa*"            = @{
        "Introduccion_Sociologia"    = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2141111.pdf"
        "Teoria_Sociologica_Clasica" = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2141127.pdf"
        "Analisis_Demografico"       = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2141141.pdf"
    }
}

foreach ($pattern in $degreeMap.Keys) {
    $targetDir = Get-ChildItem -Path $baseDir -Directory -Filter $pattern | Select-Object -ExpandProperty FullName -First 1
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
