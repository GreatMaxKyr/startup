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
    popup.style.backdropFilter = 'blur(5px)'
    TgMax = circle.getBoundingClientRect().left + bar.getBoundingClientRect().width
    TgMin = TgMax - 45
    scrollTo(0,0)
}

circle.onmousedown = function(e) {
  corX = e.clientX

  function move(e) {
      circle.style.position = "absolute"
      circle.style.left = e.clientX - corX + "px"

      if (e.pageX > TgMin && e.pageX < TgMax) {
          stopMove()
      }
  }

  function stopMove() {
      document.removeEventListener("mousemove", move) 
      document.removeEventListener("mouseup", stopMove) 

      drag = "true"
      
      circle.style.right = "1px"
      circle.style.left = "auto"
      circle.style.top = "0"
      
      circle.onmousedown = null

      setTimeout(() => {
        popup.style.display = "none"
        WelcomeStartup.innerText = "welcome " + EnterName.value
      }, "1000")
      setTimeout(() => {
        alert("login succesfull")
      }, "500")
    }
    
    document.addEventListener("mousemove", move)
    document.addEventListener("mouseup", stopMove)
  }
  
  closeBtn.onclick = () => {
    popup.style.display = "none"
    body.style.overflowY = 'auto'
    
  }
  
  setTimeout(() => {
    if (EnterName.value != "" && EnterPassword.value != "" && drag == true) {
      setTimeout(() => {
      popup.style.display = "none"
    }, "1000")
    setTimeout(() => {
      alert("login succesfull")
    }, "500")
    WelcomeStartup.innerText = "welcome" + EnterName
    }
  }, "3000")

  