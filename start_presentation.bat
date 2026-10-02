@echo off
color 0B
echo ===================================================
echo      Starting CampusConnect for Presentation
echo ===================================================
echo.

echo [1/2] Starting Backend API Server (Port 5000)...
start "CampusConnect Backend" cmd /k "cd backend && node index.js"

echo [2/2] Starting Frontend React App (Port 3000)...
start "CampusConnect Frontend" cmd /k "cd frontend && npm run dev -- --port 3000 --host --open"

echo.
echo Success! The servers are running.
echo Your browser will open automatically in a few seconds.
echo (Keep the two new black terminal windows open during your presentation!)
echo.
pause
