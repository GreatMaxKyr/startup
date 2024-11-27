let headerLinksMenu = document.querySelector('.HeaderLinksMenu')
let headerLinks = document.querySelector('.HeaderLinks')
let headerLinksA = document.querySelectorAll('.HeaderLinksA')
let header = document.querySelector('header')
let headerBlockHeight = 1300
let lastScrollTop = 0

let HamburgerBtn = document.querySelector(".hamburger")

let MenuIcon  = '<svg xmlns="http://www.w3.org/2000/svg" width="32" fill="currentColor" class="bi bi-list-ul" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m-3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2m0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2m0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2"/></svg>'
let Xicon  = '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 -960 960 960" fill="#e8eaed"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>'
HamburgerBtn.innerHTML = MenuIcon

HamburgerBtn.onclick = () => {
    
    HamburgerBtn.classList.toggle("BtnClose")
    headerLinksMenu.classList.toggle("show")
    if (headerLinksMenu.classList.contains("show")) {
        HamburgerBtn.innerHTML = Xicon
    }else {
        HamburgerBtn.innerHTML = MenuIcon
    }
}