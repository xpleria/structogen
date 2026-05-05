const fs = require('fs-extra');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');

async function copyIcons() {
  const sourceDir = path.join(rootDir, 'assets/icons');
  const targetDir = path.join(rootDir, 'build/icons');

  await fs.ensureDir(targetDir);
  await fs.copy(sourceDir, targetDir);
  console.log('Icons copied to build/icons');
}

copyIcons();
