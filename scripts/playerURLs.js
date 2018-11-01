import { LYRICS_URL, SEARCH_URL } from './constants.js'

export function songUrl(songmid) {
  return `http://ws.stream.qqmusic.qq.com/C100${songmid}.m4a?fromtag=0&guid=126548448`
  //let songUrl = `http://ws.stream.qqmusic.qq.com/C100${songmid}.m4a?fromtag=0&guid=126548448`
  //url里是songid 播放用的是songmid
}

export function lyricsUrl(songid) {
  return `${LYRICS_URL}?id=${songid}`
}

export function albumCoverUrl(id) {
  return `https://y.gtimg.cn/music/photo_new/T002R150x150M000${id}.jpg`
}

export function searchUrl(keyword, page = 1) {
  return `${SEARCH_URL}?keyword=${keyword}&page=${page}`
}