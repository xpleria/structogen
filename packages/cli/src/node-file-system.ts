import fs from 'fs/promises';
import path from 'path';

import type { FileSystem } from "@xpleria/structogen-utils";

export class NodeFileSystem implements FileSystem {
  readFile(p: string): Promise<string> {
    return fs.readFile(p, "utf8");
  }

  async writeFile(p: string, content: string): Promise<void> {
    await fs.mkdir(path.dirname(p), { recursive: true });
    await fs.writeFile(p, content, "utf8");
  }

  async pathExists(p: string): Promise<boolean> {
    try {
      await fs.access(p);
      return true;
    } catch {
      return false;
    }
  }

  readDir(p: string): Promise<string[]> {
    return fs.readdir(p);
  }
}
