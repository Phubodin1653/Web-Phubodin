@echo off
cd /d "c:\Users\phubo\Documents\po-website.1\po-web.1"

echo === Removing old .git folder ===
rmdir /s /q .git 2>nul

echo === Initializing new git repository ===
git init

echo === Configuring git user ===
git config user.email "phubodin1653@gmail.com"
git config user.name "Phubodin1653"

echo === Adding all files ===
git add .

echo === Creating first commit ===
git commit -m "Fresh start: Initialize repository for Vercel deployment"

echo === Git repository is ready! ===
echo.
echo Next steps:
echo 1. Create new repository on GitHub (https://github.com/new)
echo 2. Name it: Web-Phubodin
echo 3. Copy the repository URL
echo 4. Run these commands:
echo.
echo    git remote add origin [YOUR_GITHUB_URL]
echo    git branch -M main
echo    git push -u origin main
echo.
pause
