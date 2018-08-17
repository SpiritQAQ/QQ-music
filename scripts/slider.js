class Slider{
  constructor(options){
    this.$el = options.el
    this.slides = options.slides
    this.interval = opitons.interval || 3000  //轮播间隔时间，如果没有传进参数默认设置为3s
    this.index = 0
    this.render()
    this.start()
  }


  render(){
    this.el.innerHTML = `<div class="rec-slider-group"></div>`
    this.$group = this.$el.firstELementChild
    this.$group.style.width = `${this.slides.length*100}%`
    this.$group.innerHTML = this.slides.map(slide =>{
      `
      <div class="rec-slider-item">
        <a href="${slides.link}">
          <img src="${slides.imgUrl}"/>
        </a>
      </div>
      ` 
      // .join('')//不加join
    })
  }


  start(){
    setInterval(this.goNext.band(this),this.interval)
  }
  goNext(){
    this.index += 1
    if(this.index = this.slides.length){
      this.$group.style.transform = "translate(0)"
      this.index = 0
      return 
    }
    this.group.style.transform = `translate(-${this.index/this.slides.length})`
  }
}