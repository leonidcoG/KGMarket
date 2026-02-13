@echo off
cd /d "%~dp0"
echo Starting KGMarket via Ngrok Tunnel...
echo NOTE: If asked to install @expo/ngrok, press 'y' and Enter.
npx expo start --tunnel --clear
pause
