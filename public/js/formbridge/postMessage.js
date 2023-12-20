/* 初回読み込み時 */
window.onload = () => {
  postMessage()
}

/* ウィンドウリサイズ時 */
window.onresize = () => {
  postMessage()
}

/* 要素のリサイズ時 */
const resizeObserver = new ResizeObserver(() => {
  postMessage()
})
resizeObserver.observe(document.querySelector('.fb-content'))

/* 親要素に対してpostMessageを送信 */
const postMessage = () => {
  // コンテンツの高さを取得
  // ※bodyやmain指定だと確認画面含む最大高さになるため.fb-content
  // 最後の数字は.fb-contentの下層から追加されているmargin(1rem)分
  const height = document.querySelector('.fb-content').clientHeight + 14
  window.parent.postMessage({ contentHeight: height }, '*')
}
