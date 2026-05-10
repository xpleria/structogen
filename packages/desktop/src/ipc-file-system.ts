import type { FileSystem } from "@xpleria/structogen-utils";

export class IPCFileSystem implements FileSystem {
  readFile(path: string): Promise<string> {
    return window.structogen.readFile(path);
  }

  writeFile(path: string, content: string): Promise<void> {
    return window.structogen.writeFile(path, content);
  }

  pathExists(path: string): Promise<boolean> {
    return window.structogen.pathExists(path);
  }

  readDir(path: string): Promise<string[]> {
    return window.structogen.readDir(path);
  }
}
