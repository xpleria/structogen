import type { GeneratedFile, ParsedSchema, StructogenGenerator } from "@xpleria/structogen-core";
import type { GenerateOptions } from "@xpleria/structogen-utils";

export class CSharpGenerator implements StructogenGenerator {
  readonly name = "structogen-generator-csharp";
  readonly language = "csharp";

  async generate(schema: ParsedSchema, options: GenerateOptions): Promise<GeneratedFile[]> {
    // TODO: Generate C# project files.

    return [
      {
        path: `${schema.rootTypeName}.cs`,
        content: `// TODO: Implement C# generation for ${schema.rootTypeName}\n`,
        language: "csharp",
        generator: this.name
      }
    ];
  }
}
