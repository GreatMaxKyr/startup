let SendMessage = document.querySelector(".SendMessage")
let InputsTextarea = document.querySelector(".InputsTextarea")
let inputsFeed = document.querySelectorAll(".InputsBlock input")
let InputPopup = document.querySelector(".InputPopup")
let InputClose = document.querySelector(".InputClose")

inputsFeed.forEach(input => {
    if (localStorage.getItem(input.name) != null) {
        input.value = localStorage.getItem(input.name)    
        InputsTextarea.value = localStorage.getItem(InputsTextarea.name)    
    }
})

SendMessage.onclick = () => {
    localStorage.message = InputsTextarea.ariaValueMax
    inputsFeed.forEach(input => {
        if (input.type != "submit") {
            localStorage.setItem(input.name, input.value)
        }
        localStorage.setItem(InputsTextarea.name, InputsTextarea.value)
    });
    InputPopup.style.display = 'block'
    body.style.overflowY = 'hidden'
    InputPopup.style.backdropFilter = 'blur(5px)'
}

InputClose.onclick = () => {
    InputPopup.style.display = 'none'
    body.style.overflowY = 'auto'
}