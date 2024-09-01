document.addEventListener("DOMContentLoaded", () => {
  const elements = document.querySelectorAll("div, p, img, section")

  function reveal() {
    const windowHeight = window.innerHeight
    elements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top
      const elementVisible = 200 

      if (elementTop < windowHeight - elementVisible) {
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


//hack
let HackTrigger = document.querySelector(".HackTrigger")

HackTrigger.onclick = (event) => {
  if (event.detail == 3) {
    let ServiceH = document.querySelectorAll(".ServiceH")
    ServiceH.forEach(hackheader => {
      hackheader.style.color = "red"
      hackheader.style.fontSize = "30px"
      hackheader.style.fontWeight = "bold"
      hackheader.innerText = "error"
    });
  }
}


//ReadMore
let PostReadMore = document.querySelectorAll(".PostReadMore")
PostReadMore.forEach(ReadButton => {

  ReadButton.previousElementSibling.innerText += " ..."
  ReadButton.onclick = (action) => {
    action.preventDefault() 
    if (ReadButton.innerText.trim() == "HIDE TEXT") {
        ReadButton.previousElementSibling.innerText = "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod teduntlabore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et erebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit am Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidulabore et dolore aliquyam erat, sed diam ..."
        ReadButton.innerText = "read more"
    }else {
        ReadButton.previousElementSibling.innerText = "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Esse obcaecati animi dolores sequi at! Placeat maiores incidunt optio dolore vitae, cum ad veniam sit repellat aperiam inventore dolorum ex omnis animi labore voluptates cupiditate voluptatem illo. Pariatur dolore distinctio quasi vero dolor repellendus temporibus saepe maiores voluptates. Fugiat commodi, aliquam hic sed nesciunt porro illo corporis culpa perferendis ex placeat odio, accusamus labore dicta perspiciatis consequatur dignissimos voluptatibus architecto natus impedit fuga excepturi? Debitis nihil eveniet, fuga nostrum eos quis, nulla qui obcaecati esse at soluta aut, id amet! Cumque blanditiis reiciendis doloremque obcaecati! Iusto labore ipsum incidunt est natus unde non dolores asperiores magnam voluptatem sit hic sunt nobis in et voluptate, voluptatibus itaque repellat. Possimus quam deleniti vitae sapiente. Eligendi deleniti facilis ipsam blanditiis libero nostrum ab, necessitatibus et provident voluptate inventore in! Beatae cupiditate doloremque eos eligendi earum excepturi nihil voluptas harum. Similique neque, cumque iure aperiam error minima dolores consequuntur iste ex, exercitationem delectus esse rerum fugit nesciunt tempora sunt? Aliquam eveniet odit qui quasi sed adipisci! Deleniti labore alias, nulla dicta, magnam repellat distinctio quibusdam accusamus modi odit, neque quae similique ullam optio dolorem maiores. Architecto neque voluptates velit vitae suscipit ipsa odio sunt distinctio!"
        ReadButton.innerText = "hide text"
    }
  }

});