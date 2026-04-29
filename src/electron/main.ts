import { app, BrowserWindow } from 'electron';
import path from 'path';

let mainWindow: BrowserWindow;

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  });

  
  const indexPath = app.isPackaged
    ? path.join(process.resourcesPath, 'app.asar', 'dist', 'electron', 'renderer', 'index.html')
    : path.join(__dirname, '../renderer/index.html');

  mainWindow.loadFile(indexPath);
});