// const MangaData = [{
//     id: 1,
//     title: "マシンガンロック",
//     image: "images/p1.jpeg",
//     alt: "image of マシンガンロック",
//     update: "三日前更新",
//     daysAgo: 3,
//     description: "五人の変人探偵集団による異能力を使った現代SFコメディー。",
//     genres: ["アクション", "冒険"],
//     like: 120,
//     author: '一月一日',
//     isNew: true
// }
// , {
//     id: 2,
//     title: "暁月リベンジ",
//     image: "images/p2.jpeg",
//     alt: "image of 暁月リベンジ",
//     update: "昨日更新",
//     daysAgo: 1,
//     description: "人間に扮した悪魔二人組が街の事件を拳で解決していく",
//     genres: ["ファンタジー", "冒険"],
//     like: 95,
//     author: '一月一日',
//     isNew: false
// }
// , {
//     id: 3,
//     title: "コメディークラブ",
//     image: "images/p3.jpeg",
//     alt: "image of コメディークラブ",
//     update: "七日前更新",
//     daysAgo: 7,
//     description: "笑いとアクションが融合したユニークな物語。",
//     genres: ["コメディー", "アクション"],
//     like: 80,
//     author: '日暮奈々',
//     isNew: false
// }
// , {
//     id: 4,
//     title: "冒険の書",
//     image: "images/p4.jpeg",
//     alt: "image of 冒険の書",
//     update: "今日更新",
//     daysAgo: 0,
//     description: "未知の世界を探検する冒険譚。",
//     genres: ["冒険", "ファンタジー"],
//     like: 110,
//     author: '西山和',
//     isNew: true
// }
// ];

function genreTemplate(genres) {
    return genres.map(genre => `<p>${genre}</p>`).join('');
}

const scrollContainer = document.querySelector('#scrollContainer');

function displayManga(mangaList, containerId) {
    const container = document.querySelector(containerId);
    if (!container) return;

    container.innerHTML = '';

    mangaList.forEach(manga => {
        const mangaCard = document.createElement('a');
        mangaCard.className = 'manga';
        mangaCard.href = `manga_detail/index.html?id=${manga.id}`;

        mangaCard.innerHTML = `
            <button class="like_button" aria-label="Like ${manga.title}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M442.9 144C415.6 144 389.9 157.1 373.9 179.2L339.5 226.8C335 233 327.8 236.7 320.1 236.7C312.4 236.7 305.2 233 300.7 226.8L266.3 179.2C250.3 157.1 224.6 144 197.3 144C150.3 144 112.2 182.1 112.2 229.1C112.2 279 144.2 327.5 180.3 371.4C221.4 421.4 271.7 465.4 306.2 491.7C309.4 494.1 314.1 495.9 320.2 495.9C326.3 495.9 331 494.1 334.2 491.7C368.7 465.4 419 421.3 460.1 371.4C496.3 327.5 528.2 279 528.2 229.1C528.2 182.1 490.1 144 443.1 144zM335 151.1C360 116.5 400.2 96 442.9 96C516.4 96 576 155.6 576 229.1C576 297.7 533.1 358 496.9 401.9C452.8 455.5 399.6 502 363.1 529.8C350.8 539.2 335.6 543.9 320 543.9C304.4 543.9 289.2 539.2 276.9 529.8C240.4 502 187.2 455.5 143.1 402C106.9 358.1 64 297.7 64 229.1C64 155.6 123.6 96 197.1 96C239.8 96 280 116.5 305 151.1L320 171.8L335 151.1z"/></svg> ${manga.like}</button>
            <img src="${manga.image}" alt="${manga.alt}">
            <div class="manga_info">
                <p class="update">${manga.update}</p>
                <h3>${manga.title}</h3>
                <p class="description">${manga.description}</p>
                <div class="genres">
                    ${genreTemplate(manga.genres)}
                </div>
            </div>`;
        container.appendChild(mangaCard);
    });
}

async function loadMangaList(){
    try{
        const response = await fetch('../json/manga_deta.json');
    if (!response.ok) {
        throw new Error(`データを取得できませんでした：${response.status}`);
    }
    let mangaDeta = await response.json();

    const continueList = [...mangaDeta].sort((a,b) => a.daysAgo - b.daysAgo);
    displayManga(continueList, '#continueList');

    const suggestList = mangaDeta.filter(manga => manga.isNew);
        displayManga(suggestList, '#suggestList');

    } catch (error) {
        console.error("トップページの描画に必要なデータ処理に失敗しました:", error);
    }
}

document.addEventListener('DOMContentLoaded', loadMangaList);