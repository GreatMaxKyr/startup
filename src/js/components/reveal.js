let RevealMe = document.querySelectorAll(".RevealMe")
let lastScrollTop = 100

let headerLinks = document.querySelector(".HeaderLinks")
let headerLinksA = document.querySelectorAll(".HeaderLinksA")
let HeaderImage = document.querySelector("header")


// elements.forEach(object => {
    //     object.style.opacity = '0.33'
    //     object.style.filter = 'blur(5px)'
    // })
    
window.addEventListener('scroll', function(event) {
    const elements = document.querySelectorAll('.RevealMe')
    let scrollTop = window.scrollY
    const windowHeight = window.innerHeight
    
    elements.forEach(e => {
        const elementTop = e.getBoundingClientRect().top
        if (elementTop < windowHeight * 0.8) {
            e.classList.add("Revealed")
            
            setTimeout(() => {
                e.classList.remove("RevealMe")
                e.classList.remove("Revealed")
            }, 1000)

            // console.log("Revealing ", e) 
        }
    })

    if (lastScrollTop > scrollTop) {
        headerLinks.style.marginTop = '0'
    } else {
        headerLinks.style.marginTop = '-200px'
    }
    
    if (scrollTop < HeaderImage.getBoundingClientRect().height) {
        headerLinks.style.backgroundColor = 'rgba(192, 48, 28, 0)'
    } else {
        headerLinks.style.backgroundColor = 'rgba(192, 48, 28, 0.95)'
        headerLinks.style.color = '#fff'
        headerLinksA.forEach(function(link) { //make this a style
            link.style.color = '#fff'
        })
    }

    lastScrollTop = scrollTop
})