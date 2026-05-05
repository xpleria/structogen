import type { StructogenGenerator } from "@xpleria/structogen-core";

export class JavaScriptGenerator implements StructogenGenerator {
  readonly name = "structogen-generator-javascript";
  readonly language = "javascript";

  generate(): void {
    // TODO: Generate JavaScript project files.
  }
}
