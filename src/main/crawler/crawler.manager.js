import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';

puppeteer.use(StealthPlugin());

let browser;

(async () => {
    browser = await puppeteer.launch({ headless: true });
})();

process.on('exit', () => browser?.close());

export function getBrowser() {
    return browser;
}
