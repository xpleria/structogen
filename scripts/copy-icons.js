// scripts/copy-icons.js
import { fileURLToPath } from "url";
import path from "path";
import fs from "fs-extra";

// ESM-safe __filename and __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rootDir = path.resolve(__dirname, "..");

async function copyIcons() {
  const sourceDir = path.join(rootDir, "assets/icons");
  const targetDir = path.join(rootDir, "build/icons");

  await fs.ensureDir(targetDir);
  await fs.copy(sourceDir, targetDir);

  console.log("Icons copied to build/icons");
}

copyIcons();
