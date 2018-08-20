import {TOPLIST_URL} from "./constants.js"
import {lazyload} from "./lazyload.js"
export default class toplist{
  constructor(el){
    this.$el = el
  }


  launch(){
    fetch(TOPLIST_URL)
      .then(res => res.json())
      .then(json => this.json =json)
      .then(()=>this.render(this.json.data.topList))
  }


  render(thelist){
    console.log(thelist)
    this.$el.innerHTML = thelist.map(topLi=>
    `
      <div class="top-item">
        <div class="img-box">
          <img data-src="${topLi.picUrl.replace("http","https")}" class="lazyload"/>
          <div class="listen-count">
            <i class="icon icon-listen"></i>
            ${this.getNum(topLi.listenCount)}
          </div>
        </div>
        <div class="top-item-info">
          <div class="top-item-title">${topLi.topTitle}</div>
          <ul class="top-item-songlist">
            <li><span>1</span>${topLi.songList[0].songname}<span> - ${topLi.songList[0].singername}</span></li>
            <li><span>2</span>${topLi.songList[1].songname}<span> - ${topLi.songList[1].singername}</span></li>
            <li><span>3</span>${topLi.songList[2].songname}<span> - ${topLi.songList[2].singername}</span></li>
          </ul>
        </div>
        <i class="topic-arrow"></i>
      </div>
    `
  ).join(" ")
  lazyload()
  }
  getNum(num){
    num = num > 9999 ? (Math.floor(num/1000)/10) + '万' : num
    return num
  }
}