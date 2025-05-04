let Branding = document.querySelectorAll(".Branding")
let Development = document.querySelectorAll(".Development")
let Design = document.querySelectorAll(".Design")
let Strategy = document.querySelectorAll(".Strategy")

let FilterButtons = document.querySelectorAll(".FilterButtons a")

function showFilter(WorksShow) {
    let WorksGroups = [
        { name: "Branding", elements: Branding },
        { name: "Development", elements: Development },
        { name: "Design", elements: Design },
        { name: "Strategy", elements: Strategy }
    ]

    FilterButtons.forEach(btn => {
        btn.classList.remove("SelectedFilter")
        if (btn.innerText.trim() === WorksShow) {
            btn.classList.add("SelectedFilter")
        }
    })

    if (WorksShow === "All") {
        WorksGroups.forEach(group => {
            group.elements.forEach(el => {
                el.style.display = 'inline-block'
            })
        })
    } else {
        WorksGroups.forEach(group => {
            group.elements.forEach(el => {
                el.style.display = (group.name === WorksShow) ? 'inline-block' : 'none'
            })
        })
    }
}

FilterButtons.forEach(element => {
    element.onclick = event => {
        event.preventDefault()
        let WorksShow = element.innerText.trim()
        localStorage.setItem("selectedWorksFilter", WorksShow)
        showFilter(WorksShow)
    }
})

let savedFilter = localStorage.getItem("selectedWorksFilter")
if (savedFilter) {
    showFilter(savedFilter)
}