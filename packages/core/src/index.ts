export * from "./engine/schema-parser.js";
export * from "./engine/template-engine.js";
export * from "./engine/file-writer.js";
export * from "./plugin-system/plugin-interface.js";
export * from "./plugin-system/plugin-loader.js";
export * from "./plugin-system/plugin-discovery.js";
export * from "./types.js";

// packages/core/src/index.ts
import type { FileSystem } from "@xpleria/structogen-utils";
import { FileWriter } from "./engine/file-writer.js";

export interface StructogenEngineOptions {
  fileSystem: FileSystem;
  baseDir: string;
  // other options...
}

export class StructogenEngine {
  private readonly fileWriter: FileWriter;

  constructor(options: StructogenEngineOptions) {
    this.fileWriter = new FileWriter({
      fileSystem: options.fileSystem,
      baseDir: options.baseDir,
    });
  }

  // use this.fileWriter inside your generation workflow
}
