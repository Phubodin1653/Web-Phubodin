@echo off
setlocal enabledelayedexpansion

cd /d "c:\Users\phubo\Documents\po-website.1\po-web.1"

echo.
echo ================================================
echo  Pushing to Web-Phubodin Repository
echo ================================================
echo.

echo [1/6] Removing old .git folder...
rmdir /s /q .git 2>nul
if exist .git (
    echo ERROR: Could not remove .git folder
    pause
    exit /b 1
)
echo SUCCESS: .git removed

echo.
echo [2/6] Initializing git...
git init
if errorlevel 1 goto error

echo.
echo [3/6] Configuring git user...
git config user.email "phubodin1653@gmail.com"
git config user.name "Phubodin1653"

echo.
echo [4/6] Adding all files...
git add .
if errorlevel 1 goto error

echo.
echo [5/6] Creating initial commit...
git commit -m "Initial commit: Web-Phubodin portfolio with timeout adjustments"
if errorlevel 1 goto error

echo.
echo [6/6] Adding remote and pushing to GitHub...
git remote add origin https://github.com/Phubodin1653/Web-Phubodin.git
git branch -M main
git push -u origin main

if errorlevel 1 goto error

echo.
echo ================================================
echo  SUCCESS! Code pushed to GitHub!
echo ================================================
echo.
echo Repository: https://github.com/Phubodin1653/Web-Phubodin
echo.
echo Next: Set up Vercel deployment at https://vercel.com/dashboard
echo.
pause
exit /b 0

:error
echo.
echo ERROR: Something went wrong!
echo.
pause
exit /b 1
