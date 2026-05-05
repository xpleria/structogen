import type { StructogenGenerator } from "@xpleria/structogen-core";

export class TypeScriptGenerator implements StructogenGenerator {
  readonly name = "structogen-generator-typescript";
  readonly language = "typescript";

  generate(): void {
    // TODO: Generate TypeScript project files.
  }
}
