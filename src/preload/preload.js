const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
    crawl: (url) => ipcRenderer.invoke('crawl-website', url),
    alert: (msg) => ipcRenderer.invoke('show-alert', msg),
});
