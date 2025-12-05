// detail.js など、画像を読み込むJSファイルに追加
const isLocal = window.location.hostname === '127.0.0.1' || window.location.hostname === 'localhost';
const basePrefix = isLocal ? '../' : ''; // ローカルなら一つ上の階層へ

// 画像パスを生成する際に、このプレフィックスを付ける
const imagePath = `${basePrefix}images/p1.jpg`;

let lastScroll = 0;

window.addEventListener("scroll", () => {
  const current = window.scrollY;

  if (current > lastScroll) {
    // 下にスクロール
    document.body.classList.add("scrolling-down");
  } else {
    // 上にスクロール / 停止
    document.body.classList.remove("scrolling-down");
  }

  lastScroll = current;
});