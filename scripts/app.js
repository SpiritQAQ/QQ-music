import scss from "../scss/app.scss"
import Recommend from "./recommend.js"
import Toplist from "./toplist"
import Search from "./search"
import "./tab.js"
import { MusicPlayer } from './music_player.js'



let recommend = new Recommend(document.querySelector(".rec-wrapper")).launch()
let toplist = new Toplist(document.querySelector(".toplist-wrapper")).launch()
let search = new Search(document.querySelector(".search-wrapper"))
let player = new MusicPlayer(document.querySelector('#player'))

document.querySelector('.show-player').addEventListener('click', () => {
  player.show()
})

onHashChange()
addEventListener('hashchange', onHashChange)
//搜索点击歌曲弹出播放器
function onHashChange() {
  let hash = location.hash
  if (/^#player\?.+/.test(hash)) {
    let matches = hash.slice(hash.indexOf('?') + 1).match(/(\w+)=([^&]+)/g)
    let options = matches && matches.reduce((res, cur) => {
      let arr = cur.split('=')
      res[arr[0]] = decodeURIComponent(arr[1])
      return res
    }, {})
    player.play(options)
    console.log(options)
  } else {
    player.hide()
  }
}