import { BrowserWindow } from 'electron';
import path from 'path';
import { ROOT_PATH } from '../util/globals.js';

export default function createWindow() {
    const win = new BrowserWindow({
        width: 1200,
        height: 800,
        minWidth: 1200,
        minHeight: 800,
        webPreferences: {
            preload: path.join(ROOT_PATH, 'src/preload/preload.js'),
        },
    });

    win.loadFile(path.join(ROOT_PATH, 'src/views/app/app.html'));
}
