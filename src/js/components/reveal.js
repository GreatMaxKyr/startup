let RevealAvoid = document.querySelectorAll(".RevealAvoid")

document.addEventListener("DOMContentLoaded", () => {
    const elements = document.querySelectorAll("div, p, img, section")

    function reveal() {
        const windowHeight = window.innerHeight
        elements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top

        if (elementTop < windowHeight - 100) {
            element.classList.add("visible")
        } else {
            element.classList.remove("visible")
        }
        })
    }

    elements.forEach(element => element.classList.add('reveal'))

    window.addEventListener("scroll", reveal)

    reveal()
})  

window.addEventListener('wheel', function(event) {
    let scrollTop = window.scrollY
    let ScrolDY = event.deltaY

    RevealAvoid.forEach(element => {
        element.classList.remove("reveal")
        element.classList.add("visible")
        element.querySelectorAll("*").forEach(child => {
            child.classList.remove("reveal");
            child.classList.add("visible");
        });
    });

    if (ScrolDY < 0) {
        headerLinks.style.marginTop = '0'
    } else if( ScrolDY > 0) {
        headerLinks.style.marginTop = '-200px'
    }
    
    if (scrollTop < HeaderImg.getBoundingClientRect().height) {
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