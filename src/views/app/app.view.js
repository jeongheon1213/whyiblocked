document.getElementById('btn').addEventListener('click', async () => {
    const url = document.getElementById('url').value;
    const result = await window.api.crawl(url);
    document.getElementById('output').innerText = result;
});
