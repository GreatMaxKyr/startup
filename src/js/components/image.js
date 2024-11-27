let HeaderImg = document.querySelector(".ImageContainerHeader")
let TouchImg = document.querySelector(".GetInTouch")

let paralax = [HeaderImg,TouchImg]
paralax.forEach((ImageName,index) => {
    ImageName.onmousemove = (e) => {
        let Maxwidth = ImageName.getBoundingClientRect().width
        let Maxheight = ImageName.getBoundingClientRect().height
        ImageName.style.backgroundPositionX = -40*(e.pageX / Maxwidth)  + "px"
        if (index==1) {
            ImageName.style.backgroundPositionY = 20*(e.pageY / Maxheight) + -185 + "px"
        } else {
            ImageName.style.backgroundPositionY = 20*(e.pageY / Maxheight) + -20 + "px"
        }
    }
});