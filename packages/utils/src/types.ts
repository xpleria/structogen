export interface StructogenConfig {
  readonly schemaPath?: string;
  readonly outputPath?: string;
  readonly pluginPaths?: string[];
}

export interface StructogenDiagnostic {
  readonly message: string;
  readonly code?: string;
}
