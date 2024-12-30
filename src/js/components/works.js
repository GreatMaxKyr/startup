let Branding = document.querySelectorAll(".Branding")
let Development = document.querySelectorAll(".Development")
let Design = document.querySelectorAll(".Design")
let Strategy = document.querySelectorAll(".Strategy")

let FilterButtons = document.querySelectorAll(".FilterButtons a")

FilterButtons.forEach(element => {
    element.onclick = (event) => {
        event.preventDefault()

        let WorksShow = element.innerText.trim()

        let WorksGroups = [
            { name: "Branding", elements: Branding },
            { name: "Development", elements: Development },
            { name: "Design", elements: Design },
            { name: "Strategy", elements: Strategy }
        ]

        if (WorksShow === "All") {
            WorksGroups.forEach(group => {
                group.elements.forEach(el => {
                    el.style.display = 'inline-block'
                })
            })
        } else {
            WorksGroups.forEach(group => {
                if (group.name !== WorksShow) {
                    group.elements.forEach(el => {
                        el.style.display = 'none'
                    })
                } else {
                    group.elements.forEach(el => {
                        el.style.display = 'inline-block'
                    })
                }
            })
        }
    }
})