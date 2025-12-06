import { app, ipcMain } from 'electron';
import createWindow from './src/main/window.js';
import registerIPC from './src/main/ipc.js';
import './src/util/globals.js';
import { getBrowser } from './src/main/crawler/crawler.manager.js';

app.whenReady().then(() => {
    const win = createWindow();
    registerIPC(win);
});

app.on('window-all-closed', async () => {
    const browser = getBrowser();
    if (browser) await browser.close();

    ipcMain.removeHandler('crawl-website');
    ipcMain.removeHandler('show-alert');

    if (process.platform !== 'darwin') {
        app.quit();
    }
});
