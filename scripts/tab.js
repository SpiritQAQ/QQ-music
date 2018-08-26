//事件委托
document.addEventListener("click",function(event){
  let target = event.target

  if(target.dataset.role !== "tab")  return

  [].forEach.call(target.parentElement.children, tab =>{
    //[].forEach.call() == Array.prototype.forEach.call()
    tab.classList.remove("tab-active")
  })
  target.classList.add('tab-active')

  let pages = document.querySelector("#content-wrapper").children

  Array.prototype.forEach.call(pages,page =>{
    page.classList.add("hide")
    if(page.dataset.tab == target.dataset.nav){
      page.classList.remove("hide")
    }  
  })

  window.dispatchEvent(new Event('scroll'))
  
})