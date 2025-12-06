document.addEventListener('DOMContentLoaded', ()=> {
    const params = new URLSearchParams(window.location.search);
    const mangaId = params.get('id');
    if (mangaId) {
        fetchAndSetupEpisodes(mangaId)
    }
});

let allEpisodesData = [];

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
    const filteredEpisode = allEpisodesData.filter(ep => ep.arc === selectedArc);
    let htmlContent = '';
    filteredEpisode.forEach(ep => {
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