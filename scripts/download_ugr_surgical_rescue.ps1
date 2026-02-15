$baseDir = "D:\AA-1\algorithm-alchemy-studio\public\content\official_docs\ugr"

$degreeMap = @{
    "*Bioq*mica*" = @{
        "Biologia_Celular" = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2611114.pdf"
        "Enzimologia"      = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2611123.pdf"
        "Biocomputacion"   = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/26111B1.pdf"
    }
    "*ntrol*g*a*" = @{ # Matching 'Antrologa'
        "Antropologia_Social"    = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2941111.pdf"
        "Antropologia_Evolucion" = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2941116.pdf"
        "Creencias_Rituales"     = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2941124.pdf"
    }
    "*ptica*"     = @{
        "Optica_Geometrica" = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2871119.pdf"
        "Optica_Fisica"     = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2871125.pdf"
        "Optometria"        = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2871128.pdf"
    }
}

# Separate handle for Qumica to ignore Ingeniera Qumica
$quimDirs = Get-ChildItem -Path $baseDir -Directory -Filter "*Qu*mica*"
$targetQuim = $quimDirs | Where-Object { $_.Name -notmatch "Ingenier" } | Select-Object -ExpandProperty FullName -First 1

if ($targetQuim) {
    Write-Host "Processing $targetQuim..."
    $qLinks = @{
        "Quimica_General_I"  = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2911113.pdf"
        "Quimica_General_II" = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2911114.pdf"
        "Quimica_Organica"   = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2911125.pdf"
    }
    foreach ($sn in $qLinks.Keys) {
        $dest = Join-Path $targetQuim ($sn + ".pdf")
        if (-not (Test-Path $dest)) {
            Write-Host "  Downloading $sn..."
            try { Invoke-WebRequest -Uri $qLinks[$sn] -OutFile $dest -ErrorAction Stop } catch { Write-Warning "  Failed $sn" }
        }
    }
}

foreach ($p in $degreeMap.Keys) {
    $d = Get-ChildItem -Path $baseDir -Directory -Filter $p | Select-Object -ExpandProperty FullName -First 1
    if ($d) {
        Write-Host "Processing $d..."
        $subs = $degreeMap[$p]
        foreach ($sn in $subs.Keys) {
            $dest = Join-Path $d ($sn + ".pdf")
            if (-not (Test-Path $dest)) {
                Write-Host "  Downloading $sn..."
                try { Invoke-WebRequest -Uri $subs[$sn] -OutFile $dest -ErrorAction Stop } catch { Write-Warning "  Failed $sn" }
            }
        }
    }
    else {
        Write-Warning "No dir for $p"
    }
}
