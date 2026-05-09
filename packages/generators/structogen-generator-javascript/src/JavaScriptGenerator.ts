import type { GeneratedFile, ParsedSchema, StructogenGenerator } from "@xpleria/structogen-core";
import type { GenerateOptions } from "@xpleria/structogen-utils";

export class JavaScriptGenerator implements StructogenGenerator {
  readonly name = "structogen-generator-javascript";
  readonly language = "javascript";

  async generate(schema: ParsedSchema, options: GenerateOptions): Promise<GeneratedFile[]> {
    // TODO: Generate JavaScript project files.

    return [
      {
        path: `${schema.rootTypeName}.js`,
        content: `// TODO: Implement JavaScript generation for ${schema.rootTypeName}\n`,
        language: "javascript",
        generator: this.name
      }
    ];
  }
}
