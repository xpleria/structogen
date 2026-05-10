// packages/core/src/plugin-system/plugin-context.ts
import type { FileSystem } from "@xpleria/structogen-utils";
import type { StructogenEngine } from "../engine/structogen-engine.js";

export interface StructogenPluginContext {
  /** The engine instance, so plugins can register generators or extend behavior */
  engine: StructogenEngine;

  /** File system abstraction for reading/writing files */
  fileSystem: FileSystem;

  /** Root directory of the project being generated */
  baseDir: string;

  /** Optional: plugin-specific configuration */
  config?: Record<string, unknown>;

  /** Optional: logging interface */
  log: {
    info(message: string): void;
    warn(message: string): void;
    error(message: string): void;
  };
}
