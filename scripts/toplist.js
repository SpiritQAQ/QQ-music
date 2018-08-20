import {TOPLIST_URL} from "./constans.js"

export default class toplist{
  constructor(el){
    this.$el = el
  }


  launch(){
    fetch(TOPLIST_URL)
      .then(res => res.json())
      .then(json => this.json =json)
      .then(()=>this.render(this.json))
  }


  render(jsonData){
    console.log(jsonData.data)
  }
}