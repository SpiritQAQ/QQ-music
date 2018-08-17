import {RECOMMEND_URL} from "./constants.js"
export class Recommand{
  constructor(el){
    this.$el = el
  }


  launch(){
    fetch(RECOMMEND_URL)
      .then(res=>json())
      .then(json => this.json = json)
      .then(()=>this.render())
    return this
  }


  render(){
    
  }

}


let slider =  new Slider({
  el : document.querySelector('#rec-slider'),
  slides:[ //data
    {link:"1",imgUrl:"1"}

  ]
})