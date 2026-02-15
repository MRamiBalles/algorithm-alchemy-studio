$baseDir = "D:\AA-1\algorithm-alchemy-studio\public\content\official_docs\ugr"

$degreeMap = @{
    "Filosof*"  = @{
        "Antropologia_Cultural"        = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2631114.pdf"
        "Filosofia_y_Argumentacion"    = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2631111.pdf"
        "Historia_Contemporanea"       = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2631112.pdf"
        "Historia_Filosofia_Antigua_I" = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2631115.pdf"
        "Pensamiento_Espanol"          = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2631121.pdf"
        "Introduccion_Etica"           = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2631116.pdf"
        "Linguistica_General"          = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2631118.pdf"
        "Logica"                       = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2631119.pdf"
        "Metodos_Investigacion_Filo"   = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/263111A.pdf"
        "Sociologia_General"           = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2631113.pdf"
        "Epistemologia"                = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2631123.pdf"
        "Filosofia_Religion"           = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2631126.pdf"
        "Filosofia_Ciencia"            = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2631134.pdf"
        "Metafisica"                   = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2631133.pdf"
        "Bioetica"                     = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/26311MC.pdf"
    }
    "Matem*"    = @{
        "Algebra_I"                  = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2701113.pdf"
        "Calculo_I"                  = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2701111.pdf"
        "Estadistica_Descriptiva"    = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2701115.pdf"
        "Geometria_I"                = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2701112.pdf"
        "Informatica_I"              = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2701114.pdf"
        "Analisis_Matematico_I"      = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2701124.pdf"
        "Ecuaciones_Diferenciales_I" = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2701135.pdf"
        "Analisis_Funcional"         = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/270113B.pdf"
        "Historia_Matematicas"       = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/27011F1.pdf"
    }
    "Psicolog*" = @{
        "Introduccion_Psicologia"     = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2641111.pdf"
        "Fundamentos_Psicobiologia"   = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2641115.pdf"
        "Psicologia_Social"           = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2641114.pdf"
        "Condicionamiento_Motivacion" = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2641118.pdf"
        "Psicopatologia_Adulto"       = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/264111A.pdf"
    }
}

foreach ($pattern in $degreeMap.Keys) {
    $targetDir = Get-ChildItem -Path $baseDir -Directory -Filter $pattern | Select-Object -ExpandProperty FullName -First 1
    if ($targetDir) {
        Write-Host "Found directory: $targetDir"
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
