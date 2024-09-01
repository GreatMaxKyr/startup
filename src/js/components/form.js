let SendMessage = document.querySelector(".SendMessage")
let InputsTextarea = document.querySelector(".InputsTextarea")
let inputsFeed = document.querySelectorAll(".InputsBlock input")
let InputPopup = document.querySelectorAll(".InputPopup")
let InputClose = document.querySelectorAll(".InputClose")

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
    InputPopup.style.display = "block"
    body.style.overflowY = 'hidden'
}

InputClose.onclick = () => {
    InputPopup.style.display = "none"
}