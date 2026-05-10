// scripts/copy-renderer.js
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs-extra';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const sourceDir = path.join(rootDir, 'packages/frontend/dist/electron/browser');
const targetDir = path.join(rootDir, 'packages/desktop/src/renderer');

async function main() {
  if (!fs.existsSync(sourceDir)) {
    console.error(`Angular build output not found: ${sourceDir}`);
    console.error('Run: pnpm --filter @xpleria/structogen-frontend build:electron');
    process.exit(1);
  }

  await fs.emptyDir(targetDir);
  await fs.copy(sourceDir, targetDir);
  console.log(`Renderer copied: ${sourceDir} → ${targetDir}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
