class Slider {
    constructor(sliderInterval) {
        this.sliderInterval = sliderInterval;
        this.currentIndex = 0;
        this.MaxCardWidth = 420;
        this.ResizeByGap = true;
        this.MaxCardDistance = 200;
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
        this.setSlidePosition()
        this.runShift();
        window.onresize = this.setLayout.bind(this);
        
        this.slider.style.minHeight = SliderHeight + "px"
    }
    
    setSlidePosition() {
        this.slides.forEach((slide, index) => {
            slide.style.left = (index - 1) * (this.cardWidth + this.sliderCardDistance) + "rem"
        })
    }

    setLayout() {
        this.cardWidth = this.slides[0].getBoundingClientRect().width;
        this.sliderWidth = this.slider.getBoundingClientRect().width;
        this.visibleCardsCount = Math.floor(this.sliderWidth / (this.cardWidth + 10));
        
        if (this.visibleCardsCount > 1) {
            if (this.sliderWidth > this.cardWidth * this.slides.length) {
                if (this.ResizeByGap) {
                   this.sliderCardDistance = (this.sliderWidth - (this.cardWidth * this.visibleCardsCount)) / (this.visibleCardsCount - 1)
                } else {
                    this.sliderCardDistance = this.MaxCardDistance
                    this.slides.forEach(element => {
                        this.cardWidth = (this.sliderWidth - this.MaxCardDistance*(this.visibleCardsCount - 1))/this.visibleCardsCount
                        element.style.width = this.cardWidth +"rem"
                    });
                }
            } else {
               this.sliderCardDistance = ((this.sliderWidth - (this.cardWidth * this.visibleCardsCount)) / (this.visibleCardsCount)) 
            }
        }
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

    trigger() {
        //triger
    }

    slideCards() {
        let PhantomSlide = this.slides[0].cloneNode(true)
        PhantomSlide.style.left = this.slider.getBoundingClientRect().width + this.sliderCardDistance + "rem"
        this.slider.appendChild(PhantomSlide)
        this.slides.push(PhantomSlide)
        
        setTimeout(() => { //dont touch
            this.setSlidePosition()
            let DeadSlide = this.slides.shift()
            this.trigger()
            setTimeout(() => {
                DeadSlide.remove() 
            }, this.sliderInterval);

            this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
        }, 100);
    }
}


class Carousel extends Slider {
    constructor(setTime){
        super(setTime)
    }

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

    // slideLeft(howManySlidesMove) {
    //     this.currentIndex = (this.currentIndex - howManySlidesMove + this.slides.length) % this.slides.length;
    //     this.slideCards();
    // }

    // slideRight(howManySlidesMove) {
    //     this.currentIndex = (this.currentIndex + howManySlidesMove) % this.slides.length;
    //     this.slideCards();
    // }
}

class BrandSlider extends Slider {
    constructor(setTime) {
        super(setTime)
    }

    activeDot = 1
    activeQuote  = 1

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
        this.dotElement[this.activeDot].classList.add("activeDot")
        this.activeDot = (this.activeDot == this.dotElement.length-1)?0:++this.activeDot
        
        this.activeQuote = (this.activeQuote == this.quoteContainer.length-1)?0:++this.activeQuote
        this.QuoteText.innerText = this.quoteContainer[this.activeQuote].text
        this.QuoteAuthor.innerText = this.quoteContainer[this.activeQuote].person
    }
}

// Initialize the slider
// let mySlider = new Slider(5000);
let mySLider = new Carousel(3000);
mySLider.init(".AboutPhotos", ".AboutPhotosPeopleBlocks");


let myBrandSlider = new BrandSlider(3000);
myBrandSlider.init(".Partners-images",".Partners-images img");
myBrandSlider.setDots(".dot-selection")

let quotes = [
    {
        person: "Steve Jobs",
        text: "Your work is a large part of your life, and the only way to be truly satisfied is to do what you believe is great work. Love what you do. If you haven't found it yet, keep looking. Don't settle. Follow your heart—you'll know when you find it."
    },{
        person: "Jeff Bezos",
        text: "A brand for a company is like a reputation for a person. You earn reputation by trying to do hard things well. It's what people say about you when you're not in the room, and what they trust you'll deliver, time and again."
    },{
        person: "Sergey Brin",
        text: "We strive to define what it means to be a force for good—always choosing the ethical path. 'Don't be evil' is the simplest summary. This principle guides our innovations and decisions, ensuring technology improves lives while staying true to what's right."
    },{
        person: "Indra Nooyi",
        text: "Never assume you've arrived. Even as CEO, you must keep learning, evolving your thinking, and challenging your approach to the organization. Leadership is not static. It's about continuous growth and adapting to meet ever-changing challenges and opportunities."
    },{
        person: "Richard Branson",
        text: "Branding is about commitment—reinventing continuously, connecting emotionally with people, and fostering imagination. Cynicism is easy; success requires belief, persistence, and the courage to stand for something meaningful in the minds of your customers and the world."
    },{
        person: "Григорій Сковорода",
        text: "Всякому місту свій нрав і права. Всяка іміє свій ум - голова"
    },{
        person: "Тарас Шевченко",
        text: "Садок вишневий коло хати, вечірня зіронька стає"
    },{
        person: "Леся Українка",
        text: "Ні, я хочу крізь сльози сміятись,Серед лиха співати пісні,Без надії таки сподіватись,Жити хочу! Геть, думи сумні"
    },{
        person: "Володимир Зеленський",
        text: "Вийди отсюда робійник"
    }
]

myBrandSlider.setQuote(quotes)