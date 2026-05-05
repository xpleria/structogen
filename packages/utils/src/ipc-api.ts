export interface FileFilter {
  name: string;
  extensions: string[];
}

export interface OpenDialogOptions {
  title?: string;
  defaultPath?: string;
  filters?: FileFilter[];
  properties?: Array<'openFile' | 'openDirectory' | 'multiSelections'>;
}

export interface SaveDialogOptions {
  title?: string;
  defaultPath?: string;
  filters?: FileFilter[];
}

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

export interface AppInfo {
  version: string;
  platform: 'win32' | 'darwin' | 'linux';
}

export interface StructogenApi {
  showOpenDialog(options: OpenDialogOptions): Promise<string[] | null>;
  showSaveDialog(options: SaveDialogOptions): Promise<string | null>;
  readFile(filePath: string): Promise<string>;
  writeFile(filePath: string, content: string): Promise<void>;
  pathExists(filePath: string): Promise<boolean>;
  readDir(dirPath: string): Promise<string[]>;
  generate(options: GenerateOptions): Promise<GenerateResult>;
  validateSchema(schemaPath: string): Promise<string[]>;
  getAppInfo(): Promise<AppInfo>;
  minimizeWindow(): void;
  toggleMaximize(): void;
  closeWindow(): void;
  onMaximizeChange(callback: (isMaximized: boolean) => void): () => void;
}

declare global {
  interface Window {
    structogen: StructogenApi;
  }
}
