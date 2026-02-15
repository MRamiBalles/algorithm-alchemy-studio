$ugr_path = "D:\AA-1\algorithm-alchemy-studio\public\content\official_docs\ugr"

# MASTER MAPPING OF UGR DEGREES (4-YEAR EXHAUSTIVE)
$degree_map = @{
    # Social Sciences & Humanities
    "*Arqueolog*"               = @{
        "Introduccion_a_la_Arqueologia.pdf"         = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2631121.pdf";
        "Arqueologia_Medieval.pdf"                  = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2631131.pdf";
        "Arquigrafia_y_Analisis_Arquitectonico.pdf" = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2631144.pdf";
        "Arqueometria.pdf"                          = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2631132.pdf";
        "Bioarqueologia.pdf"                        = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2631133.pdf";
        "Gestion_del_Patrimonio_Arqueologico.pdf"   = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2631134.pdf"
    };
    "*Comunicacin*Audiovisual*" = @{
        "Medios_de_Comunicacion.pdf"    = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2271111.pdf";
        "Derecho_Informaion.pdf"        = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2271113.pdf";
        "Comunicacion_Periodistica.pdf" = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2271115.pdf";
        "Narrativa_Audiovisual.pdf"     = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2271123.pdf";
        "Realizacion_Direccion.pdf"     = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2271131.pdf"
    };
    "*Criminolog*"              = @{
        "Derecho_Penal_I.pdf"     = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2451121.pdf";
        "Psicologia_Criminal.pdf" = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2451125.pdf";
        "Penologia.pdf"           = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2451132.pdf";
        "Victimologia.pdf"        = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2451133.pdf"
    };
    "*Econom*"                  = @{
        "Microeconomia_I.pdf"  = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2361121.pdf";
        "Macroeconomia_I.pdf"  = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2361125.pdf";
        "Economia_Mundial.pdf" = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2361123.pdf";
        "Econometria_I.pdf"    = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2361131.pdf"
    };
    "*Educacin*Social*"         = @{
        "Pedagogia_Social.pdf"     = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2311122.pdf";
        "Sociologia_Educacion.pdf" = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2311118.pdf";
        "Politicas_Sociales.pdf"   = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2311121.pdf"
    };
    "*Polticas*"                = @{
        "Fundamentos_Ciencia_Admin.pdf" = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2121112.pdf";
        "Fundamentos_Ciencia_Pol_I.pdf" = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2121111.pdf";
        "Sistema_Pol_Espanol.pdf"       = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2121123.pdf";
        "Analisis_Politicas_Pub.pdf"    = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2121132.pdf";
        "Comunicacion_Politica.pdf"     = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2121143.pdf"
    };
    "*Historia_del_Arte*"       = @{
        "Historia_del_Arte_Clasico.pdf" = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2931122.pdf";
        "Renacimiento.pdf"              = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2931127.pdf";
        "Vanguardias.pdf"               = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2931136.pdf";
        "Museologia.pdf"                = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/293113A.pdf"
    };

    # STEM
    "*Biolog*"                  = @{
        "Genetica_I.pdf"         = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2001124.pdf";
        "Zoologia.pdf"           = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2001125.pdf";
        "Fisiologia_Animal.pdf"  = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2001132.pdf";
        "Biologia_Evolutiva.pdf" = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2001116.pdf"
    };
    "*Biotecnolog*"             = @{
        "Ingenieria_Genetica.pdf" = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2511132.pdf";
        "Biorreactores.pdf"       = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2511131.pdf";
        "Inmunologia.pdf"         = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2511143.pdf"
    };
    "*Ambientales*"             = @{
        "Impacto_Ambiental.pdf"         = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2061142.pdf";
        "Contaminacion_Atmosferica.pdf" = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2061131.pdf";
        "Ecologia_Organismos.pdf"       = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2061121.pdf"
    };
    "*Alimentos*"               = @{
        "Quimica_Bioquimica_Alimentos.pdf"  = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2031122.pdf";
        "Tecnologia_Alimentos_I.pdf"        = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2031133.pdf";
        "Higiene_Seguridad_Alimentaria.pdf" = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2031143.pdf"
    };
    "*Deporte*"                 = @{
        "Anatomia_Funcional.pdf" = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2881111.pdf";
        "Biomecanica.pdf"        = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2881117.pdf";
        "Fisiologia_Humana.pdf"  = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2881127.pdf"
    };
    "*Antrolog*"                = @{
        "Antropologia_Social_Cultural.pdf" = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2941111.pdf";
        "Creencias_Rituales.pdf"           = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2941124.pdf";
        "Antropologia_Salud.pdf"           = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2941134.pdf"
    };
}

$all_folders = Get-ChildItem -Path $ugr_path -Directory

foreach ($pattern in $degree_map.Keys) {
    # Special handling for Historia to avoid matching 'Historia del Arte'
    if ($pattern -eq "Historia") {
        $matching_folders = $all_folders | Where-Object { $_.Name -eq "Historia" }
    }
    else {
        $matching_folders = $all_folders | Where-Object { $_.Name -like $pattern }
    }
    
    if ($matching_folders) {
        foreach ($folder in $matching_folders) {
            $subjects = $degree_map[$pattern]
            Write-Host "Nucleating progress for: $($folder.Name)" -ForegroundColor Cyan
            foreach ($sub_name in $subjects.Keys) {
                $dest = Join-Path $folder.FullName $sub_name
                if (-not (Test-Path $dest)) {
                    Write-Host "  Fetching $sub_name..." -NoNewline
                    try {
                        Invoke-WebRequest -Uri $subjects[$sub_name] -OutFile $dest -ErrorAction Stop
                        Write-Host " SUCCESS" -ForegroundColor Green
                    }
                    catch {
                        Write-Host " SKIP ($($_.Exception.Message))" -ForegroundColor Yellow
                    }
                }
                else {
                    Write-Host "  $sub_name exists." -ForegroundColor Gray
                }
            }
        }
    }
}
