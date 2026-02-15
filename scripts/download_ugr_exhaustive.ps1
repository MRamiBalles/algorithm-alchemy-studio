$ugr_path = "D:\AA-1\algorithm-alchemy-studio\public\content\official_docs\ugr"

# Mapping of Degree Folder Wildcards to exhaustive list of subject PDFs
$degree_map = @{
    "*arqueologia*"              = @{
        "Antropologia_Fisica_y_Paleopatologia.pdf"             = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2631115.pdf";
        "Arquigrafia_y_Analisis_Arquitectonico.pdf"            = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2631144.pdf";
        "Arqueologia_de_Egipto_y_el_Proximo_Oriente.pdf"       = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2631112.pdf";
        "Arqueologia_de_la_Arquitectura.pdf"                   = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2631117.pdf";
        "Arqueologia_de_la_Grecia_Clasica.pdf"                 = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2631119.pdf";
        "Arqueologia_de_la_Hispania_Romana.pdf"                = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/26311D2.pdf";
        "Arqueologia_de_la_Muerte.pdf"                         = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/26311B3.pdf";
        "Arqueologia_del_Mundo_Fenicio_y_Punico.pdf"           = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/263111A.pdf";
        "Arqueologia_del_Numero_y_la_Forma.pdf"                = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2631111.pdf";
        "Arqueologia_del_Paisaje.pdf"                          = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/26311C2.pdf";
        "Arqueologia_Medieval.pdf"                             = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2631131.pdf";
        "Arqueologia_Postmedieval_e_Industrial.pdf"            = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/26311B1.pdf";
        "Arqueologia_Prehistorica_de_la_Peninsula_Iberica.pdf" = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/26311D1.pdf";
        "Arqueometria.pdf"                                     = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2631132.pdf";
        "Bioarqueologia.pdf"                                   = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2631133.pdf";
        "Epigrafia_y_Numismatica.pdf"                          = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2631114.pdf";
        "Gestion_del_Patrimonio_Arqueologico.pdf"              = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2631134.pdf";
        "Historia_Antigua.pdf"                                 = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2631113.pdf";
        "Historia_del_Arte_Antiguo_y_Medieval.pdf"             = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2631118.pdf";
        "Introduccion_a_la_Arqueologia.pdf"                    = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2631121.pdf";
    };
    "*comunicacion*audiovisual*" = @{
        "Bases_Tecnicas.pdf"            = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2271125.pdf";
        "Comunicacion_Periodistica.pdf" = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2271115.pdf";
        "Derecho_de_la_Informacion.pdf" = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2271113.pdf";
        "Medios_de_Comunicacion.pdf"    = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2271111.pdf";
        "Fotografia.pdf"                = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2271128.pdf";
        "Historia_del_Cine.pdf"         = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2271127.pdf";
        "Narrativa_Audiovisual.pdf"     = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2271123.pdf";
        "Realizacion_y_Direccion_I.pdf" = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2271131.pdf";
        "Gestion_Produccion.pdf"        = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2271133.pdf";
        "El_Cine_Espanol.pdf"           = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/22711C2.pdf";
    };
    "*criminologia*"             = @{
        "Derecho_Penal_I.pdf"             = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2451121.pdf";
        "Psicologia_Criminal.pdf"         = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2451125.pdf";
        "Sociologia_de_la_Desviacion.pdf" = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2451124.pdf";
        "Derecho_Procesal_Penal.pdf"      = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2451131.pdf";
        "Penologia.pdf"                   = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2451132.pdf";
        "Victimologia.pdf"                = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2451133.pdf";
        "Politica_Criminal.pdf"           = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2451134.pdf";
        "Criminalidad_Economica.pdf"      = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/24511A6.pdf";
    };
    "*biologia*"                 = @{
        "Bases_Quimicas.pdf"        = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2001118.pdf";
        "Biologia_Evolutiva.pdf"    = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2001116.pdf";
        "Botanica_Criptogamica.pdf" = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2001123.pdf";
        "Genetica_I.pdf"            = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2001124.pdf";
        "Zoologia.pdf"              = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2001125.pdf";
        "Ecologia_Poblaciones.pdf"  = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2001131.pdf";
        "Fisiologia_Animal_I.pdf"   = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2001132.pdf";
        "Microbiologia_I.pdf"       = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2001134.pdf";
    };
    "*biotecnologia*"            = @{
        "Fundamentos_Informatica.pdf" = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2511113.pdf";
        "Quimica_Organica.pdf"        = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2511116.pdf";
        "Biorreactores.pdf"           = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2511131.pdf";
        "Ingenieria_Genetica.pdf"     = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2511132.pdf";
        "Biotecnologia_Animal.pdf"    = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2511133.pdf";
        "Inmunologia.pdf"             = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2511143.pdf";
    };
    "*ambientales*"              = @{
        "Ecologia_Organismos.pdf"       = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2061121.pdf";
        "Ingenieria_Ambiental.pdf"      = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2061128.pdf";
        "Contaminacion_Atmosferica.pdf" = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2061131.pdf";
        "Impacto_Ambiental.pdf"         = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2061142.pdf";
    };
    "*historia*"                 = @{
        "Historia_Antigua_I.pdf"            = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2921112.pdf";
        "Historia_Medieval_I.pdf"           = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2921113.pdf";
        "Prehistoria_I.pdf"                 = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2921111.pdf";
        "Historia_Amerida_I.pdf"            = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2921127.pdf";
        "Historia_Moderna_Universal_I.pdf"  = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2921126.pdf";
        "Tendencias_Historiograficas_I.pdf" = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2921134.pdf";
        "Historia_de_las_Mujeres.pdf"       = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/29211I1.pdf";
    };
    "*economia*"                 = @{
        "Microeconomia_I.pdf"  = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2361121.pdf";
        "Macroeconomia_I.pdf"  = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2361125.pdf";
        "Economia_Mundial.pdf" = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2361123.pdf";
        "Econometria_I.pdf"    = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2361131.pdf";
    };
    "*educacion*social*"         = @{
        "Pedagogia_Social.pdf"           = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2311122.pdf";
        "Sociologia_de_la_Educacion.pdf" = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2311118.pdf";
        "Politicas_Sociales.pdf"         = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2311121.pdf";
    };
}

$all_folders = Get-ChildItem -Path $ugr_path -Directory

foreach ($pattern in $degree_map.Keys) {
    $matching_folders = $all_folders | Where-Object { $_.Name -like $pattern }
    if ($matching_folders) {
        foreach ($folder in $matching_folders) {
            $subjects = $degree_map[$pattern]
            Write-Host "Populating exhaustive list for: $($folder.Name)" -ForegroundColor Cyan
            foreach ($sub_name in $subjects.Keys) {
                $dest = Join-Path $folder.FullName $sub_name
                if (-not (Test-Path $dest)) {
                    Write-Host "  Downloading $sub_name..." -NoNewline
                    try {
                        Invoke-WebRequest -Uri $subjects[$sub_name] -OutFile $dest -ErrorAction Stop
                        Write-Host " OK" -ForegroundColor Green
                    }
                    catch {
                        Write-Host " FAILED ($($_.Exception.Message))" -ForegroundColor Red
                    }
                }
                else {
                    Write-Host "  $sub_name already exists, skipping." -ForegroundColor Gray
                }
            }
        }
    }
    else {
        Write-Host "Warning: No folder matches pattern $pattern" -ForegroundColor Yellow
    }
}
