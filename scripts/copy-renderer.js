const fs = require('fs-extra');

try {
  fs.copySync('src/electron/renderer', 'dist/electron/renderer');
  console.log('Renderer files copied.');
} catch (err) {
  console.error('Failed to copy renderer files:', err.message);
  process.exit(1);
}