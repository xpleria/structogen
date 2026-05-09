import type { GeneratedFile, ParsedSchema, StructogenGenerator } from "@xpleria/structogen-core";
import type { GenerateOptions } from "@xpleria/structogen-utils";

export class PythonGenerator implements StructogenGenerator {
  readonly name = "structogen-generator-python";
  readonly language = "python";

  async generate(schema: ParsedSchema, options: GenerateOptions): Promise<GeneratedFile[]> {
    // TODO: Generate Python project files.

    return [
      {
        path: `${schema.rootTypeName}.py`,
        content: `# TODO: Implement Python generation for ${schema.rootTypeName}\n`,
        language: "python",
        generator: this.name
      }
    ];
  }
}
