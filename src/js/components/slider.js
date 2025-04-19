class Slider {
    heightProportion = 580 / 338
    // heightProportion = 480 / 338


    constructor(sliderInterval) {
        this.sliderInterval = sliderInterval;
        this.currentIndex = 0;
        // this.MaxCardWidth = 420;
        this.MinCardWidth = 180;
        this.ResizeByGap = false; 
        //Ця функція відповідає за те, як в нас буде змінюватись слайдер при ресайзі
        //якщо false, то ширина карточок фіксована, а відстань змінюється
        //якщо true, то навпаки, ширина карточок змінюється відстань фіксована
        this.MaxCardDistance = 30;
        this.totalCardCount = 0;
    }


    init(sliderSelector, slideSelector) {
        this.slider = document.querySelector(sliderSelector); //slider is parent of all cards //Контейнер
        this.slides = Array.from(document.querySelectorAll(slideSelector)); //cards that move around // Слайди
        this.totalCardCount = this.slides.length; // Скільки іх (карточок) всього в масиві
        this.sliderCardDistance =  40; // Дистанція між картками

        this.defaultCardWidth = this.slides[0].getBoundingClientRect().width
        
        if (this.defaultCardWidth < this.MinCardWidth) this.defaultCardWidth = this.MinCardWidth
        
        this.setLayout(); // Зробити розстановку карточок 

        let SliderHeight = this.slider.getBoundingClientRect().height + 40;


        this.slides.forEach(element => {
            element.style.position = "absolute"
        });
        this.setSlidePositionRight();
        this.runShift();
        
        
        this.slider.style.minHeight = SliderHeight + "px"


        this.slider.ontouchstart = (event) => {
            this.touchX = event.touches[0].pageX
        }
        this.slider.ontouchmove = (event) => {
            this.lasttouchX = event.touches[0].pageX
        }
        this.slider.ontouchend = (event) => {
            if (this.touchX  >= this.lasttouchX) {
                this.slideLeft(1)
            } else {
                this.slideRight(1)
            }
        }
    }

    setDefaultCardWidth(defaultCardWidth){
        this.defaultCardWidth = defaultCardWidth
    }

    setResizeRuleByGap(argument) {
        this.ResizeByGap = argument
    }
    
    setSlidePosition(shiftCount) {
        if (!shiftCount) {
            shiftCount = 1
        }
        this.slides.forEach((slide, index) => {
            slide.style.left = (index - shiftCount) * (this.cardWidth + this.sliderCardDistance) + "px" //check further
        })
    }
    setSlidePositionRight() {
        this.slides.forEach((slide, index) => {
            slide.style.left = (index) * (this.cardWidth + this.sliderCardDistance) + "px"
        })
    }

    setLayout() {
        this.cardWidth = this.defaultCardWidth //get width of a card
        this.sliderWidth = this.slider.getBoundingClientRect().width //get full width of card parent
        
        this.visibleCardsCount = Math.floor(this.sliderWidth / (this.cardWidth + 10)) // how many cards visible

        // console.log(this.visibleCardsCount, "👷visible c")
        // console.log(this.totalCardCount, "😔 totalCardCount")
        
        if (this.visibleCardsCount > 1) { 
            if (this.sliderWidth > (this.cardWidth + 10) * this.slides.length) {  //if they all fit
                if (this.ResizeByGap) {
                   this.sliderCardDistance = (this.sliderWidth - (this.cardWidth * this.visibleCardsCount)) / (this.visibleCardsCount - 1)
                } else { //we use this
                    if (this.totalCardCount <= this.visibleCardsCount) {
                        this.cardWidth = (this.sliderWidth - this.MaxCardDistance * (this.totalCardCount - 1)) / this.totalCardCount //if there are more cards available to fit than max
                    } else {
                        this.cardWidth = (this.sliderWidth - this.MaxCardDistance * (this.visibleCardsCount - 1)) / this.visibleCardsCount
                    }
                    this.sliderCardDistance = this.MaxCardDistance
                }
            } else {
                this.cardWidth = (this.sliderWidth - this.MaxCardDistance * (this.visibleCardsCount - 1)) / this.visibleCardsCount
                // console.log(this.cardWidth, "⚠️cardWidth")        
                // this.sliderCardDistance = ((this.sliderWidth - (this.cardWidth * this.visibleCardsCount)) / (this.visibleCardsCount)) 
            }
        } else { //only one card is visible, fully works dot touch
            this.sliderCardDistance = 50
            this.cardWidth = this.slider.getBoundingClientRect().width
            
            this.slides.forEach(element => {
                element.style.width = this.cardWidth + "px"
            });
        }

        this.slides.forEach(element => {
            element.style.width = this.cardWidth +"px"
            element.style.height = this.cardWidth * this.heightProportion +"px"
        });

        this.slider.style.height = this.cardWidth * this.heightProportion + "px"
    }

    runShift() {
        this.timer = setInterval(() => {
            this.slideCards()
            this.trigger()
        }, this.sliderInterval)
    }
    runShiftRight() {
        this.timer = setInterval(() => {
            this.slideCardsRight()
            this.trigger()
        }, this.sliderInterval)
    }

    stopShift() {
        clearInterval(this.timer);
    }

    trigger() {
        //triger
    }

    slide3cards() {
        let phantomSlides = []
    
        for (let i = 1; i <= 3; i++) {
            let PhantomSlide = this.slides[this.slides.length - i].cloneNode(true)
            PhantomSlide.style.left = `-${(this.cardWidth + this.sliderCardDistance) * i}px`
            this.slider.insertAdjacentElement('afterbegin', PhantomSlide)
            phantomSlides.unshift(PhantomSlide) //push or unshift
        }
    
        this.slides.unshift(...phantomSlides)
    
        setTimeout(() => {
            this.setSlidePositionRight()
    
            for (let i = 0; i < 3; i++) {
                let DeadSlide = this.slides.pop() //shift or pop
                setTimeout(() => {
                    DeadSlide.remove()
                }, this.sliderInterval)
            }
        }, 100)
    }

    slide3cardsleft() {
        let phantomSlides = []
    
        for (let i = 1; i <= 3; i++) {
            let PhantomSlide = this.slides[i - 1].cloneNode(true)
            PhantomSlide.style.left = (this.cardWidth + this.sliderCardDistance) * (3 + i) + "px"
            this.slider.insertAdjacentElement('beforeend', PhantomSlide)
            phantomSlides.push(PhantomSlide) //push or unshift
        }
        
        this.slides.push(...phantomSlides)
        this.slides.sort((a,b)=> a.getBoundingClientRect().left - b.getBoundingClientRect().left)

        setTimeout(() => {
            this.setSlidePosition(3)

            for (let i = 0; i < 3; i++) {
                let DeadSlide = this.slides.shift() //shift or pop
                setTimeout(() => {
                    DeadSlide.remove()
                }, this.sliderInterval)
            }
        }, 100)
    }

    slideCards() { //make phantom slide
        let PhantomSlide = this.slides[0].cloneNode(true)
        PhantomSlide.style.left = this.slider.getBoundingClientRect().width + this.sliderCardDistance + "px"
        this.slider.appendChild(PhantomSlide)
        this.slides.push(PhantomSlide)
        
        setTimeout(() => { //dont touch
            this.setSlidePosition() //move to right position
            let DeadSlide = this.slides.shift() //remove first slide
            setTimeout(() => {
                DeadSlide.remove()
            }, this.sliderInterval)
        }, 100);
    }
    
    slideCardsRight() {
        let PhantomSlide = this.slides[this.slides.length - 1].cloneNode(true)
        PhantomSlide.style.left = `-${(this.cardWidth + this.sliderCardDistance)}px`
        this.slider.insertAdjacentElement('afterbegin', PhantomSlide)
        this.slides.unshift(PhantomSlide)
        
        setTimeout(() => {
            this.setSlidePositionRight()
            let DeadSlide = this.slides.pop()
            setTimeout(() => {
                DeadSlide.remove() 
            }, this.sliderInterval)
        }, 100)
        
    }
}




class Carousel extends Slider {
    isclicked = true

    setLeftButton(leftButton) {
        this.leftButton = document.querySelector(leftButton)
        this.leftButton.onclick = () => {
            if (this.isclicked) {
                this.stopShift()
                this.isclicked = false

                if (this.visibleCardsCount > 2) {
                    this.slide3cardsleft() //+
                } else {
                    this.slideLeft() //+
                }
                
                setTimeout(() => {
                    this.isclicked = true
                    this.runShift()
                }, 650)
            }
        }
    }
    
    setRightButton(rightButton) {
        this.rightButton = document.querySelector(rightButton)
        this.rightButton.onclick = () => {
            if (this.isclicked) {
                this.stopShift()
                this.isclicked = false

                if (this.visibleCardsCount > 2) {
                    this.slide3cards() //+
                } else {
                    this.slideRight() //+
                }
                
                setTimeout(() => {
                    this.isclicked = true
                    this.runShift()
                }, 650)
            }
        }
    }


    // slideLeft(ShiftNumber) {
    //     for (let i = 0; i < ShiftNumber; i++) {
    //         setTimeout(() => {
    //             this.slideCards()
    //         }, 110 * i);
    //     }
    // }

    slideLeft() {
        setTimeout(() => {
            this.slideCards()
        }, 110)
    }
    slideRight() {
        setTimeout(() => {
            this.slideCardsRight();
        }, 110)
    }
}

class BrandSlider extends Slider {
    constructor(setTime) {
        super(setTime)
    }
    heightProportion = 60 / 275
    

    activeDot = 2
    activeQuote  = 2

    setDots(dotElementName) {
        this.dotElement = document.querySelectorAll(dotElementName)
        this.dotElement[this.activeDot].classList.add("activeDot")
    }

    setQuote(quoteContainer) {
        this.quoteContainer = quoteContainer
        this.QuoteText = document.querySelector(".QuoteText")
        this.QuoteAuthor = document.querySelector(".QuoteAuthor")
    }
    
    trigger() {
        this.dotElement[this.activeDot].classList.remove("activeDot")
        this.activeDot = (this.activeDot == this.dotElement.length-1)?0:++this.activeDot
        this.dotElement[this.activeDot].classList.add("activeDot")
        
        this.activeQuote = (this.activeQuote == this.quoteContainer.length-1)?0:++this.activeQuote
        this.QuoteText.innerText = this.quoteContainer[this.activeQuote].text
        this.QuoteAuthor.innerText = this.quoteContainer[this.activeQuote].person
    }
}

// Initialize the slider
// let mySlider = new Slider(5000);
let mySLider = new Carousel(5000);
mySLider.setLeftButton(".slideLeft")
mySLider.setRightButton(".slideRight")
mySLider.setResizeRuleByGap(false)
mySLider.init(".AboutPhotos", ".AboutPhotosPeopleBlocks");



// function screenSize() {
//     if (window.innerWidth <= 1300) {
//     }
// }
let myBrandSlider = new BrandSlider(3000)
myBrandSlider.setDots(".dot-selection")
myBrandSlider.init(".Partners-images",".Partners-images img")



let quotes = [
    {
        person: "Lena Hartley.",
        text: "Startup transformed our online identity with a beautifully crafted template. Their attention to detail and design flexibility made our brand stand out instantly."
    },{
        person: "Damon Kells.",
        text: "Partnering with Startup was a total game changer. Their Creative Agency Template gave our team the professional edge we were missing. Smooth, stunning, and super intuitive."
    },{
        person: "Nina Veroux.",
        text: "Startup’s template is visually brilliant and functionally solid. It gave our messaging clarity and style—exactly what we needed to connect with our audience confidently."
    },{
        person: "Jamal Reeves.",
        text: "The partnership with Startup exceeded expectations. Their Creative Agency Template brought our content to life and gave us a fresh, innovative platform to grow from. "
    },{
        person: "Kiera Solen.",
        text: "The partnership with Startup exceeded expectations. Their Creative Agency Template brought our content to life and gave us a fresh, innovative platform to grow from."
    }
]

myBrandSlider.setQuote(quotes)
window.onresize = () => {
    mySLider.setLayout() 
    mySLider.setSlidePositionRight() 
    myBrandSlider.setLayout()
    myBrandSlider.setSlidePositionRight() 
}