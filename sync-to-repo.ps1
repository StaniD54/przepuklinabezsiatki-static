# sync-to-repo.ps1  (wersja 2026-09-26)
# Kopiuje eksport Simply Static do repo przepuklinabezsiatki-static i wysyla na GitHub -> Cloudflare Pages
# Uzycie: 1) WP-admin (http://bezsiatki626.test/wp-admin) -> Simply Static -> Generate
#         2) uruchom ten skrypt

$EXPORT = "C:\laragon\tmp\bezsiatki-static-export"   # tu Simply Static zapisuje eksport (Delivery: Local Directory)
$WP     = "C:\laragon\www\bezsiatki626"               # WordPress (zrodlo themes/uploads)
$REPO   = "C:\laragon\www\przepuklinabezsiatki-static"

$EXCLUDE_UPLOADS = @("simply-static", "iawp-geo-db.mmdb", "ai1wm-backups", "wp-cloudflare-super-page-cache", "wpmc-trash", "wpcf7_uploads")

Write-Host "=== Sync Simply Static -> repo ===" -ForegroundColor Cyan

# 0. Kontrola eksportu
$idx = Join-Path $EXPORT "index.html"
if (-not (Test-Path $idx)) {
    Write-Host "BRAK eksportu w $EXPORT - najpierw uruchom Simply Static -> Generate" -ForegroundColor Red
    Read-Host "Enter aby zamknac"; exit 1
}
$age = (Get-Date) - (Get-Item $idx).LastWriteTime
Write-Host ("Eksport z: {0}  ({1:N0} min temu)" -f (Get-Item $idx).LastWriteTime, $age.TotalMinutes)
if ($age.TotalHours -gt 12) { Write-Host "UWAGA: eksport jest starszy niz 12 godzin!" -ForegroundColor DarkYellow }
$old = Get-ChildItem $EXPORT -Recurse -Include *.html | Select-String -Pattern "513[ -]?711[ -]?268" -List
if ($old) { Write-Host "UWAGA: stary numer 513 711 268 w:" -ForegroundColor Red; $old | ForEach-Object { "  " + $_.Path } }

# 0b. Poprawki adresow w eksporcie: lokalne domeny -> https://przepuklinabezsiatki.pl, canonical/og:url bezwzgledne
Write-Host "`n[0/4] Poprawianie adresow w eksporcie..." -ForegroundColor Yellow
$utf8 = New-Object System.Text.UTF8Encoding($false)
$fixed = 0
Get-ChildItem $EXPORT -Recurse -File -Include *.html,*.xml,*.js,*.css,*.json,*.txt | ForEach-Object {
    $t = [IO.File]::ReadAllText($_.FullName, $utf8)
    $n = [regex]::Replace($t, 'https?:(\\?/)(\\?/)(?:bezsiatki626|siatka20062026)\.test', 'https:$1$2przepuklinabezsiatki.pl')
    $n = [regex]::Replace($n, '(<link rel="canonical" href="|<meta property="og:url" content=")/', '$1https://przepuklinabezsiatki.pl/')
    if ($n -ne $t) { [IO.File]::WriteAllText($_.FullName, $n, $utf8); $fixed++ }
}
Write-Host "  Poprawiono plikow: $fixed" -ForegroundColor Green

# 1. Themes z WordPressa
Write-Host "`n[1/4] Kopiowanie themes..." -ForegroundColor Yellow
$themeSrc = Join-Path $WP "wp-content\themes"; $themeDest = Join-Path $REPO "wp-content\themes"
if (Test-Path $themeDest) { Remove-Item -Recurse -Force $themeDest }
Copy-Item -Recurse -Force $themeSrc $themeDest

# 2. Uploads z WordPressa (z wykluczeniami, bez plikow > 24 MB - limit Cloudflare Pages 25 MB)
Write-Host "`n[2/4] Kopiowanie uploads..." -ForegroundColor Yellow
$uploadSrc = Join-Path $WP "wp-content\uploads"; $uploadDest = Join-Path $REPO "wp-content\uploads"
if (Test-Path $uploadDest) { Remove-Item -Recurse -Force $uploadDest }
$xd = $EXCLUDE_UPLOADS | ForEach-Object { Join-Path $uploadSrc $_ }
robocopy $uploadSrc $uploadDest /E /MAX:25165824 /XD $xd /XF iawp-geo-db.mmdb /NFL /NDL /NJH /NP | Out-Null
if ($LASTEXITCODE -ge 8) { Write-Host "  BLAD kopiowania uploads" -ForegroundColor Red; Read-Host; exit 1 }

# 3. Eksport Simply Static (HTML + uzyte pliki wp-content/wp-includes, w tym CSS pluginow)
Write-Host "`n[3/4] Kopiowanie eksportu Simply Static..." -ForegroundColor Yellow
robocopy $EXPORT $REPO /E /MAX:25165824 /XD (Join-Path $EXPORT ".git") /NFL /NDL /NJH /NP | Out-Null
if ($LASTEXITCODE -ge 8) { Write-Host "  BLAD kopiowania eksportu" -ForegroundColor Red; Read-Host; exit 1 }
$n = (Get-ChildItem $EXPORT -Recurse -Filter index.html).Count
Write-Host "  Skopiowano eksport ($n stron)" -ForegroundColor Green

# 4. Git: sprzatanie, commit, push
Write-Host "`n[4/4] Git..." -ForegroundColor Yellow
Set-Location $REPO
git rm -r -q --ignore-unmatch "simply-static-1-1780582164" "readme.html" | Out-Null
git add -A
git status --short | Select-Object -First 40
$cnt = (git status --short | Measure-Object).Count
Write-Host "Zmienionych plikow: $cnt"
Read-Host "Enter = commit i wyslanie na Cloudflare  (Ctrl+C = przerwij)"
if ($cnt -gt 0) {
    $date = Get-Date -Format "yyyy-MM-dd HH:mm"
    git commit -q -m "aktualizacja strony statycznej $date"
} else { Write-Host "Brak nowych zmian - wysylam ewentualne zalegle commity." -ForegroundColor Green }
git push origin main
if ($LASTEXITCODE -ne 0) { Write-Host "`nBLAD: wysylanie na GitHub nie powiodlo sie - skopiuj komunikat powyzej." -ForegroundColor Red; Read-Host "Enter aby zamknac"; exit 1 }

Write-Host "`n=== Gotowe - Cloudflare Pages zbuduje strone w ciagu 1-2 min ===" -ForegroundColor Cyan
Read-Host "Enter aby zamknac"
