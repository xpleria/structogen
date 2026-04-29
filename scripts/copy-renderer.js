const fs = require('fs-extra');

fs.copySync('src/electron/renderer', 'dist/electron/renderer');
console.log('Renderer files copied.');