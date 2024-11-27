let RevealAvoid = document.querySelectorAll(".RevealAvoid")

window.addEventListener('wheel', function(event) {
    let scrollTop = window.scrollY
    let ScrolDY = event.deltaY

    header.classList.remove("reveal")
    RevealAvoid.forEach(element => {
        element.classList.remove("reveal")
    });

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