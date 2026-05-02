const { rcedit } = require('rcedit');
const fs = require('fs-extra');
const pkg = require('../package.json');

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function main() {
  if (process.platform !== 'win32') {
    console.log('Skipping Windows executable icon update on non-Windows host.');
    return;
  }

  const exePath = 'output/cli/structogen-cli-win.exe';
  const tempPath = 'output/cli/structogen-cli-win-icon-tmp.exe';
  const iconPath = 'assets/icons/structogen-win-rcedit.ico';

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

  for (let attempt = 1; attempt <= 6; attempt += 1) {
    try {
      await fs.remove(tempPath);
      await fs.copy(exePath, tempPath, { overwrite: true });
      await rcedit(tempPath, rceditOptions);
      await fs.move(tempPath, exePath, { overwrite: true });
      return;
    } catch (error) {
      lastError = error;
      await fs.remove(tempPath);

      if (attempt < 6) {
        await wait(attempt * 1000);
      }
    }
  }

  throw lastError;
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
