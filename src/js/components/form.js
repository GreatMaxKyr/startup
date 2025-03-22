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

function validateFields() {
    let trig = true

    inputsFeed.forEach(element => {
        let pattern = /^([A-Za-zА-Яа-я0-9 -!]+)$/gi
        if(element.name =="e-mail"){
            pattern = /(\w+)@(\w+)\.(\w+)/gi

            // if (!pattern.test(element.value)){
            //     element.focus();

            //     let errorMessage = document.createElement("p")
            //     errorMessage.classList.add("errortext")
            //     errorMessage.innerText = "Invalid email" 
            //     element.insertAdjacentElement("beforebegin", errorMessage)
            //     element.style.position = "relative"

            //     trig = false
            // } else {
            //     if (element.previousElementSibling) {
            //         element.previousElementSibling.remove()
            //     }
            // }
        }

        if (!pattern.test(element.value)){
            element.focus();

            let errorMessage = document.createElement("p")
            errorMessage.classList.add("errortext")
            element.style.marginTop = "20px"
            errorMessage.innerText = "Invalid " + element.name
            element.insertAdjacentElement("beforebegin", errorMessage)
            element.style.position = "relative"

            trig = false
        } else {
            if (element.previousElementSibling) {
                element.previousElementSibling.remove()
            }
        }

    })

    return trig
}

SendMessage.onclick = (event) => {
    event.preventDefault()
    if (validateFields()) {
        localStorage.message = InputsTextarea.ariaValueMax
        inputsFeed.forEach(input => {
            if (input.type != "submit") {
                localStorage.setItem(input.name, input.value)
            }
            localStorage.setItem(InputsTextarea.name, InputsTextarea.value)
        });

        InputPopup.style.display = 'block'
        body.style.overflowY = 'hidden'
        InputPopup.style.background = 'rgba(0, 0, 0, 0.5)'
        // InputPopup.style.backdropFilter = 'blur(5px)'
        // InputPopup.style.webkitBackdropFilter = 'blur(5px)'
        TouchBlock.scrollIntoView({ behavior: 'smooth', block: 'start' })

        let ConfirmBlock = document.querySelector(".ConfirmBlock")
        ConfirmBlock.innerHTML = ""
        inputsFeed.forEach(element => {
            if (element.type != "submit") {
                let confirmMessage = document.createElement("p")
                confirmMessage.innerHTML = "<strong>your " + element.name + ": </strong>" + element.value
                ConfirmBlock.appendChild(confirmMessage)
            }
        });

        let confirmMessageTextArea = document.createElement("p")

        let ConfirmStrong = document.createElement("strong")
        ConfirmStrong.innerText = "message: "

        let TextAreaSeeMore = document.createElement("a")
        TextAreaSeeMore.innerText = " ... show more"
        TextAreaSeeMore.classList.add("TextAreaSeeMore")
        TextAreaSeeMore.style.textDecoration = "none"
        TextAreaSeeMore.href = "#"

        confirmMessageTextArea.innerText = InputsTextarea.value
        confirmMessageTextArea.insertAdjacentElement("afterbegin", ConfirmStrong)

        if (InputsTextarea.value.length >= 100) {
            confirmMessageTextArea.innerText = InputsTextarea.value.substring(0, 100)
            confirmMessageTextArea.insertAdjacentElement("afterbegin", ConfirmStrong)
            confirmMessageTextArea.insertAdjacentElement("beforeend", TextAreaSeeMore)

            TextAreaSeeMore.setAttribute("isopened", false)
            if (TextAreaSeeMore) {
                TextAreaSeeMore.onclick = function(elem)  {
                    elem.preventDefault()
                    
                    if (TextAreaSeeMore.isopened == false) {
                        confirmMessageTextArea.innerText = InputsTextarea.value.substring(0, 100)
                        TextAreaSeeMore.innerText = " ... show more"
                        TextAreaSeeMore.style.color = "#0D6EFD"
                    } else {
                        confirmMessageTextArea.innerText = InputsTextarea.value
                        TextAreaSeeMore.innerText = " ... hide text"
                        TextAreaSeeMore.style.color = "#c0301c"
                    }

                    confirmMessageTextArea.insertAdjacentElement("afterbegin", ConfirmStrong)
                    confirmMessageTextArea.insertAdjacentElement("beforeend", TextAreaSeeMore)
                    TextAreaSeeMore.isopened = !(TextAreaSeeMore.isopened)
                }
            }
        }
        ConfirmBlock.appendChild(confirmMessageTextArea)
    }
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