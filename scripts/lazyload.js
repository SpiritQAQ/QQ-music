export function lazyload(){
  let imgs = Array.from(document.querySelectorAll(".lazyload"))//创建一个新的数组实例。
  // let imgs = [].slice.call(images)


  //因为监听scroll事件触发lazyload会非常频繁的触发影响性能，用节流方法优化,加一个触发的间隔
  //模仿underscore.js
  function throttle(func,wait){ //掐
    let prev , timer
    return function fn(){
      let curr = new Date()
      let diff = curr - prev
      if(!prev|| diff>wait){
        func()
        prev = curr
      }else if(diff <wait){
        clearTimeout(timer)
        timer = setTimeout(fn, wait-diff);
      }
    }
  } 


  let onScroll = throttle(function(){
    if(imgs.length===0){
      return window.removeEventListener('scroll', onScroll)
    }
    imgs.forEach(img =>{
      inViewport(img)&&loadImage(img)
    })},300) //300ms触发一次

    window.addEventListener('scroll',onScroll)
    window.dispatchEvent(new Event('scroll'))  //触发一次scroll事件
    // onScroll()
  

  function inViewport(img){
    let { top ,left, right ,bottom} = img.getBoundingClientRect()
    let vpWidth = document.documentElement.clientWidth
    let vpHeight = document.documentElement.clientHeight
    return (
      (top > 0 && top < vpHeight||bottom >0 && bottom <vpHeight)&&
      (left> 0 && left< vpWidth||right >0 && right< vpWidth)
    )
  }

  function loadImage(img){
    let image = new Image()
    image.src = img.dataset.src
    image.onload = function(){
      img.src = image.src 
      img.classList.remove('lazyload')
    }
  }
}