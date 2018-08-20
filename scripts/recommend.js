import {RECOMMEND_URL} from "./constants.js"
import Slider from "./slider.js"
import {lazyload} from "./lazyload.js"
export default class Recommend{ 
  constructor(el){
    this.$el = el
  }


  launch(){
    fetch(RECOMMEND_URL)
      .then(res => res.json())
      .then(json => this.json = json)
      .then(()=>this.render())
    return this
  }


  render(){
    this.renderSlider(this.json.data.slider)
    this.renderRadio(this.json.data.radioList)
    this.renderSonglist(this.json.data.songList)
    lazyload()
  }

  renderSlider(slides){
    this.slider = new Slider({
      el : document.querySelector('.swiper-container'),
      slides:slides.map(slide =>({
        link:slide.linkUrl.replace('http://', 'https://'),
        imgUrl: slide.picUrl.replace('http://', 'https://')
      }))
    })
  }
  renderRadio(radios){
    this.$el.querySelector(".radio-container").innerHTML = radios.map(radio =>
      `
      <div class="radio-item">
        <div class="img-box">
          <img data-src="${radio.picUrl}" class="lazyload"/>
          <span class="icon icon-play"></span>
        </div>
        <div class="radio-title">${radio.Ftitle}</div>
      </div>
      `
    ).join(" ")
    
  }
  renderSonglist(songs){
    this.$el.querySelector(".songlist-container").innerHTML = songs.map(song =>
      `
        <div class="songlist-item">
          <div class="img-box">
            <img data-src="${song.picUrl}" class="lazyload" />
            <div class="listen-count">
            <i class="icon icon-listen"></i>
              ${this.getNum(song.accessnum)}
            </div>
            <span class="icon icon-play"></span>
          </div>
          <div class="song-title">${song.songListDesc}</div>
          <div class="song-author">${song.songListAuthor}</div>
          
          </div>
      `
    ).join(' ')
  }
  getNum(num){
    num = num > 9999 ? (Math.floor(num/1000)/10) + '万' : num
    return num
  }

}

