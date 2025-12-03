const output = document.getElementById('output');
document.getElementById('btn').addEventListener('click', async () => {
    const url = document.getElementById('url').value;
    const result = await window.api.crawl(url);
    result.forEach((img) => {
        const imgElem = document.createElement('img');
        imgElem.setAttribute('src', 'https:' + img);
        output.append(imgElem);
    });
    // document.getElementById('output').innerHTML = result.join('<br>');
    console.log(result);
    // document.getElementById('output').innerText = result;
});
