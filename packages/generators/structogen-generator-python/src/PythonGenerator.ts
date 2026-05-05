import type { StructogenGenerator } from "@xpleria/structogen-core";

export class PythonGenerator implements StructogenGenerator {
  readonly name = "structogen-generator-python";
  readonly language = "python";

  generate(): void {
    // TODO: Generate Python project files.
  }
}
