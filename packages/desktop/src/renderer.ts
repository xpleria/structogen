// example: packages/desktop/src/renderer.ts
import { StructogenEngine } from "@xpleria/structogen-core";
import { IPCFileSystem } from "./ipc-file-system";

const fs = new IPCFileSystem();

const engine = new StructogenEngine({
  fileSystem: fs,
  baseDir: "/some/base/dir", // likely chosen via dialog:open
  // other options...
});

console.log('Structogen renderer loaded.');
