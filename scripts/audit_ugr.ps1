$basePath = "D:\AA-1\algorithm-alchemy-studio\public\content\official_docs\ugr"
$directories = Get-ChildItem $basePath -Directory
foreach ($dir in $directories) {
    $count = (Get-ChildItem $dir.FullName -File).Count
    Write-Host "$($dir.Name): $count"
}
