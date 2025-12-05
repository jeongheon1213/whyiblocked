const output = document.getElementById('output');
const copyBtn = document.getElementById('copy-btn');

copyBtn?.addEventListener('click', async () => {
    if (!output) return;
    try {
        await navigator.clipboard.writeText(output.innerText);
        copyBtn.innerText = '복사됨';
        setTimeout(() => {
            copyBtn.innerText = '복사';
        }, 1500);
    } catch (err) {
        console.error('Copy failed', err); // eslint-disable-line no-console
    }
});

document.getElementById('btn').addEventListener('click', async () => {
    const urlInput = document.getElementById('url').value;
    const urls = urlInput.split(/\r?\n/).map((u) => u.trim()).filter(Boolean);
    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    output.innerText = '';

    for (let i = 0; i < urls.length; i += 1) {
        const url = urls[i];
        // 처리 편의를 위해 URL을 줄 단위로 받아 순차 크롤링
        const result = await window.api.crawl(url);
        const formatted = Array.isArray(result)
            ? result
                  .map((item) => {
                      if (typeof item === 'object' && item !== null) {
                          const { title, titleHref, author, authorHref, time } = item;
                          return `<p><a href="${titleHref || '#'}">${title || ''}</a></p>\n<p>${time || ''}</p>\n<p><a href="${
                              authorHref || '#'
                          }">${author || ''}</a></p>`;
                      }
                      return `<p>${String(item)}</p>`;
                  })
                  .join('\n')
            : String(result);

        output.innerText += `${formatted}\n\n<hr>\n`;
        console.log(url, result); // eslint-disable-line no-console

        if (i < urls.length - 1) {
            await sleep(10000); // 각 URL 사이에 10초 간격을 둔다
        }
    }
    // document.getElementById('output').innerHTML = result.join('<br>');
    // document.getElementById('output').innerText = result;
});
