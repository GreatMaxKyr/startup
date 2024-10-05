// let slider = document.querySelector(".AboutPhotos")
// let slides = document.querySelectorAll(".AboutPhotosPeopleBlocks")
// slider.style.position = "relative"
// window.onload = () => {slider.style.height = slides[0].getBoundingClientRect().height+200 +"px"}
// let SliderWidth = slider.getBoundingClientRect().width
// console.log(SliderWidth)
// slides.forEach((slide,index) => {
//     slide.style.left = index * 400 +"px"
//     slide.style.position = "absolute"})

// let slideTimer = setInterval(() => {
//     slides = document.querySelectorAll(".AboutPhotosPeopleBlocks")

//     let phantomSlide  = slides[0].cloneNode(true)
//     slider.appendChild(phantomSlide)
//     phantomSlide.style.left = 1600 +"px"

//     let InsidelideTimer = setInterval(() => {
//         slides.forEach((slide,index) => {
//             slide.style.left = index*400 - 500 +"px"
//         })
//         phantomSlide.style.left = "1100px"
//         slides[0].remove()
//     }, 1000)
// }, 10000)   

let slider = document.querySelector(".AboutPhotos");
    let slides = Array.from(document.querySelectorAll(".AboutPhotosPeopleBlocks"));
    let currentIndex = 0;
    let cardWidth;
    let visibleCardsCount;

    // Function to set layout based on container size
    function setCarouselLayout() {
        cardWidth = slides[0].getBoundingClientRect().width;
        let sliderWidth = slider.getBoundingClientRect().width;

        // Calculate how many cards can fit inside the slider based on its width
        visibleCardsCount = Math.floor(sliderWidth / (cardWidth + 10));

        // Set the height of the slider container to match the cards
        slider.style.height = slides[0].getBoundingClientRect().height + "px";

        // Initial positioning of cards
        slides.forEach((slide, index) => {
            slide.style.transform = `translateX(${index * (cardWidth + 10)}px)`;  // 10px for margin
            slide.style.opacity = 1; // Ensure all slides start fully visible
        });
    }

    // Function to move slides with sliding and fade animation
    function slideCards() {
        slides.forEach((slide, index) => {
            // Fade out the first card when it moves out
            if (index === currentIndex) {
                slide.style.opacity = 0;
            }
            // Slide all cards left by one card width
            slide.style.transform = `translateX(${(index - currentIndex) * (cardWidth + 10)}px)`;
        });


        // After the transition, move the first card to the end of the slider
        setTimeout(() => {
            // Move the first card to the end of the slider (seamless effect)
            let firstSlide = slides.shift(); // Remove the first slide from the array
            firstSlide.style.opacity = 0; // Set opacity to 0 for the slide moving to the end (fade-in)

            slider.appendChild(firstSlide); // Append it to the end of the slider

            // Recalculate the slides array
            slides = Array.from(document.querySelectorAll(".AboutPhotosPeopleBlocks"));
            firstSlide.style.transform = `translateX(${(slides.length - 1) * (cardWidth + 10)}px)`; // Move the new last slide to the correct position

            // Fade-in effect for the appended slide
            setTimeout(() => {
                firstSlide.style.opacity = 1; // Gradually fade it back in
            }, 100); // Delay to ensure transition starts smoothly

            // Reset the position to create the seamless transition effect
            currentIndex = (currentIndex - 1 + slides.length) % slides.length; // Keep the index within bounds
        }, 100); // Match this timeout with the animation duration
    }

    // Set initial layout and add resize event listener
    window.onload = () => {
        setCarouselLayout();
    };

    window.onresize = () => {
        setCarouselLayout();
    };

    // Set interval to move cards
    let slideTimer = setInterval(() => {
        currentIndex++;
        if (currentIndex >= slides.length) {
            currentIndex = 0;
        }
        slideCards();
    }, 5000)