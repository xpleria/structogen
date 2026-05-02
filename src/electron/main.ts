import { app, BrowserWindow, ipcMain, dialog } from 'electron';
import path from 'path';
import fs from 'fs/promises';
import type { GenerateOptions, GenerateResult, AppInfo } from '../shared/ipc-api.types';

// ---------------------------------------------------------------------------
// Window
// ---------------------------------------------------------------------------

let mainWindow: BrowserWindow | null = null;

function createWindow(): void {
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 768,
    webPreferences: {
      nodeIntegration: false,       // never true — use contextBridge instead
      contextIsolation: true,       // required for contextBridge to work
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  // __dirname resolves correctly in both dev and packaged (asar) builds.
  mainWindow.loadFile(path.join(__dirname, 'renderer', 'index.html'));

  mainWindow.on('maximize', () =>
    mainWindow?.webContents.send('window:maximizeChanged', true)
  );
  mainWindow.on('unmaximize', () =>
    mainWindow?.webContents.send('window:maximizeChanged', false)
  );

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// ---------------------------------------------------------------------------
// App lifecycle
// ---------------------------------------------------------------------------

app.whenReady().then(() => {
  registerIpcHandlers();
  createWindow();

  // macOS: re-create window when dock icon is clicked and no windows are open.
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Windows / Linux: quit when all windows are closed.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

// ---------------------------------------------------------------------------
// IPC handlers  (mirror of the API surface exposed in preload.ts)
// ---------------------------------------------------------------------------

function registerIpcHandlers(): void {

  // ── Dialogs ────────────────────────────────────────────────────────────

  ipcMain.handle('dialog:open', async (_event, options) => {
    if (!mainWindow) return null;
    const result = await dialog.showOpenDialog(mainWindow, options);
    return result.canceled ? null : result.filePaths;
  });

  ipcMain.handle('dialog:save', async (_event, options) => {
    if (!mainWindow) return null;
    const result = await dialog.showSaveDialog(mainWindow, options);
    return result.canceled ? null : result.filePath;
  });

  // ── File system ────────────────────────────────────────────────────────

  ipcMain.handle('fs:readFile', async (_event, filePath: string) => {
    return fs.readFile(filePath, 'utf-8');
  });

  ipcMain.handle('fs:writeFile', async (_event, filePath: string, content: string) => {
    await fs.mkdir(path.dirname(filePath), { recursive: true });
    await fs.writeFile(filePath, content, 'utf-8');
  });

  ipcMain.handle('fs:pathExists', async (_event, filePath: string) => {
    return fs.access(filePath).then(() => true).catch(() => false);
  });

  ipcMain.handle('fs:readDir', async (_event, dirPath: string) => {
    return fs.readdir(dirPath);
  });

  // ── Core engine ────────────────────────────────────────────────────────
  // TODO: replace stubs with real core engine calls once src/core/ exists.

  ipcMain.handle('core:generate', async (_event, options: GenerateOptions): Promise<GenerateResult> => {
    console.log('[main] core:generate called with', options);
    return { success: false, outputFiles: [], errors: ['Core engine not yet implemented.'] };
  });

  ipcMain.handle('core:validateSchema', async (_event, schemaPath: string): Promise<string[]> => {
    console.log('[main] core:validateSchema called with', schemaPath);
    return ['Schema validation not yet implemented.'];
  });

  // ── App / window controls ──────────────────────────────────────────────

  ipcMain.handle('app:getInfo', (): AppInfo => ({
    version: app.getVersion(),
    platform: process.platform as AppInfo['platform'],
  }));

  ipcMain.on('window:minimize', () => mainWindow?.minimize());
  ipcMain.on('window:toggleMaximize', () => {
    if (!mainWindow) return;
    mainWindow.isMaximized() ? mainWindow.unmaximize() : mainWindow.maximize();
  });
  ipcMain.on('window:close', () => mainWindow?.close());
}