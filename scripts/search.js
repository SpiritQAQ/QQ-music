import {SEARCH_URL} from "./constants.js"
export default class search {
  constructor(el) {
    this.$el = el
    this.$input = this.$el.querySelector("#search")
    this.$cancel = this.$el.querySelector(".search-cancel")
    this.$songlist = this.$el.querySelector(".song-list")
    this.bindCancelBtn()
    this.$input.addEventListener("keyup",this.onKeyup.bind(this))
    window.addEventListener("scroll",this.onScroll.bind(this))
    this.data = {
      page:1,
      keyword:'',
      songlist:[],
      nomore:false
    }
  }
  reset(){
    this.data = {
      page:1,
      keyword:'',
      songlist:[],
      nomore:false 
    }
    this.$songlist.innerHTML = ""
  }
  bindCancelBtn(){
    this.$input.addEventListener("focus",()=>{
      this.$cancel.classList.remove("hide")
    })
    this.$cancel.addEventListener("click",()=>
      this.$cancel.classList.add("hide")
    )
  }
  onKeyup(e){
    let keyword = e.target.value.trim()
    // if(keyword =="") this.reset()
    if(e.keyCode !== 13) return 
    this.search(keyword,this.data.page)
  }
  onScroll(){
    if(this.data.nomore == 'no results') return window.removeEventListener("scroll",this.onscroll)
    if(pageYOffset + document.documentElement.clientHeight > document.body.scrollHeight - 50){
      //已滚动高度 + 视窗高度 > body的总高度  - 50
      // console.log("触发滚动")
      this.search(this.data.keyword,this.data.page+1)
    }
  }
  search(keyword , page){
    if(keyword=="") return 
    console.log(`searching  ${keyword}的第${page}页`)
    let theSearchUrl = `${SEARCH_URL}?keyword=${keyword}&page=${page}`
    fetch(theSearchUrl)
    .then(res => res.json())
    .then(json => {
      console.log(json)
      this.data.page = json.data.song.curpage
      this.data.keyword = json.data.keyword
      this.data.songlist = json.data.song.list
      this.data.nomore = json.message 
      return this.data.songlist
    })
    .then(songs=>  this.render(songs))
  }
  render(songs){
    let html = songs.map(song=>{
      let artist = song.singer.map(s => s.name).join(' ')
      return `
      <a href="#player?artist=${artist}&songmid=${song.songmid}&albummid=${song.albummid}"
      class="song-item">
          <i class="icon-music"></i>
          <div class="song-title">${song.songname}</div>
          <div class="song-artist">${artist}</div>
        </div>
      </a>
      `
    }).join(" ")
    // this.$songlist.insertAdjacentHTML("beforeend",html)
    this.$songlist.innerHTML += html
  }
}
