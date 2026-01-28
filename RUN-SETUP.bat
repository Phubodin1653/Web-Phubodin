@echo off
REM Run the complete setup script
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0setup-complete.ps1"
pause
