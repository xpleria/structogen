// packages/core/src/engine/structogen-engine.ts
import { FileWriter } from "./file-writer.js";
import { StructogenEngineOptions } from "./structogen-engine-options.js";

export class StructogenEngine {
  private readonly fileWriter: FileWriter;

  constructor(options: StructogenEngineOptions) {
    this.fileWriter = new FileWriter({
      fileSystem: options.fileSystem,
      baseDir: options.baseDir,
    });
  }

  // generation pipeline will go here
}
