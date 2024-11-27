class Slider {
    constructor(sliderInterval) {
        this.sliderInterval = sliderInterval;
        this.currentIndex = 0;
        this.MaxCardWidth = 420;
        this.ResizeByGap = false;
        this.MaxCardDistance = 20;
    }

    init(sliderSelector, slideSelector) {
        this.slider = document.querySelector(sliderSelector);
        this.slides = Array.from(document.querySelectorAll(slideSelector));
        let SliderHeight = this.slider.getBoundingClientRect().height + 30
        this.sliderCardDistance = 140

        this.slides.forEach(element => {
            element.style.position = "absolute"
        });

        this.setLayout();
        this.runShift();
        window.onresize = this.setLayout.bind(this);

        this.slider.style.minHeight = SliderHeight + "px"
    }

    setLayout() {
        this.cardWidth = this.slides[0].getBoundingClientRect().width;
        this.sliderWidth = this.slider.getBoundingClientRect().width;
        this.visibleCardsCount = Math.floor(this.sliderWidth / (this.cardWidth + 10));
        // this.slider.style.height = getComputedStyle(this.slides[0]).scrollHeight;
        // this.slider.style.height = this.slider.scrollHeight;
        
        if (this.visibleCardsCount > 1) {
            if (this.sliderWidth > this.cardWidth * this.slides.length) {
                // this.sliderWidth - (this.cardWidth * this.slides.length) 
                if (this.ResizeByGap) {
                   this.sliderCardDistance = (this.sliderWidth - (this.cardWidth * this.visibleCardsCount)) / (this.visibleCardsCount - 1)
                } else {
                    this.sliderCardDistance = this.MaxCardDistance
                    this.slides.forEach(element => {
                        this.cardWidth = (this.sliderWidth - this.MaxCardDistance*(this.visibleCardsCount - 1))/this.visibleCardsCount
                        element.style.width = this.cardWidth +"px"
                    });
                }
            } else {
               this.sliderCardDistance = ((this.sliderWidth - (this.cardWidth * this.visibleCardsCount)) / (this.visibleCardsCount)) 
            }
        }

        // this.slides.forEach((slide, index) => {
        //     slide.style.left = `translateX(${index * (this.cardWidth + 10)}px)`;
        // });
    }

    runShift() {
        this.timer = setInterval(() => {
            this.currentIndex++;
            if (this.currentIndex >= this.slides.length) {
                this.currentIndex = 0;
            }
            this.slideCards();
        }, this.sliderInterval);
    }

    stopShift() {
        clearInterval(this.timer);
    }

    slideCards() {
        let PhantomSlide = this.slides[0].cloneNode(true)
        PhantomSlide.style.left = this.slider.getBoundingClientRect().width + this.sliderCardDistance + "px"
        this.slider.appendChild(PhantomSlide)
        this.slides.push(PhantomSlide)
        
        setTimeout(() => {
            this.slides.forEach((slide, index) => {
                slide.style.left = (index - 1) * (this.cardWidth + this.sliderCardDistance) + "px"
            })
            // let firstSlide = this.slides.shift(); // Remove first
            // firstSlide.style.opacity = 0; 
            // this.slider.appendChild(firstSlide); // Move first to last

            // Recalculate the slides array
            // this.slides = Array.from(document.querySelectorAll(".AboutPhotosPeopleBlocks"));
            
            let DeadSlide = this.slides.shift() //dont delete
            // DeadSlide.style.left = - this.cardWidth - 10 + "px"

            // Fade in
            setTimeout(() => {
                // firstSlide.style.opacity = 1;

                DeadSlide.remove() //dont delete
            }, this.sliderInterval);

            // Reset the current index
            this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
        }, 100);
    }
}

class Carousel extends Slider {
    setLeftButton(leftButton) {
        leftButton.onclick = () => {
            this.slideLeft(3);
        };
    }

    setRightButton(rightButton) {
        rightButton.onclick = () => {
            this.slideRight(3);
        };
    }

    slideLeft(howManySlidesMove) {
        this.currentIndex = (this.currentIndex - howManySlidesMove + this.slides.length) % this.slides.length;
        this.slideCards();
    }

    slideRight(howManySlidesMove) {
        this.currentIndex = (this.currentIndex + howManySlidesMove) % this.slides.length;
        this.slideCards();
    }
}

// Initialize the slider
let mySlider = new Slider(3000);
mySlider.init(".AboutPhotos", ".AboutPhotosPeopleBlocks");