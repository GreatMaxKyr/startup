let SendMessage = document.querySelector(".SendMessage")
let InputsTextarea = document.querySelector(".InputsTextarea")
let inputsFeed = document.querySelectorAll(".InputsBlock input")
let InputPopup = document.querySelector(".InputPopup")
let popupContent = document.querySelector(".popup-content")
let InputClose = document.querySelector(".InputClose")
let EmailSendConfirm = document.getElementById("emailsendconfirm")

let TouchBlock = document.querySelector(".Touch")

let toast = document.querySelector('.toast-container')
let MessageOutPut = document.querySelector('.MessageOutPut')

inputsFeed.forEach(input => {
    if (localStorage.getItem(input.name) != null) {
        input.value = localStorage.getItem(input.name)    
        InputsTextarea.value = localStorage.getItem(InputsTextarea.name)    
    }
})

SendMessage.onclick = (event) => {
    event.preventDefault()
    localStorage.message = InputsTextarea.ariaValueMax
    inputsFeed.forEach(input => {
        if (input.type != "submit") {
            localStorage.setItem(input.name, input.value)
        }
        localStorage.setItem(InputsTextarea.name, InputsTextarea.value)
    });
    InputPopup.style.display = 'block'
    body.style.overflowY = 'hidden'
    InputPopup.style.background = 'rgba(0, 0, 0, 0.3)'
    InputPopup.style.backdropFilter = 'blur(5px)'
    InputPopup.style.webkitBackdropFilter = 'blur(5px)'
    TouchBlock.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

document.querySelector(".DoYouGetInTouch").onclick = () => {
    TouchBlock.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

InputClose.onclick = () => {
    InputPopup.style.display = 'none'
    body.style.overflowY = 'auto'
}



EmailSendConfirm.onclick = (e) => {
    
    e.preventDefault()

    const url = "http://localhost" 
    let xhr = new XMLHttpRequest()  
    xhr.open("post", url, true)
    // xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded")
    xhr.responseType = "multipart/form-data"
    xhr.onreadystatechange = function(){
        if (xhr.readyState !== 4) return
        
        if (xhr.status !== 200) {
            MessageOutPut.innerText = "We have faced an error while sending your message, please try again later."
            toast.classList.add("text-danger-emphasis","bg-danger-subtle","border","border-danger-subtle")
        }
        else {
            MessageOutPut.innerText = "Your message has been succesfully sent!"
            toast.classList.add("text-info-emphasis","bg-info-subtle","border","border-info-subtle")
            console.log(xhr.response);
        }        
    }


    let data = new FormData(),
    inputs = inputsFeed 

    inputs.forEach(input => {
        data.append(input.name, input.value)
    })
    data.append("message", InputsTextarea.value)

    toast.style.opacity = "100%"
    setTimeout(() => {
        toast.style.opacity = "100%"
        setTimeout(() => {
            toast.style.opacity = "0"
            toast.classList.remove("text-danger-emphasis","bg-danger-subtle","text-info-emphasis","bg-info-subtle","border")
        }, 100);
    }, 9000);
        
    xhr.send(data)
    InputPopup.style.display = 'none'
    body.style.overflowY = 'auto'
}