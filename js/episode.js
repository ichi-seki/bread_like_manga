document.addEventListener('DOMContentLoaded', ()=> {
    const params = new URLSearchParams(window.location.search);
    const mangaId = params.get('id');
    if (mangaId) {
        fetchMangaBasicInfo(mangaId);
        fetchAndSetupEpisodes(mangaId);
    } else {
        console.error("URLにidが含まれていません");
    }
});

let allEpisodesData = [];

async function fetchMangaBasicInfo(mangaId){
    const jsonPath = 'json/manga_deta.json';
    try {
        const response = await fetch(jsonPath);
        if (!response.ok) throw new Error (`基本データが見つかりません (${jsonPath})`);

        const mangaList = await response.json();

        const targetManga = mangaList.find(manga => manga.id == mangaId);

        if (targetManga) {
            const titleEl = document.querySelector('#title');
            const authorEl = document.querySelector('#author');
            const coverSenEl = document.querySelector('#coverSen');
            const imgEl = document.querySelector('#coverImg');

            if (titleEl) titleEl.textContent = targetManga.title;
            if (authorEl) authorEl.textContent = targetManga.author;
            if (coverSenEl) coverSenEl.textContent = targetManga.coverSen
            if (imgEl) {
                imgEl.src = targetManga.image;
                imgEl.alt = `${targetManga.title}の表紙`;
            }
        } else {
            console.error("指定されたIDの作品データは見つかりませんでした");
        }
    } catch (e) {
        console.error("基本情報読み込みエラー", e)
    }
}


async function fetchAndSetupEpisodes(mangaId) {
    const jsonPath = `json/episode/episode_${mangaId}.json`;
    try {
        const response = await fetch(jsonPath);
        if (!response.ok) throw new Error("データが見つかりません");
        allEpisodesData = await response.json();
        setupArcDropdown(allEpisodesData);
        if (allEpisodesData.length > 0) {
            const firstArc = allEpisodesData[0].arc;
            renderEpisodeList(firstArc);
        }
    } catch (e) {
        console.error(e);
    }
}

function setupArcDropdown(deta) {
    const dropdown = document.querySelector('#chapter');
    if (!dropdown) return;

    const uniqueArcs = [...new Set(deta.map(ep => ep.arc))];

    dropdown.innerHTML = '';

    uniqueArcs.forEach(arcName => {
        const option = document.createElement('option');
        option.value = arcName;
        option.textContent = arcName;
        dropdown.appendChild(option);
    });

    dropdown.addEventListener('change', (event) => {
        const selectedArc = event.target.value;
        renderEpisodeList(selectedArc);
    });
}

function renderEpisodeList(selectedArc) {
    const container = document.querySelector('#epiList')
    const filteredEpisode = allEpisodesData.filter(ep => ep.arc === selectedArc).sort((a,b) => b.episodeId - a.episodeId);
    let htmlContent = '';
    const params = new URLSearchParams(window.location.search);
    const currentMangaId = params.get('id');

    filteredEpisode.forEach(ep => {
        const renderLink = `render.html?mangaId=${currentMangaId}&ep=${ep.episodeId}`;
        htmlContent += `<hr>
        <a class="episode" href="#" ...>
            <div class="left_img">
                <img class="epi_img" src="${ep.thumbnail}">
            </div>
            <div class="epi_info">
                <h3>${ep.episodeId}. ${ep.title}</h3>
                <p>${ep.updateDate}更新　<span>無料</span></p>
            </div>
        </a>
                `;
    });
    container.innerHTML = htmlContent;
}