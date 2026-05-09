export type SupportedLanguage =
  | 'csharp'
  | 'cpp'
  | 'java'
  | 'typescript'
  | 'javascript'
  | 'python';

export interface GenerateOptions {
  schemaPath: string;
  outputDir: string;
  languages: SupportedLanguage[];
  projectFilePath?: string;
}

export interface GenerateResult {
  success: boolean;
  outputFiles: string[];
  errors: string[];
}
