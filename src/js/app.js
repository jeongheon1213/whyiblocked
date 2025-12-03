const textarea = document.getElementById("links");
const runBtn = document.getElementById("run");
const clearBtn = document.getElementById("clear");
const results = document.getElementById("results");

function renderEmpty() {
    results.innerHTML = "";
    const box = document.createElement("div");
    box.className = "empty-state";
    box.textContent = "링크를 입력하고 크롤링을 시작하면 여기에 결과가 표시됩니다.";
    results.appendChild(box);
}

function renderResults(list) {
    results.innerHTML = "";
    if (!list.length) {
        renderEmpty();
        return;
    }

    list.forEach(link => {
        const card = document.createElement("div");
        card.className = "result-card";
        card.innerHTML = `
            <div class="url">${link}</div>
            <div class="status">준비됨 · 추출 대기</div>
        `;
        results.appendChild(card);
    });
}

runBtn.addEventListener("click", () => {
    const links = textarea.value
        .split(/\r?\n/)
        .map(l => l.trim())
        .filter(Boolean);
    renderResults(links);
    // TODO: 연결될 크롤러에 links 배열을 넘겨서 처리하면 됩니다.
});

clearBtn.addEventListener("click", () => {
    textarea.value = "";
    renderEmpty();
});

// initial state
renderEmpty();
