// packages/utils/src/file-system.ts
export interface FileSystem {
  readFile(path: string): Promise<string>;
  writeFile(path: string, content: string): Promise<void>;
  pathExists(path: string): Promise<boolean>;
  readDir(path: string): Promise<string[]>;
}
