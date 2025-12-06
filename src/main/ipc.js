import { dialog, ipcMain } from 'electron';
import { crawl } from './crawler/crawler.service.js';
import { getBrowser } from './crawler/crawler.manager.js';

export default function registerIPC(win) {
    ipcMain.handle('crawl-website', async (_, url) => {
        return crawl(url, getBrowser());
    });

    ipcMain.handle('show-alert', async (event, message) => {
        await dialog.showMessageBox(win, {
            type: 'info',
            title: message.title,
            message: message.message,
            buttons: ['확인'],
        });
    });
}
