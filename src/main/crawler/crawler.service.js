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
        const heads = document.querySelectorAll('.article-head');

        return Array.from(heads)
            .map((head) => {
                const titleEl = head.querySelector('.title');
                const titleLinkEl = titleEl?.closest('a') || titleEl?.querySelector('a') || titleEl;
                const userEl = head.querySelector('.user-info a');
                const timeEl = head.querySelector('time');

                const titleText = titleEl?.textContent?.trim() || '';
                const titleHref = titleLinkEl?.getAttribute('href')?.trim() || '';
                const userText = userEl?.textContent?.trim() || '';
                const userHref = userEl?.getAttribute('href')?.trim() || '';
                const timeValue = timeEl?.textContent?.trim() || '';

                return {
                    title: titleText,
                    titleHref,
                    author: userText,
                    authorHref: userHref,
                    time: timeValue,
                };
            })
            .filter((item) => item.title || item.author || item.authorHref || item.time);
    });

    const pageUrl = page.url() || url;

    await page.close();

    return content.map((item) => ({
        ...item,
        titleHref: item.titleHref || pageUrl || url,
    }));
}

export { crawl };
