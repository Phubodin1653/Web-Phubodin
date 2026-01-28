@echo off
REM Initialize git repository
echo Initializing git repository...
git init
git add .
git commit -m "Initial commit - Vercel deployment setup"

echo.
echo ============================================================
echo ระบบจะขอให้คุณ:
echo 1. สร้าง repository ใหม่บน GitHub (ชื่อ "Web-Phubodin" หรืออื่น)
echo 2. รอให้มันเสร็จ แล้ว copy repo URL
echo 3. ดำเนินการคำสั่งต่อไปนี้:
echo.
echo    git remote add origin [URL_FROM_GITHUB]
echo    git branch -M main
echo    git push -u origin main
echo.
echo ============================================================
pause
