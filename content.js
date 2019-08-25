let x;
let y;

//追加したコメント欄クリック時、
function mouseDown(e){

  //drag クラスを追加
  this.classList.add("drag");

  //要素内の相対位置を取得
  x = e.pageX - this.offsetLeft;
  y = e.pageY - this.offsetTop;

  //マウス移動時のイベント追加
  document.body.addEventListener("mousemove", mouseMove);
}

//クリックした要素の移動時
function mouseMove(e){
  let drag = document.getElementsByClassName("drag")[0];

  //マウスの位置に要素を移動
  drag.style.left = e.pageX - x + "px";
  drag.style.top = e.pageY - y + "px";

  //マウスクリック終了時、イベント付与
  drag.addEventListener("mouseup", mouseUp);
}

//マウスクリック終了時
function mouseUp(){
  let drag = document.getElementsByClassName("drag")[0];

  //クリックイベントを削除
  document.body.removeEventListener("mousemove", mouseMove);
  drag.removeEventListener("mouseup", mouseUp);

  //付与したクラスも削除
  drag.classList.remove("drag");
}

//追加したコメント欄上にマウス移動時
function mouseOver(e){
  //hide_commentsList属性を削除してshow_commentsList属性を付与する事で、表示
  this.classList.remove("hide_commentsList");
  this.classList.add("show_commentsList");

  let show = document.getElementsByClassName('show_commentsList')[0];
  show.addEventListener("mouseleave", mouseLeave);
}

function mouseLeave(){

  this.classList.remove("show_commentsList");
  this.classList.add("hide_commentsList");
}


chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
  var div = document.createElement("div");
  div.id = "comments_list";
  div.className = "show_commentsList";

  //DOMに追加したコメント欄をドラッグ出来るようにする処理開始。クリック時のイベント付与。
  div.addEventListener("mousedown", mouseDown);

  //DOMに追加したコメント欄の上にマウスを移動すると、要素を表示
  div.addEventListener("mouseover", mouseOver);

  document.getElementsByClassName("player-video")[0].appendChild(div);

  //アイコンクリック２秒後に、hide_commentsList属性を付与する事でコメント欄を透明化
  setTimeout(function(){
    div.classList.add("hide_commentsList");
  }, 2000);

  sendResponse();
  return true;
});
