$basePath = "D:\AA-1\algorithm-alchemy-studio\public\content\official_docs\ugr\Informacion y Documentacion"
if (-not (Test-Path $basePath)) {
    New-Item -ItemType Directory -Force -Path $basePath
}

$subjects = @{
    "Fundamentos_de_Informatica" = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2311115.pdf"
    "Historia_Escritura_Documentos" = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2311113.pdf"
    "Ingles" = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2311127.pdf"
    "Introduccion_Info_Doc" = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2311114.pdf"
    "Medios_Comunicacion" = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2311111.pdf"
    "Analisis_de_Contenido" = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/231111A.pdf"
    "Documentacion_Medios_Comunicacion" = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2311116.pdf"
    "Informacion_y_Referencia" = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2311119.pdf"
    "Marco_Juridico_Info_Doc" = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2311112.pdf"
    "Organizacion_Unidades_Info" = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2311118.pdf"
    "Administracion_de_Empresas" = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2311121.pdf"
    "Catalogacion_Descriptiva" = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2311123.pdf"
    "Estadistica" = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2311126.pdf"
    "Sistemas_Org_Conocimiento_I" = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2311124.pdf"
    "Tratamiento_Fondos_Archivo" = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2311125.pdf"
    "Bases_de_Datos" = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2311117.pdf"
    "Gestion_de_Documentos" = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2311132.pdf"
    "Normalizacion_Informacion" = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/231112A.pdf"
    "Sistemas_Org_Conocimiento_II" = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2311129.pdf"
    "Bibliometria" = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2311135.pdf"
    "Recursos_de_Informacion" = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2311131.pdf"
    "Sistemas_Automatizados" = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2311134.pdf"
    "Sistemas_Informaticos" = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2311133.pdf"
    "Archivos_Electronicos" = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2311137.pdf"
    "Diseno_Sistemas_Doc_Empresas" = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/23111MS.pdf"
    "Documentacion_Digital" = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2311138.pdf"
    "Formacion_Usuarios" = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/23111M8.pdf"
    "Fundamentos_Programacion" = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/23111M5.pdf"
    "Patrimonio_Bibliografico" = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/23111B4.pdf"
    "Sistemas_Metadatos" = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/23111MD.pdf"
    "Representacion_Procesamiento_Info" = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2311136.pdf"
    "Tecnicas_Historiograficas" = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/23111B5.pdf"
    "Analisis_Evaluacion_Sistemas" = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/23111M7.pdf"
    "Analitica_Marketing_Web" = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/23111MC.pdf"
    "Evaluacion_Uso_Acceso_Info" = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/23111M2.pdf"
    "Ingles_para_Doc" = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/23111B2.pdf"
    "Metodologia_Investigacion_Info" = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2311143.pdf"
    "Tecnicas_Recuperacion_Info" = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2311141.pdf"
    "Tecnologias_Web" = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/2311142.pdf"
    "Vigilancia_Tecnologica" = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/23111M9.pdf"
    "Aplicaciones_Sistemas_Doc" = "https://grados.ugr.es/sites/grados/default/public/guias-firmadas/2024-2025/23111MB.pdf"
}

foreach ($name in $subjects.Keys) {
    $dest = Join-Path $basePath ($name + ".pdf")
    if (-not (Test-Path $dest)) {
        Write-Host "Downloading $name..."
        try {
            Invoke-WebRequest -Uri $subjects[$name] -OutFile $dest -ErrorAction Stop
        } catch {
            Write-Warning "Failed to download $name from $($subjects[$name])"
        }
    } else {
        Write-Host "$name already exists."
    }
}
