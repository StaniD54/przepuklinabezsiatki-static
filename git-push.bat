@echo off
cd /d C:\laragon\www\przepuklinabezsiatki-static
echo Usuwam index.lock...
del /f /q ".git\index.lock"
echo Status del: %errorlevel%
echo.
echo Git add...
git add -A
echo.
echo Git commit...
git commit -m "aktualizacja strony statycznej 2026-06-15"
echo.
echo Git push...
git push origin main
echo.
echo === GOTOWE ===
pause
