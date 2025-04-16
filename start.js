const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Ensure client build exists
const clientDistPath = path.join(__dirname, 'client', 'dist');
if (!fs.existsSync(clientDistPath)) {
  console.log('Building client application...');
  execSync('cd client && npm run build', { stdio: 'inherit' });
  console.log('Client build complete.');
}

// Start the server
console.log('Starting server...');
execSync('cd server && npm start', { stdio: 'inherit' });