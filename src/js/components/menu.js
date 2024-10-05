let headerLinksMenu = document.querySelector('.HeaderLinksMenu')
let headerLinks = document.querySelector('.HeaderLinks')
let headerLinksA = document.querySelectorAll('.HeaderLinksA')
let header = document.querySelector('header')
let headerBlockHeight = 1300
let lastScrollTop = 0

window.addEventListener('wheel', function(event) {
    let scrollTop = window.scrollY
    let ScrolDY = event.deltaY

    header.classList.remove("reveal")

    if (ScrolDY < 0) {
        headerLinks.style.marginTop = '0'
    } else {
        headerLinks.style.marginTop = '-200px'
    }
    
    if (scrollTop < headerBlockHeight) {
        headerLinks.style.backgroundColor = 'rgba(192, 48, 28, 0)'
    } else {
        headerLinks.style.backgroundColor = 'rgba(192, 48, 28, 0.95)'
        headerLinks.style.color = '#fff'
        headerLinksA.forEach(function(link) {
            link.style.color = '#fff'
        })
    }

    lastScrollTop = scrollTop
})

let HamburgerBtn = document.querySelector(".hamburger")
let HamClose = document.getElementById("HamClose")

HamburgerBtn.onclick = () => {
    let HamLinks = document.querySelector(".HamLinks")
    HamLinks.style.width = "100%"
}

HamClose.onclick = () => {
    HamLinks.style.width = "0"
}