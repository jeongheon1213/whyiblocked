import { ipcMain } from 'electron';
import { crawl } from './crawler/crawler.service.js';
import { getBrowser } from './crawler/crawler.manager.js';

export default function registerIPC() {
    ipcMain.handle('crawl-website', async (_, url) => {
        return crawl(url, getBrowser());
    });
}
