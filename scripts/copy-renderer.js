const fs = require('fs-extra');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const sourceDir = path.join(rootDir, 'packages/desktop/src/electron/renderer');
const targetDir = path.join(rootDir, 'packages/desktop/dist/electron/renderer');

try {
  fs.copySync(sourceDir, targetDir);
  console.log('Renderer files copied.');
} catch (err) {
  console.error('Failed to copy renderer files:', err.message);
  process.exit(1);
}
