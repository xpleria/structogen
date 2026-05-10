// packages/core/src/engine/structogen-engine-options.ts
import type { FileSystem } from "@xpleria/structogen-utils";

export interface StructogenEngineOptions {
  fileSystem: FileSystem;
  baseDir: string;
  // future: plugins, logging, schema cache, diagnostics, etc.
}
