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