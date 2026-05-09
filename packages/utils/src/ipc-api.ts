import { NormalizedPlatform } from "./platform.js";
import type { GenerateOptions, GenerateResult, SupportedLanguage } from "@xpleria/structogen-common";

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

// Re-export shared types for convenience
export type { SupportedLanguage, GenerateOptions, GenerateResult } from "@xpleria/structogen-common";

export interface AppInfo {
  version: string;
  platform: NormalizedPlatform;
}

export interface StructogenApi {
  invoke(channel: string, ...args: unknown[]): Promise<unknown>;
  send(channel: string, ...args: unknown[]): void;
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
