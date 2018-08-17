import Swiper from "swiper"



export default class Slider{
  constructor(options){
    this.$el = options.el
    this.slides = options.slides
    // this.interval = options.interval || 3000  //轮播间隔时间，如果没有传进参数默认设置为3s
    // this.index = 0
    this.render()
    // this.start()
  }


  render(){
    this.$el.innerHTML = `<div class="swiper-wrapper"></div><div class="swiper-pagination"></div>`
    this.$group = this.$el.firstElementChild
    
    this.$group.innerHTML = this.slides.map(slide =>
      `
      <div class="swiper-slide">
        <a href="${slide.link}">
          <img src="${slide.imgUrl}"/>
        </a>
      </div>
      `).join('')
      //不加join会在标签之间多出,
    this.swiperInit()
    
  }

  //Swiper初始化时要获取slide数量，所以要在数据生成DOM初始化
  swiperInit(){
    var mySwiper = new Swiper ('.swiper-container', {
      // direction: 'vertical',
      autoplay:true,
      loop: true,
      touchRatio : 0.5,
      pagination: {
        el: '.swiper-pagination',
      }
    })
  }


  // start(){
  //   setInterval(this.goNext.bind(this),this.interval)
  // }
  // goNext(){
  //   this.index += 1
  //   if(this.index = this.slides.length){
  //     this.$group.style.transform = "translate(0)"
  //     this.index = 0
  //     return 
  //   }
  //   this.group.style.transform = `translate(-${this.index/this.slides.length})`
  // }
}