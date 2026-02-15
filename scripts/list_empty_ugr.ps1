$baseDir = "D:\AA-1\algorithm-alchemy-studio\public\content\official_docs\ugr"
Get-ChildItem -Path $baseDir -Directory | ForEach-Object {
    $count = (Get-ChildItem -Path $_.FullName -File).Count
    [PSCustomObject]@{
        Name      = $_.Name
        FileCount = $count
    }
} | Sort-Object FileCount | Export-Csv -Path "D:\AA-1\algorithm-alchemy-studio\scripts\ugr_file_counts.csv" -NoTypeInformation
Write-Host "File counts exported to scripts\ugr_file_counts.csv"
