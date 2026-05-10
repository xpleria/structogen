param(
  [string]$SourcePath,
  [string]$OutputPath,
  [switch]$IncludeHidden,
  [switch]$ShowSize,
  [int]$Depth = 0   # 0 = unlimited
)

[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

# Default to current directory if no source path is provided
if (-not $SourcePath) {
  $SourcePath = (Get-Location).Path
}

# Default output file to tree.txt in the same directory
if (-not $OutputPath) {
  $OutputPath = Join-Path $SourcePath "tree.txt"
}

# Normalize paths
$SourcePath = (Resolve-Path $SourcePath).Path

# Load .gitignore rules if present
$GitIgnorePath = Join-Path $SourcePath ".gitignore"
$GitIgnoreRules = @()

if (Test-Path $GitIgnorePath) {
  $GitIgnoreRules = Get-Content $GitIgnorePath | Where-Object {
    $_ -and -not $_.StartsWith("#")
  }
}

function Convert-GitIgnoreToRegex {
  param([string]$Rule)

  $Rule = $Rule.Trim()

  # Ignore comments / blanks
  if (-not $Rule -or $Rule.StartsWith("#")) {
    return $null
  }

  # Normalize slashes
  $Rule = $Rule.Replace("\", "/")

  $isDirectory = $Rule.EndsWith("/")
  $isAnchored = $Rule.StartsWith("/")

  # Remove leading/trailing slash markers
  if ($isDirectory) {
    $Rule = $Rule.TrimEnd("/")
  }

  if ($isAnchored) {
    $Rule = $Rule.TrimStart("/")
  }

  # Escape regex chars
  $Rule = [Regex]::Escape($Rule)

  # Gitignore wildcards
  $Rule = $Rule.Replace("\*\*", ".*")
  $Rule = $Rule.Replace("\*", "[^/]*")
  $Rule = $Rule.Replace("\?", ".")

  if ($isAnchored) {
    if ($isDirectory) {
      return "^$Rule(/.*)?$"
    }
    else {
      return "^$Rule$"
    }
  }
  else {
    if ($isDirectory) {
      return "(^|/)$Rule(/.*)?$"
    }
    else {
      return "(^|/)$Rule$"
    }
  }
}

# Build regex list
$GitIgnoreRegex = @()

foreach ($rule in $GitIgnoreRules) {
  $regex = Convert-GitIgnoreToRegex $rule

  if ($regex) {
    $GitIgnoreRegex += $regex
  }
}

function Test-GitIgnored {
  param([string]$RelativePath)

  $RelativePath = $RelativePath.Replace("\", "/")

  foreach ($regex in $GitIgnoreRegex) {
    if ($RelativePath -match $regex) {
      return $true
    }
  }

  return $false
}

function Format-Size {
  param([long]$Bytes)

  if ($Bytes -ge 1GB) { return "{0:N2} GB" -f ($Bytes / 1GB) }
  if ($Bytes -ge 1MB) { return "{0:N2} MB" -f ($Bytes / 1MB) }
  if ($Bytes -ge 1KB) { return "{0:N2} KB" -f ($Bytes / 1KB) }
  return "$Bytes B"
}

function Write-Tree {
  param(
    [string]$Path,
    [string]$Prefix = "",
    [int]$CurrentDepth = 1
  )

  if ($Depth -gt 0 -and $CurrentDepth -gt $Depth) {
    return
  }

  $items = Get-ChildItem -LiteralPath $Path -Force:$IncludeHidden |
  Sort-Object @{ Expression = { -not $_.PSIsContainer } }, Name

  if (-not $IncludeHidden) {
    $items = $items | Where-Object { -not $_.Attributes.ToString().Contains("Hidden") }
  }

  $items = $items | Where-Object {
    $relative = $_.FullName.Substring($SourcePath.Length).TrimStart("\", "/")
    -not (Test-GitIgnored $relative)
  }

  foreach ($item in $items) {

    $isLast = ($item -eq $items[-1])
    $connector = if ($isLast) { "└── " } else { "├── " }

    $displayName = $item.Name

    if ($item.PSIsContainer) {
      $displayName += "/"
    }

    if ($ShowSize -and -not $item.PSIsContainer) {
      $size = Format-Size $item.Length
      $displayName += " ($size)"
    }

    # Color output
    if ($item.PSIsContainer) {
      Write-Host "$Prefix$connector$displayName" -ForegroundColor Cyan
    }
    else {
      Write-Host "$Prefix$connector$displayName" -ForegroundColor Gray
    }

    Add-Content -Path $OutputPath -Value "$Prefix$connector$displayName" -Encoding UTF8

    if ($item.PSIsContainer) {
      $newPrefix = if ($isLast) { "$Prefix    " } else { "$Prefix│   " }
      Write-Tree -Path $item.FullName -Prefix $newPrefix -CurrentDepth ($CurrentDepth + 1)
    }
  }
}

"" | Set-Content -Path $OutputPath -Encoding UTF8

Write-Host $SourcePath -ForegroundColor White
Add-Content -Path $OutputPath -Value $SourcePath -Encoding UTF8

Write-Tree -Path $SourcePath

Write-Host "Tree written to $OutputPath" -ForegroundColor Green
