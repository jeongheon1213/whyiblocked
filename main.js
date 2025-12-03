import { app } from 'electron';
import createWindow from './src/main/window.js';
import registerIPC from './src/main/ipc.js';
import './src/util/globals.js';

app.whenReady().then(() => {
    createWindow();
    registerIPC();
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});
