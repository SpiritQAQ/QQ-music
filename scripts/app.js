import scss from "../scss/app.scss"
import Recommend from "./recommend.js"
import Toplist from "./toplist"
import "./tab.js"

let recommend = new Recommend(document.querySelector(".rec-wrapper")).launch()
let toplist = new Toplist(document.querySelector(".toplist-wrapper"))