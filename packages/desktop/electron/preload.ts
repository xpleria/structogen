import { contextBridge, ipcRenderer } from 'electron';
import type { IpcRendererEvent } from 'electron';
import type {
  AppInfo,
  GenerateOptions,
  GenerateResult,
  OpenDialogOptions,
  SaveDialogOptions,
  StructogenApi,
} from '@xpleria/structogen-utils';

const api: StructogenApi = {
  showOpenDialog: (options: OpenDialogOptions): Promise<string[] | null> =>
    ipcRenderer.invoke('dialog:open', options),

  showSaveDialog: (options: SaveDialogOptions): Promise<string | null> =>
    ipcRenderer.invoke('dialog:save', options),

  readFile: (filePath: string): Promise<string> => ipcRenderer.invoke('fs:readFile', filePath),

  writeFile: (filePath: string, content: string): Promise<void> =>
    ipcRenderer.invoke('fs:writeFile', filePath, content),

  pathExists: (filePath: string): Promise<boolean> => ipcRenderer.invoke('fs:pathExists', filePath),

  readDir: (dirPath: string): Promise<string[]> => ipcRenderer.invoke('fs:readDir', dirPath),

  generate: (options: GenerateOptions): Promise<GenerateResult> =>
    ipcRenderer.invoke('core:generate', options),

  validateSchema: (schemaPath: string): Promise<string[]> =>
    ipcRenderer.invoke('core:validateSchema', schemaPath),

  getAppInfo: (): Promise<AppInfo> => ipcRenderer.invoke('app:getInfo'),

  minimizeWindow: (): void => {
    ipcRenderer.send('window:minimize');
  },

  toggleMaximize: (): void => {
    ipcRenderer.send('window:toggleMaximize');
  },

  closeWindow: (): void => {
    ipcRenderer.send('window:close');
  },

  onMaximizeChange: (callback: (isMaximized: boolean) => void): (() => void) => {
    const handler = (_event: IpcRendererEvent, isMaximized: boolean) => {
      callback(isMaximized);
    };

    ipcRenderer.on('window:maximizeChanged', handler);

    return () => {
      ipcRenderer.removeListener('window:maximizeChanged', handler);
    };
  },
};

contextBridge.exposeInMainWorld('structogen', api);
