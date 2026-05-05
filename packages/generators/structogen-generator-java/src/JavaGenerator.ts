import type { StructogenGenerator } from "@xpleria/structogen-core";

export class JavaGenerator implements StructogenGenerator {
  readonly name = "structogen-generator-java";
  readonly language = "java";

  generate(): void {
    // TODO: Generate Java project files.
  }
}
