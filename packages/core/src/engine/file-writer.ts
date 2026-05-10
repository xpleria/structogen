import path from 'path';

import type { FileSystem } from "@xpleria/structogen-utils";

export interface FileWriterOptions {
  fileSystem: FileSystem;
  baseDir: string;
}

export class FileWriter {
  private readonly fs: FileSystem;
  private readonly baseDir: string;

  constructor(options: FileWriterOptions) {
    this.fs = options.fileSystem;
    this.baseDir = options.baseDir;
  }

  async writeFile(relativePath: string, content: string): Promise<void> {
    const fullPath = path.join(this.baseDir, relativePath);
    await this.fs.writeFile(fullPath, content);
  }

  async pathExists(relativePath: string): Promise<boolean> {
    const fullPath = path.join(this.baseDir, relativePath);
    return this.fs.pathExists(fullPath);
  }

  async readDir(relativePath: string): Promise<string[]> {
    const fullPath = path.join(this.baseDir, relativePath);
    return this.fs.readDir(fullPath);
  }
}
