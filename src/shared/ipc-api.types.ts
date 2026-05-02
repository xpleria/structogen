// ---------------------------------------------------------------------------
// src/shared/ipc-api.types.ts
//
// Single source of truth for all IPC types shared across:
//   - src/electron/preload.ts  (exposes the API shape via contextBridge)
//   - src/electron/main.ts     (types ipcMain handler arguments)
//   - Angular ElectronService  (types window.structogen calls)
//
// No Electron or Node.js imports — this file must be safe to import in
// any context (main process, preload, and Angular renderer).
// ---------------------------------------------------------------------------

// ── Dialogs ─────────────────────────────────────────────────────────────────

export interface FileFilter {
  name: string;
  extensions: string[];
}

export interface OpenDialogOptions {
  title?: string;
  defaultPath?: string;
  filters?: FileFilter[];
  properties?: ('openFile' | 'openDirectory' | 'multiSelections')[];
}

export interface SaveDialogOptions {
  title?: string;
  defaultPath?: string;
  filters?: FileFilter[];
}

// ── Core engine ──────────────────────────────────────────────────────────────

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

// Enumerate supported languages explicitly so both the UI and core engine
// agree on the valid values. Extend this union as new languages are added.
export type SupportedLanguage = 'csharp' | 'cpp' | 'java' | 'typescript' | 'javascript' | 'python';

// ── App / window ─────────────────────────────────────────────────────────────

export interface AppInfo {
  version: string;
  // Constrained to the platforms Electron actually runs on.
  platform: 'win32' | 'darwin' | 'linux';
}

// ── Full API contract ────────────────────────────────────────────────────────
//
// This interface describes exactly what window.structogen exposes.
// Angular's ElectronService should implement or wrap this type so that
// any drift between the preload and the service is caught at compile time.

export interface StructogenApi {
  // Dialogs
  showOpenDialog(options: OpenDialogOptions): Promise<string[] | null>;
  showSaveDialog(options: SaveDialogOptions): Promise<string | null>;

  // File system
  readFile(filePath: string): Promise<string>;
  writeFile(filePath: string, content: string): Promise<void>;
  pathExists(filePath: string): Promise<boolean>;
  readDir(dirPath: string): Promise<string[]>;

  // Core engine
  generate(options: GenerateOptions): Promise<GenerateResult>;
  validateSchema(schemaPath: string): Promise<string[]>;

  // App / window controls
  getAppInfo(): Promise<AppInfo>;
  minimizeWindow(): void;
  toggleMaximize(): void;
  closeWindow(): void;
  onMaximizeChange(callback: (isMaximized: boolean) => void): () => void;
}

// Augment the global Window type so TypeScript knows window.structogen exists
// in any file that imports from this module.
declare global {
  interface Window {
    structogen: StructogenApi;
  }
}