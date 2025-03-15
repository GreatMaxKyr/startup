let popup = document.querySelector(".popup")
let GetStarteda = document.querySelector(".GetStarteda")
let TgMax, TgMin
let drag, name, password
let circle = document.querySelector(".circle")
let bar = document.querySelector(".bar")
let closeBtn = document.getElementById("close")
let EnterName = document.querySelector(".EnterName")
let EnterPassword = document.querySelector(".EnterPassword")
let WelcomeStartup = document.querySelector(".WelcomeStartup")
let corX, corY


GetStarteda.onclick = () => {
    popup.style.display = 'block'
    body.style.overflowY = 'hidden'
    popup.style.background = 'rgba(0, 0, 0, 0.5)'
    popup.style.backdropFilter = 'blur(5px)'
    popup.style.webkitBackdropFilter = 'blur(5px)'
    TgMax = circle.getBoundingClientRect().left + bar.getBoundingClientRect().width
    TgMin = TgMax - 45
    scrollTo(0,0)

    circle.style.position = "absolute"
}

function stopMove() {
  if (parseFloat(getComputedStyle(circle).left) >= bar.getBoundingClientRect().width * 0.85) {
    document.removeEventListener("mousemove", moveMouse)
    document.removeEventListener("mouseup", stopMove)

    document.removeEventListener("touchmove", moveFinger)
    document.removeEventListener("touchend", stopMove)
    
    drag = "true"
    
    circle.style.right = "1px"
    circle.style.left = "auto"
    
    circle.onmousedown = null
    
    setTimeout(() => {
      popup.style.display = "none"
      body.style.overflowY = "auto"
      if (EnterName.value !== "") {
        WelcomeStartup.innerText = "welcome " + EnterName.value
      }
      
      MessageOutPut.innerText = "Your login was successful! You can countinue on browsing."
      toast.classList.add("text-info-emphasis", "bg-info-subtle", "border", "border-info-subtle")
      toast.style.opacity = "100%"
      
      setTimeout(() => {
        toast.style.opacity = "0"
        toast.classList.remove("text-info-emphasis", "bg-info-subtle", "border", "border-info-subtle")
      }, 20000)
    }, 1000)
  } else {
    document.removeEventListener("mousemove", moveMouse)
    document.removeEventListener("touchmove", moveFinger)

    circle.style.right = "auto"
    circle.style.left = "1px"
    circle.style.transition = "left 0.3s ease-out"
    setTimeout(() => {
      circle.style.transition = "none"
    }, 300);
  }
}

function moveFinger(event) {
  circle.style.left = event.touches[0].clientX - corX + "px"
  if (parseFloat(getComputedStyle(circle).left) >= bar.getBoundingClientRect().width * 0.85) {stopMove()}
  if (parseFloat(getComputedStyle(circle).left) <= -5) {stopMove()}
}

function moveMouse(event) {
  circle.style.left = event.clientX - corX + "px"
  if (parseFloat(getComputedStyle(circle).left) >= bar.getBoundingClientRect().width * 0.85) {stopMove()}
  if (parseFloat(getComputedStyle(circle).left) <= -5) {stopMove()}
}




//listeners
circle.ontouchstart = function(e) {
  if (EnterName.value !== "" && EnterPassword.value !== "") {
    corX = e.touches[0].clientX

    moveFinger(event)
    // stopMove()

    document.addEventListener("touchmove", moveFinger)
    document.addEventListener("touchend", stopMove)
  }
}

circle.onmousedown = function(e) {
  if (EnterName.value !== "" && EnterPassword.value !== "") {
    corX = e.clientX
    
    moveMouse(event)
    stopMove()
    
    document.addEventListener("mousemove", moveMouse)
    document.addEventListener("mouseup", stopMove)
  }
}


closeBtn.onclick = () => {
  popup.style.display = "none"
  body.style.overflowY = 'auto'
  
}


// circle.onmousedown = function(e) {
//   corX = e.clientX
  
//   function move(e) {
//       circle.style.position = "absolute"
//       circle.style.left = e.clientX - corX + "px"

//       if (e.pageX > TgMin && e.pageX < TgMax) {
//         stopMove()
//       }
//   }

//   function stopMove() {
//     document.removeEventListener("mousemove", move)
//     document.removeEventListener("mouseup", stopMove)
  
//     drag = "true"
  
//     circle.style.right = "1px"
//     circle.style.left = "auto"
//     circle.style.top = "0"
  
//     circle.onmousedown = null
  
//     setTimeout(() => {
//       popup.style.display = "none"
//       body.style.overflowY = "auto"
//       if (EnterName.value !== "") {
//         WelcomeStartup.innerText = "welcome " + EnterName.value
//       }
  
//       MessageOutPut.innerText = "Your login was successful! You can countinue on browsing."
//       toast.classList.add("text-info-emphasis", "bg-info-subtle", "border", "border-info-subtle")
//       toast.style.opacity = "100%"
  
//       setTimeout(() => {
//         toast.style.opacity = "0"
//         toast.classList.remove("text-info-emphasis", "bg-info-subtle", "border", "border-info-subtle")
//       }, 20000)
//     }, 1000)
//   }
    
//   document.addEventListener("mousemove", move)
//   document.addEventListener("mouseup", stopMove)
// }
  
// closeBtn.onclick = () => {
//   popup.style.display = "none"
//   body.style.overflowY = 'auto'
  
// }