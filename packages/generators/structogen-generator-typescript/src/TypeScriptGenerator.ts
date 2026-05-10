import type { GeneratedFile, ParsedSchema, StructogenGenerator } from "@xpleria/structogen-core";
import type { GenerateOptions } from "@xpleria/structogen-utils";

export class TypeScriptGenerator implements StructogenGenerator {
  readonly name = "structogen-generator-typescript";
  readonly language = "typescript";

  async generate(schema: ParsedSchema, options: GenerateOptions): Promise<GeneratedFile[]> {
    // TODO: Generate TypeScript project files.

    return [
      {
        path: `${schema.rootTypeName}.ts`,
        content: `// TODO: Implement TypeScript generation for ${schema.rootTypeName}\n`,
        language: "typescript",
        generator: this.name
      }
    ];
  }
}
