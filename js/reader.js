document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const mangaId = params.get('mangaId');
    const episodeId = params.get('ep');

    if (mangaId && episodeId) {
        fetchAndDisplayPages(mangaId, episodeId);
    } else {
        console.error("作品IDまたは話数IDがありません");
    }
});

async function fetchAndDisplayPages(mangaId, episodeId) {
    const jsonPath = `json/viewer/view_${mangaId}.json`;
    const container = document.querySelector('#viewer-container')
    const titleEl = document.querySelector('#episodeNum');

    try {
        const response = await fetch(jsonPath);
        if (!response.ok) throw new Error("ページが見つかりません");

        const allPagesDeta = await response.json();
        const pages = allPagesDeta[episodeId];

        if (!pages) throw new Error(`第${episodeId}話のデータがありません`);

        if (titleEl) titleEl.textContent = `第${episodeId}話`;

        let htmlContent = '';
        pages.forEach(imagePath => {
            htmlContent += `<img src="${imagePath}" class="manga-page" loading="lazy">`;
        });
        container.innerHTML = htmlContent;
    } catch (e) {
        console.error(e);
        if (container) {
            container.innerHTML = "<p style='color:white; text-align: center;'>画像の読み込みに失敗しました</p>";
        }
    }
}