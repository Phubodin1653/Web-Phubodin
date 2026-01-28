@echo off
cls
cd /d "c:\Users\phubo\Documents\po-website.1\po-web.1"

REM Delete old git
rmdir /s /q .git 2>nul

REM Initialize fresh git
git init
git config user.email "phubodin1653@gmail.com"
git config user.name "Phubodin1653"

REM Add and commit
git add .
git commit -m "Initial: Web-Phubodin portfolio"

REM Remove old remote and add new one
git remote remove origin 2>nul
git remote add origin https://github.com/Phubodin1653/Web-Phubodin.git

REM Push
git branch -M main
git push -u origin main

if errorlevel 0 (
    echo.
    echo ===== SUCCESS =====
    echo Files uploaded to GitHub!
    echo https://github.com/Phubodin1653/Web-Phubodin
) else (
    echo ERROR occurred
)

pause
