# Navigate to the source directory and run npm start in the background
Start-Process -NoNewWindow -FilePath "powershell" -ArgumentList "cd source; npm start"

# Navigate to the demo directory and run npm run dev
cd demo
npm run dev