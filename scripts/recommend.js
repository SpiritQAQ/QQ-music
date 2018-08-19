import {RECOMMEND_URL} from "./constants.js"
import Slider from "./slider.js"
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
    console.log(this.$el)
    this.renderSlider(this.json.data.slider)
    this.renderRadio(this.json.data.radioList)
    this.renderSonglist(this.json.data.songList)
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
          <img src="${radio.picUrl}"/>
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
            <img src="${song.picUrl}" alt=""/>
            <span class="icon icon-play"></span>
          </div>
          <div class="song-title">${song.songListDesc}</div>
          <div class="song-author">${song.songListAuthor}</div>
          
          </div>
      `
    ).join(' ')
  }

}

