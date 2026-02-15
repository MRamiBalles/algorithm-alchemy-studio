$ugr_path = "D:\AA-1\algorithm-alchemy-studio\public\content\official_docs\ugr"

$patch_map = @{
    "*Educaci*n*Social*"   = @{
        "Educacion_Social_Basica.pdf" = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2311122.pdf";
        "Sociologia_Educacion.pdf"    = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2311118.pdf"
    };
    "*Educaci*n*Infantil*" = @{
        "Desarrollo_Psicologico.pdf" = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2131113.pdf";
        "Organizacion_Centro.pdf"    = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2131121.pdf"
    };
    "*Educaci*n*Primaria*" = @{
        "Didactica_General.pdf"    = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2141121.pdf";
        "Psicologia_Educacion.pdf" = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2141113.pdf"
    };
    "*Psicolog*"           = @{
        "Psicologia_Social.pdf" = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2411123.pdf";
        "Psicobiologia.pdf"     = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2411121.pdf"
    };
}

$all_folders = Get-ChildItem -Path $ugr_path -Directory

foreach ($pattern in $patch_map.Keys) {
    $matching_folders = $all_folders | Where-Object { $_.Name -like $pattern }
    if ($matching_folders) {
        foreach ($folder in $matching_folders) {
            Write-Host "Patching: $($folder.Name)" -ForegroundColor Cyan
            $subjects = $patch_map[$pattern]
            foreach ($sub_name in $subjects.Keys) {
                $dest = Join-Path $folder.FullName $sub_name
                if (-not (Test-Path $dest)) {
                    Invoke-WebRequest -Uri $subjects[$sub_name] -OutFile $dest -ErrorAction SilentlyContinue
                }
            }
        }
    }
}
