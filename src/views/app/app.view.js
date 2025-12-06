const TERM = 10000;

const output = document.getElementById('output');
const copyBtn = document.getElementById('copy-btn');
const actionBtn = document.getElementById('btn');
const spinner = document.getElementById('spinner');

copyBtn?.addEventListener('click', async () => {
    if (!output) return;
    try {
        await navigator.clipboard.writeText(output.innerText);
        copyBtn.innerText = '복사됨!';
        setTimeout(() => {
            copyBtn.innerText = '복사';
        }, 1500);
    } catch (err) {
        console.error('복사 실패', err); // eslint-disable-line no-console
    }
});

const toggleSpinner = (isVisible) => {
    if (!spinner) return;
    spinner.classList.toggle('is-visible', isVisible);
};

actionBtn?.addEventListener('click', async () => {
    if (!output || !actionBtn) return;
    const urlInput = document.getElementById('url').value;
    const urls = urlInput
        .split(/\r?\n/)
        .map((u) => u.trim())
        .filter(Boolean);
    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    output.innerText = '';
    actionBtn.disabled = true;
    toggleSpinner(true);

    try {
        for (let i = 0; i < urls.length; i++) {
            const url = urls[i];
            // Ask the main process to crawl this URL before moving to the next one.
            const result = await window.api.crawl(url);
            const formatted = Array.isArray(result)
                ? result
                      .map((item) => {
                          if (typeof item === 'object' && item !== null) {
                              const { title, titleHref, author, authorHref, time } = item;
                              return `<p><a href="${titleHref || '#'}">${title || ''}</a></p>\n<p>${
                                  time || ''
                              }</p>\n<p><a href="${authorHref || '#'}">${author || ''}</a></p>`;
                          }
                          return `<p>${String(item)}</p>`;
                      })
                      .join('\n')
                : String(result);

            output.innerText += `${formatted}`;

            if (i < urls.length - 1) {
                await sleep(TERM); // Wait 10 seconds between URLs.
            } else {
                output.innerText += '<hr>';
            }
        }
    } finally {
        actionBtn.disabled = false;
        toggleSpinner(false);
        window.api.alert({ title: '북딱', message: '완료!' });
    }
});
