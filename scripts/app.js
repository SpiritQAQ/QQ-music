import scss from "../scss/app.scss"
import Recommend from "./recommend.js"
import "./tab.js"

let recommend = new Recommend(document.querySelector(".rec-wrapper")).launch()
