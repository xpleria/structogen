export interface StructogenGenerator {
  readonly name: string;
  readonly language: string;
  generate(): void;
}

export interface StructogenPlugin {
  readonly name: string;
  readonly generators: StructogenGenerator[];
  initialize(): void;
}
