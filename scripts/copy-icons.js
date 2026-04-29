const fs = require('fs-extra');

async function copyIcons() {
  await fs.ensureDir('build/icons');
  await fs.copy('assets/icons', 'build/icons');
  console.log('Icons copied to build/icons');
}

copyIcons();