async function crawl(url, browser) {
    const page = await browser.newPage();

    await page.setRequestInterception(true);
    page.on('request', (req) => {
        req.continue();
        // if (['image', 'stylesheet', 'font'].includes(req.resourceType())) req.abort();
        // else req.continue();
    });
    await page.setUserAgent(
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36'
    );

    // await page.(2000);
    // await page.mouse.move(100, 200);

    await page.goto(url, { waitUntil: 'domcontentloaded' });

    const title = await page.title();
    const content = await page.evaluate(() => {
        // const elements = document.querySelectorAll('div > p');
        // return Array.from(elements).map((el) => el.innerText.trim());

        const imgs = document.querySelectorAll('.fr-view.article-content img');
        return Array.from(imgs)
            .map((el) => el.getAttribute('src'))
            .filter((src) => src && src.trim() !== '');

        // return document.body.innerHTML; // body 전체 텍스트
        // return document.body; // body 전체 텍스트
    });

    await page.close();

    return content;
}

export { crawl };
