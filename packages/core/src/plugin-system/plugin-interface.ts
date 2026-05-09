import type { GeneratedFile, ParsedSchema } from "@xpleria/structogen-common/src/types.js";
import type { GenerateOptions } from "@xpleria/structogen-common/src/generate-options.js";
import { StructogenPluginContext } from "./plugin-context.js";

/**
 * Interface that all code generators must implement.
 * Generators are plugins that produce code files from a parsed schema.
 */
export interface StructogenGenerator {
  readonly name: string;
  readonly language: string;
  generate(schema: ParsedSchema, options: GenerateOptions): Promise<GeneratedFile[]>;
}

/**
 * A plugin that provides one or more generators.
 */
export interface StructogenPlugin {
  readonly name: string;
  readonly generators: StructogenGenerator[];
  initialize(context: StructogenPluginContext): void;
}
