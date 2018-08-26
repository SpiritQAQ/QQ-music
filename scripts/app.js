import scss from "../scss/app.scss"
import Recommend from "./recommend.js"
import Toplist from "./toplist"
import Search from "./search"
import "./tab.js"

let recommend = new Recommend(document.querySelector(".rec-wrapper")).launch()
let toplist = new Toplist(document.querySelector(".toplist-wrapper")).launch()
let search = new Search(document.querySelector(".search-wrapper"))