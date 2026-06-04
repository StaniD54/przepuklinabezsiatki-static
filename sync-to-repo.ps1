# sync-to-repo.ps1
# Kopiuje wyniki Simply Static do repo przepuklinabezsiatki-static
# Uruchom po każdym eksporcie Simply Static

$SOURCE = "C:\laragon\www\bezsiatki626"
$REPO   = "C:\laragon\www\przepuklinabezsiatki-static"

# Pliki i foldery do wykluczenia z uploads
$EXCLUDE_UPLOADS = @(
    "simply-static",
    "iawp-geo-db.mmdb",
    "ai1wm-backups",
    "wp-cloudflare-super-page-cache"
)

Write-Host "=== Sync Simply Static → repo ===" -ForegroundColor Cyan

# 1. Kopiuj pliki HTML z katalogu głównego statycznego eksportu
Write-Host "`n[1/3] Kopiowanie plików HTML..." -ForegroundColor Yellow
$htmlFiles = Get-ChildItem -Path $SOURCE -Filter "*.html" -Recurse |
    Where-Object { $_.FullName -notmatch "wp-content|wp-includes|wp-admin" }

foreach ($file in $htmlFiles) {
    $relative = $file.FullName.Substring($SOURCE.Length + 1)
    $dest = Join-Path $REPO $relative
    $destDir = Split-Path $dest -Parent
    if (-not (Test-Path $destDir)) { New-Item -ItemType Directory -Path $destDir -Force | Out-Null }
    Copy-Item -Path $file.FullName -Destination $dest -Force
}
Write-Host "  Skopiowano $($htmlFiles.Count) plików HTML" -ForegroundColor Green

# 2. Kopiuj wp-content/themes
Write-Host "`n[2/3] Kopiowanie themes..." -ForegroundColor Yellow
$themeSrc  = Join-Path $SOURCE "wp-content\themes"
$themeDest = Join-Path $REPO   "wp-content\themes"
if (Test-Path $themeSrc) {
    if (Test-Path $themeDest) { Remove-Item -Recurse -Force $themeDest }
    Copy-Item -Recurse -Force $themeSrc $themeDest
    Write-Host "  Themes skopiowane" -ForegroundColor Green
} else {
    Write-Host "  BRAK folderu themes w źródle!" -ForegroundColor Red
}

# 3. Kopiuj wp-content/uploads (z wykluczeniami)
Write-Host "`n[3/3] Kopiowanie uploads (bez wykluczonych)..." -ForegroundColor Yellow
$uploadSrc  = Join-Path $SOURCE "wp-content\uploads"
$uploadDest = Join-Path $REPO   "wp-content\uploads"
if (Test-Path $uploadSrc) {
    if (Test-Path $uploadDest) { Remove-Item -Recurse -Force $uploadDest }
    New-Item -ItemType Directory -Path $uploadDest -Force | Out-Null

    Get-ChildItem -Path $uploadSrc -Recurse |
        Where-Object {
            $item = $_
            $excluded = $false
            foreach ($ex in $EXCLUDE_UPLOADS) {
                if ($item.FullName -match [regex]::Escape($ex)) {
                    $excluded = $true
                    break
                }
            }
            # Wyklucz pliki > 24MB (limit Cloudflare Pages to 25MB)
            if (-not $item.PSIsContainer -and $item.Length -gt 24MB) {
                Write-Host "  POMINIĘTO (za duży): $($item.Name) ($([math]::Round($item.Length/1MB,1)) MB)" -ForegroundColor DarkYellow
                $excluded = $true
            }
            -not $excluded
        } |
        ForEach-Object {
            $relative = $_.FullName.Substring($uploadSrc.Length + 1)
            $dest = Join-Path $uploadDest $relative
            if ($_.PSIsContainer) {
                if (-not (Test-Path $dest)) { New-Item -ItemType Directory -Path $dest -Force | Out-Null }
            } else {
                $destDir = Split-Path $dest -Parent
                if (-not (Test-Path $destDir)) { New-Item -ItemType Directory -Path $destDir -Force | Out-Null }
                Copy-Item -Path $_.FullName -Destination $dest -Force
            }
        }
    Write-Host "  Uploads skopiowane" -ForegroundColor Green
} else {
    Write-Host "  BRAK folderu uploads w źródle!" -ForegroundColor Red
}

# 4. Git commit i push
Write-Host "`n[4/4] Git commit i push..." -ForegroundColor Yellow
Set-Location $REPO
git add -A
$date = Get-Date -Format "yyyy-MM-dd HH:mm"
git commit -m "aktualizacja strony statycznej $date"
git push origin main

Write-Host "`n=== Gotowe ===" -ForegroundColor Cyan