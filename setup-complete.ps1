#!/usr/bin/env powershell

# Full GitHub & Vercel Setup Script for Web-Phubodin

$ProjectPath = "C:\Users\phubo\Documents\po-website.1\po-web.1"
$GitHubUsername = "Phubodin1653"
$RepoName = "Web-Phubodin"
$GitEmail = "phubodin1653@gmail.com"
$GitName = "Phubodin1653"

Write-Host "=================================================" -ForegroundColor Green
Write-Host "  Web-Phubodin: Complete Setup Script" -ForegroundColor Green
Write-Host "=================================================" -ForegroundColor Green
Write-Host ""

# Step 1: Navigate to project directory
Set-Location $ProjectPath
Write-Host "[1/5] Navigating to project directory..." -ForegroundColor Cyan
Write-Host "Location: $ProjectPath" -ForegroundColor Yellow

# Step 2: Remove old .git folder
Write-Host ""
Write-Host "[2/5] Removing old .git folder..." -ForegroundColor Cyan
if (Test-Path .git) {
    Remove-Item -Recurse -Force .git
    Write-Host "✓ Old .git folder removed" -ForegroundColor Green
} else {
    Write-Host "ℹ No old .git folder found" -ForegroundColor Yellow
}

# Step 3: Initialize git repository
Write-Host ""
Write-Host "[3/5] Initializing git repository..." -ForegroundColor Cyan
git init
git config user.email $GitEmail
git config user.name $GitName
git add .
git commit -m "Fresh start: Initialize repository for Vercel deployment"
Write-Host "✓ Git repository initialized" -ForegroundColor Green

# Step 4: Create GitHub instructions
Write-Host ""
Write-Host "=================================================" -ForegroundColor Cyan
Write-Host "[4/5] GitHub Repository Setup" -ForegroundColor Cyan
Write-Host "=================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "IMPORTANT: Create a new repository on GitHub first!" -ForegroundColor Yellow
Write-Host ""
Write-Host "Steps:" -ForegroundColor White
Write-Host "1. Go to: https://github.com/new" -ForegroundColor White
Write-Host "2. Repository name: $RepoName" -ForegroundColor White
Write-Host "3. Set as PUBLIC" -ForegroundColor White
Write-Host "4. Do NOT add README, .gitignore, or license" -ForegroundColor White
Write-Host "5. Click 'Create repository'" -ForegroundColor White
Write-Host ""
Write-Host "Then copy the repository URL and paste it below." -ForegroundColor Yellow
Write-Host ""

$GitHubURL = Read-Host "Enter your GitHub repository URL (e.g., https://github.com/Phubodin1653/Web-Phubodin.git)"

if ([string]::IsNullOrWhiteSpace($GitHubURL)) {
    Write-Host "ERROR: No URL provided!" -ForegroundColor Red
    exit 1
}

# Step 5: Push to GitHub
Write-Host ""
Write-Host "[5/5] Pushing code to GitHub..." -ForegroundColor Cyan
Write-Host "URL: $GitHubURL" -ForegroundColor Yellow

git remote add origin $GitHubURL
git branch -M main
git push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "✓ Code pushed to GitHub successfully!" -ForegroundColor Green
} else {
    Write-Host ""
    Write-Host "ERROR: Failed to push to GitHub" -ForegroundColor Red
    Write-Host "Make sure the repository URL is correct and you have push access." -ForegroundColor Yellow
    exit 1
}

# Vercel Setup Instructions
Write-Host ""
Write-Host "=================================================" -ForegroundColor Green
Write-Host "  VERCEL DEPLOYMENT SETUP" -ForegroundColor Green
Write-Host "=================================================" -ForegroundColor Green
Write-Host ""
Write-Host "Now set up Vercel for automatic deployment:" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. Go to: https://vercel.com/dashboard" -ForegroundColor White
Write-Host "2. Click: 'Add New...' → 'Project'" -ForegroundColor White
Write-Host "3. Connect GitHub and search for '$RepoName'" -ForegroundColor White
Write-Host "4. Click: 'Import'" -ForegroundColor White
Write-Host ""
Write-Host "Configure these settings:" -ForegroundColor Yellow
Write-Host "  • Framework: Vite" -ForegroundColor White
Write-Host "  • Build Command: pnpm install && pnpm run build" -ForegroundColor White
Write-Host "  • Install Command: pnpm install --frozen-lockfile" -ForegroundColor White
Write-Host "  • Output Directory: dist" -ForegroundColor White
Write-Host ""
Write-Host "5. Click: 'Deploy'" -ForegroundColor White
Write-Host ""
Write-Host "That's it! Your website will auto-deploy on every GitHub push." -ForegroundColor Green
Write-Host ""

# Test pnpm dev
Write-Host "=================================================" -ForegroundColor Green
Write-Host "  TEST LOCAL DEVELOPMENT" -ForegroundColor Green
Write-Host "=================================================" -ForegroundColor Green
Write-Host ""
Write-Host "To test locally, run:" -ForegroundColor Cyan
Write-Host ""
Write-Host "  pnpm dev" -ForegroundColor Yellow
Write-Host ""
Write-Host "Your site will be available at: http://localhost:5173" -ForegroundColor Green
Write-Host ""

Write-Host "=================================================" -ForegroundColor Green
Write-Host "  ✓ SETUP COMPLETE!" -ForegroundColor Green
Write-Host "=================================================" -ForegroundColor Green
Write-Host ""
Write-Host "GitHub Repo: https://github.com/$GitHubUsername/$RepoName" -ForegroundColor Cyan
Write-Host "Status: Ready for Vercel deployment" -ForegroundColor Cyan
Write-Host ""

pause
