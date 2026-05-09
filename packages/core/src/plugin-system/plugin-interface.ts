import { GenerateOptions } from "@xpleria/structogen-utils";
import { GeneratedFile, ParsedSchema } from "../index.js";

export interface StructogenGenerator {
  readonly name: string;
  readonly language: string;
  generate(schema: ParsedSchema, options: GenerateOptions): Promise<GeneratedFile[]>;
}

export interface StructogenPlugin {
  readonly name: string;
  readonly generators: StructogenGenerator[];
  initialize(): void;
}
