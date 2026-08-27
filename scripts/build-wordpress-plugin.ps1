param(
    [string] $Source = (Join-Path $PSScriptRoot '..'),
    [string] $Destination = ''
)

$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.IO.Compression
Add-Type -AssemblyName System.IO.Compression.FileSystem

$sourcePath = (Resolve-Path -LiteralPath $Source).Path
$pluginHeader = Get-Content -LiteralPath (Join-Path $sourcePath 'npati-hub.php') -Raw
$versionMatch = [regex]::Match($pluginHeader, '(?m)^\s*\*\s*Version:\s*([0-9]+\.[0-9]+\.[0-9]+)\s*$')
if (-not $versionMatch.Success) {
    throw 'Unable to read the plugin version from npati-hub.php.'
}

$version = $versionMatch.Groups[1].Value
$archiveRoot = 'npati-content-automation'
if ([string]::IsNullOrWhiteSpace($Destination)) {
    $Destination = Join-Path $sourcePath "dist\npati-content-automation-$version.zip"
}

$destinationPath = [System.IO.Path]::GetFullPath($Destination)
$destinationDirectory = Split-Path -Parent $destinationPath
$releaseFiles = @('npati-hub.php', 'readme.txt', 'uninstall.php', 'LICENSE')
$releaseDirectories = @('assets', 'includes', 'languages')

if (-not (Test-Path -LiteralPath $destinationDirectory)) {
    New-Item -ItemType Directory -Path $destinationDirectory | Out-Null
}
if (Test-Path -LiteralPath $destinationPath) {
    Remove-Item -LiteralPath $destinationPath -Force
}

$stream = [System.IO.File]::Open($destinationPath, [System.IO.FileMode]::CreateNew)
$archive = [System.IO.Compression.ZipArchive]::new($stream, [System.IO.Compression.ZipArchiveMode]::Create)
try {
    Get-ChildItem -LiteralPath $sourcePath -Recurse -File | ForEach-Object {
        $relativePath = $_.FullName.Substring($sourcePath.Length).TrimStart('\', '/')
        $portablePath = $relativePath.Replace('\', '/')
        $topLevel = $portablePath.Split('/')[0]
        if ($releaseFiles -notcontains $portablePath -and $releaseDirectories -notcontains $topLevel) {
            return
        }

        $entryName = "$archiveRoot/$portablePath"
        [System.IO.Compression.ZipFileExtensions]::CreateEntryFromFile(
            $archive,
            $_.FullName,
            $entryName,
            [System.IO.Compression.CompressionLevel]::Optimal
        ) | Out-Null
    }
}
finally {
    $archive.Dispose()
    $stream.Dispose()
}

$requiredEntries = @(
    "$archiveRoot/npati-hub.php",
    "$archiveRoot/readme.txt",
    "$archiveRoot/uninstall.php",
    "$archiveRoot/LICENSE",
    "$archiveRoot/includes/Core/Activator.php",
    "$archiveRoot/includes/Core/Plugin.php",
    "$archiveRoot/includes/Admin/Admin.php",
    "$archiveRoot/includes/Api/RestController.php",
    "$archiveRoot/includes/Content/AiProviderInterface.php",
    "$archiveRoot/includes/Content/OpenAiProvider.php",
    "$archiveRoot/includes/Content/ContentService.php",
    "$archiveRoot/includes/Content/TaskImporter.php",
    "$archiveRoot/assets/js/admin.js",
    "$archiveRoot/assets/samples/npati-content-tasks-sample.csv"
)

$check = [System.IO.Compression.ZipFile]::OpenRead($destinationPath)
try {
    $entryNames = @($check.Entries | ForEach-Object FullName)
    foreach ($requiredEntry in $requiredEntries) {
        if ($entryNames -notcontains $requiredEntry) {
            throw "Required plugin entry is missing: $requiredEntry"
        }
    }
    if ($entryNames | Where-Object { $_ -match '\\' }) {
        throw 'ZIP contains Windows path separators and is not Linux-safe.'
    }
    if ($entryNames | Where-Object { $_ -notlike "$archiveRoot/*" }) {
        throw "ZIP contains an entry outside the required $archiveRoot wrapper directory."
    }
    if ($entryNames | Where-Object { $_ -match '/(?:docs|tests|vendor|node_modules)/' -or $_ -match '/(?:composer|package)(?:-lock)?\.json$' -or $_ -match '/phpcs\.xml\.dist$' }) {
        throw 'ZIP contains development-only files.'
    }
}
finally {
    $check.Dispose()
}

Get-Item -LiteralPath $destinationPath
