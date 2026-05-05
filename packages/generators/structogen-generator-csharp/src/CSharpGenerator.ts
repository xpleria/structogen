import type { StructogenGenerator } from "@xpleria/structogen-core";

export class CSharpGenerator implements StructogenGenerator {
  readonly name = "structogen-generator-csharp";
  readonly language = "csharp";

  generate(): void {
    // TODO: Generate C# project files.
  }
}
