import type { GeneratedFile, ParsedSchema, StructogenGenerator } from "@xpleria/structogen-core";
import type { GenerateOptions } from "@xpleria/structogen-utils";

export class JavaGenerator implements StructogenGenerator {
  readonly name = "structogen-generator-java";
  readonly language = "java";

  async generate(schema: ParsedSchema, options: GenerateOptions): Promise<GeneratedFile[]> {
    // TODO: Generate Java project files.

    return [
      {
        path: `${schema.rootTypeName}.java`,
        content: `// TODO: Implement Java generation for ${schema.rootTypeName}\n`,
        language: "java",
        generator: this.name
      }
    ];
  }
}
