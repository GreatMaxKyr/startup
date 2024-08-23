let headerLinks = document.querySelector('.HeaderLinks')
let headerLinksA = document.querySelectorAll('.HeaderLinksA')
let header = document.querySelector('header')
let headerBlockHeight = 1300
let lastScrollTop = 0

window.addEventListener('wheel', function(event) {
    let scrollTop = window.scrollY
    let ScrolDY = event.deltaY

    if (ScrolDY < 0) {
        headerLinks.style.marginTop = '0'
    } else {
        headerLinks.style.marginTop = '-200px'
    }
    
    // if (scrollTop > lastScrollTop) {
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
    console.log(event.deltaY)
})