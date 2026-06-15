Set-Location "C:\laragon\www\przepuklinabezsiatki-static"

Write-Host "Usuwam index.lock..." -ForegroundColor Yellow
$lock = ".git\index.lock"
if (Test-Path $lock) {
    try {
        [System.IO.File]::Delete((Resolve-Path $lock).Path)
        Write-Host "  Usunieto przez .NET" -ForegroundColor Green
    } catch {
        Remove-Item -Force $lock -ErrorAction SilentlyContinue
        Write-Host "  Usunieto przez Remove-Item" -ForegroundColor Green
    }
} else {
    Write-Host "  Brak pliku lock" -ForegroundColor Green
}

Write-Host "`nGit add..." -ForegroundColor Yellow
git add -A

Write-Host "`nGit commit..." -ForegroundColor Yellow
git commit -m "aktualizacja strony statycznej 2026-06-15"

Write-Host "`nGit push..." -ForegroundColor Yellow
git push origin main

Write-Host "`n=== GOTOWE ===" -ForegroundColor Cyan
Read-Host "Nacisnij Enter aby zamknac"
