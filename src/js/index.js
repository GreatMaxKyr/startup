//popup

let popup = document.querySelector(".popup")
let GetStarteda = document.querySelector(".GetStarteda")

GetStarteda.onclick = () => {
    popup.style.display = 'block'
    console.log('click')
}

let circle = document.querySelector(".circle")
let corX
circle.onmousedown = function(e){
  corX = e.pageX - box.getBoundingClientRect().x
  box.addEventListener("mousemove", move)
}

function move(e){
    circle.style.position = "fixed"
    circle.style.left = e.pageX - corX + "px"
}

circle.onmouseup = function (){
  box.removeEventListener("mousemove", move)
}
