import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import fs from 'fs-extra';
import path from 'path';

const require = createRequire(import.meta.url);
const { rcedit } = require('rcedit');

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const pkgPath = path.join(rootDir, 'package.json');
const pkg = JSON.parse(await fs.readFile(pkgPath, 'utf8'));

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function main() {
  if (process.platform !== 'win32') {
    console.log('Skipping Windows executable icon update on non-Windows host.');
    return;
  }

  const exePath = path.join(rootDir, 'packages/cli/output/cli/structogen-cli-win.exe');
  const tempPath = path.join(rootDir, 'packages/cli/output/cli/structogen-cli-win-icon-tmp.exe');
  const iconPath = path.join(rootDir, 'assets/icons/structogen-win-rcedit.ico');

  const rceditOptions = {
    icon: iconPath,
    'file-version': pkg.version,
    'product-version': pkg.version,
    'version-string': {
      CompanyName: pkg.author || '',
      FileDescription: 'Structogen CLI',
      ProductName: 'Structogen CLI',
      ProductVersion: pkg.version,
      FileVersion: pkg.version,
      OriginalFilename: 'structogen-cli-win.exe',
      InternalName: 'structogen-cli',
    },
  };

  let lastError;

  for (let attempt = 1; attempt <= 6; attempt++) {
    try {
      await fs.remove(tempPath);
      await fs.copy(exePath, tempPath, { overwrite: true });
      await rcedit(tempPath, rceditOptions);
      await fs.move(tempPath, exePath, { overwrite: true });
      return;
    } catch (error) {
      lastError = error;
      await fs.remove(tempPath);
      if (attempt < 6) await wait(attempt * 1000);
    }
  }

  throw lastError;
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
