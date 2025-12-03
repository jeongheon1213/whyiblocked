async function crawl(url, browser) {
    const page = await browser.newPage();

    await page.setRequestInterception(true);
    page.on('request', (req) => {
        if (['image', 'stylesheet', 'font'].includes(req.resourceType())) req.abort();
        else req.continue();
    });

    await page.goto(url, { waitUntil: 'domcontentloaded' });

    const title = await page.title();
    await page.close();

    return title;
}

export { crawl };
