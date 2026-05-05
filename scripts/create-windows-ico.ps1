param(
  [string]$Source = "assets/icons/structogen-icon-transparent.png",
  [string]$Output = "assets/icons/structogen-win-rcedit.ico"
)

Add-Type -AssemblyName System.Drawing

function New-IconImageBytes {
  param(
    [System.Drawing.Image]$SourceImage,
    [int]$Size
  )

  $bitmap = New-Object System.Drawing.Bitmap $Size, $Size, ([System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
  $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
  $graphics.Clear([System.Drawing.Color]::Transparent)
  $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
  $graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality

  $scale = [Math]::Min($Size / $SourceImage.Width, $Size / $SourceImage.Height)
  $width = [int][Math]::Round($SourceImage.Width * $scale)
  $height = [int][Math]::Round($SourceImage.Height * $scale)
  $x = [int][Math]::Floor(($Size - $width) / 2)
  $y = [int][Math]::Floor(($Size - $height) / 2)

  $graphics.DrawImage($SourceImage, $x, $y, $width, $height)
  $graphics.Dispose()

  $stride = $Size * 4
  $xorBytes = New-Object byte[] ($stride * $Size)
  for ($row = 0; $row -lt $Size; $row++) {
    for ($col = 0; $col -lt $Size; $col++) {
      $pixel = $bitmap.GetPixel($col, ($Size - 1 - $row))
      $offset = ($row * $stride) + ($col * 4)
      $xorBytes[$offset] = $pixel.B
      $xorBytes[$offset + 1] = $pixel.G
      $xorBytes[$offset + 2] = $pixel.R
      $xorBytes[$offset + 3] = $pixel.A
    }
  }

  $maskStride = [int]([Math]::Ceiling($Size / 32) * 4)
  $maskBytes = New-Object byte[] ($maskStride * $Size)
  $stream = New-Object System.IO.MemoryStream
  $writer = New-Object System.IO.BinaryWriter $stream

  $writer.Write([UInt32]40)
  $writer.Write([Int32]$Size)
  $writer.Write([Int32]($Size * 2))
  $writer.Write([UInt16]1)
  $writer.Write([UInt16]32)
  $writer.Write([UInt32]0)
  $writer.Write([UInt32]($xorBytes.Length + $maskBytes.Length))
  $writer.Write([Int32]0)
  $writer.Write([Int32]0)
  $writer.Write([UInt32]0)
  $writer.Write([UInt32]0)
  $writer.Write($xorBytes)
  $writer.Write($maskBytes)
  $writer.Flush()

  $bytes = $stream.ToArray()
  $writer.Dispose()
  $stream.Dispose()
  $bitmap.Dispose()

  return ,$bytes
}

$sourceImage = [System.Drawing.Image]::FromFile((Resolve-Path $Source))
$sizes = @(256, 128, 64, 48, 32, 16)
$images = @()

foreach ($size in $sizes) {
  $images += ,(New-IconImageBytes -SourceImage $sourceImage -Size $size)
}

$sourceImage.Dispose()

$outputPath = [System.IO.Path]::GetFullPath($Output)
[System.IO.Directory]::CreateDirectory([System.IO.Path]::GetDirectoryName($outputPath)) | Out-Null

$stream = New-Object System.IO.FileStream $outputPath, ([System.IO.FileMode]::Create), ([System.IO.FileAccess]::Write)
$writer = New-Object System.IO.BinaryWriter $stream
$writer.Write([UInt16]0)
$writer.Write([UInt16]1)
$writer.Write([UInt16]$images.Count)

$offset = 6 + ($images.Count * 16)
for ($index = 0; $index -lt $images.Count; $index++) {
  $size = $sizes[$index]
  $imageBytes = $images[$index]
  $directorySize = $size
  if ($size -eq 256) {
    $directorySize = 0
  }

  $writer.Write([byte]$directorySize)
  $writer.Write([byte]$directorySize)
  $writer.Write([byte]0)
  $writer.Write([byte]0)
  $writer.Write([UInt16]1)
  $writer.Write([UInt16]32)
  $writer.Write([UInt32]$imageBytes.Length)
  $writer.Write([UInt32]$offset)
  $offset += $imageBytes.Length
}

foreach ($imageBytes in $images) {
  $writer.Write([byte[]]$imageBytes)
}

$writer.Dispose()
$stream.Dispose()
