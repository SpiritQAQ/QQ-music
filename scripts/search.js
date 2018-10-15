import {SEARCH_URL} from "./constants.js"
export default class search {
  constructor(el) {
    this.$el = el
    this.$input = this.$el.querySelector("#search")
    this.$cancel = this.$el.querySelector(".search-cancel")
    this.$songlist = this.$el.querySelector(".song-list")
    this.$historyList = this.$el.querySelector(".history-list")
    this.$searchInfo = this.$el.querySelector(".search-info")
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
      this.renderHistory()
    })
    this.$cancel.addEventListener("click",()=>{
      this.$cancel.classList.add("hide")
      this.reset()
      console.log(this.$input.value)
      this.$input.value = ""
    }

    )

  }
  onKeyup(e){
    let keyword = e.target.value.trim()
    // if(keyword =="") this.reset()
    if(e.keyCode !== 13) return 
    this.search(keyword,this.data.page)
    this.updateHistory(keyword)
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
      // console.log(json)
      this.data.page = json.data.song.curpage
      this.data.keyword = json.data.keyword
      this.data.songlist = json.data.song.list
      this.data.nomore = json.message 
      return this.data.songlist
    })
    .then(songs=>  this.render(songs))
    console.log(this.data)
    this.$el.querySelector(".search-history").classList.add("hide")
    this.$searchInfo.classList.remove("hide")

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
  updateHistory(keyword){
    let storage = window.localStorage

    if(!storage.history){
      let firstHistory = [keyword]
      storage.setItem("history",JSON.stringify(firstHistory))
      return console.log("第一个历史记录")
    }
    let history = JSON.parse(storage.getItem("history"))
    if(history.includes(keyword)){ //历史中有该关键词
      let idx = history.indexOf(keyword)
      history.splice(idx,1)
      history.unshift(keyword)
    }else{
      if(history.length<7){
        history.unshift(keyword)        
      }else{
        history.pop()
        history.unshift(keyword)        
      }
    } 
    storage.setItem("history",JSON.stringify(history))
    console.log(storage)
    
  }
  renderHistory(){
    let history = JSON.parse(localStorage.getItem("history"))
    this.$el.querySelector(".search-history").classList.remove("hide")
    this.$searchInfo.classList.add("hide")
    let html = history.map(ht=>{
      return `
        <div class="history-item">
          <i class="icon-clock"></i>
          <div class="history-keyword">${ht}</div>
          <i class="icon-close"></i>
        </div>
      `
    }).join(" ")
    this.$historyList.innerHTML = html
    this.bindAboutHistory()
  }
  bindAboutHistory(){
    let keywordBtns = this.$el.querySelectorAll(".history-keyword")
    keywordBtns.forEach((btn)=>{
      btn.addEventListener("click",(e)=>{
        console.log('keyword clicked')
        console.log(e.target)
        this.reset()
        this.search(e.target.innerHTML , 1)

      })
    })
  }

}
