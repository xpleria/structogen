import type { GeneratedFile, ParsedSchema, StructogenGenerator } from "@xpleria/structogen-core";
import type { GenerateOptions } from "@xpleria/structogen-utils";

export class CppGenerator implements StructogenGenerator {
  readonly name = "structogen-generator-cpp";
  readonly language = "cpp";

  async generate(schema: ParsedSchema, options: GenerateOptions): Promise<GeneratedFile[]> {
    // TODO: Generate C++ project files.

    // Temporary stub output so the generator builds
    return [
      {
        path: `${schema.rootTypeName}.hpp`,
        content: `// TODO: Implement C++ generation for ${schema.rootTypeName}\n`,
        language: "cpp",
        generator: this.name
      }
    ];
  }
}
