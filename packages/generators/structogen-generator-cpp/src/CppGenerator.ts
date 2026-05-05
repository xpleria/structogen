import type { StructogenGenerator } from "@xpleria/structogen-core";

export class CppGenerator implements StructogenGenerator {
  readonly name = "structogen-generator-cpp";
  readonly language = "cpp";

  generate(): void {
    // TODO: Generate C++ project files.
  }
}
