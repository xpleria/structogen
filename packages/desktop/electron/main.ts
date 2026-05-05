import { app, BrowserWindow, dialog, ipcMain } from 'electron';
import type {
  OpenDialogOptions as ElectronOpenDialogOptions,
  SaveDialogOptions as ElectronSaveDialogOptions,
} from 'electron';
import fs from 'fs/promises';
import path from 'path';
import squirrelStartup from 'electron-squirrel-startup';
import type { AppInfo, GenerateOptions, GenerateResult } from '@xpleria/structogen-utils';

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

let mainWindow: BrowserWindow | null = null;

if (squirrelStartup) {
  app.quit();
}

function createWindow(): void {
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 768,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  });

  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  mainWindow.on('maximize', () => {
    mainWindow?.webContents.send('window:maximizeChanged', true);
  });

  mainWindow.on('unmaximize', () => {
    mainWindow?.webContents.send('window:maximizeChanged', false);
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

function registerIpcHandlers(): void {
  ipcMain.handle('dialog:open', async (_event, options: ElectronOpenDialogOptions) => {
    if (!mainWindow) {
      return null;
    }

    const result = await dialog.showOpenDialog(mainWindow, options);
    return result.canceled ? null : result.filePaths;
  });

  ipcMain.handle('dialog:save', async (_event, options: ElectronSaveDialogOptions) => {
    if (!mainWindow) {
      return null;
    }

    const result = await dialog.showSaveDialog(mainWindow, options);
    return result.canceled ? null : result.filePath;
  });

  ipcMain.handle('fs:readFile', async (_event, filePath: string) => fs.readFile(filePath, 'utf-8'));

  ipcMain.handle('fs:writeFile', async (_event, filePath: string, content: string) => {
    await fs.mkdir(path.dirname(filePath), { recursive: true });
    await fs.writeFile(filePath, content, 'utf-8');
  });

  ipcMain.handle('fs:pathExists', async (_event, filePath: string) => {
    try {
      await fs.access(filePath);
      return true;
    } catch {
      return false;
    }
  });

  ipcMain.handle('fs:readDir', async (_event, dirPath: string) => fs.readdir(dirPath));

  ipcMain.handle('core:generate', async (_event, options: GenerateOptions): Promise<GenerateResult> => {
    void options;

    return {
      success: false,
      outputFiles: [],
      errors: ['Core engine not yet implemented.'],
    };
  });

  ipcMain.handle('core:validateSchema', async (_event, schemaPath: string): Promise<string[]> => {
    void schemaPath;

    return ['Schema validation not yet implemented.'];
  });

  ipcMain.handle('app:getInfo', (): AppInfo => ({
    version: app.getVersion(),
    platform: process.platform as AppInfo['platform'],
  }));

  ipcMain.on('window:minimize', () => {
    mainWindow?.minimize();
  });

  ipcMain.on('window:toggleMaximize', () => {
    if (!mainWindow) {
      return;
    }

    if (mainWindow.isMaximized()) {
      mainWindow.unmaximize();
      return;
    }

    mainWindow.maximize();
  });

  ipcMain.on('window:close', () => {
    mainWindow?.close();
  });
}

app.whenReady().then(() => {
  registerIpcHandlers();
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
