import puppeteer from 'puppeteer';

let browser;

(async () => {
    browser = await puppeteer.launch({ headless: true });
})();

process.on('exit', () => browser?.close());

export function getBrowser() {
    return browser;
}
