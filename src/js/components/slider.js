class Slider {
    constructor(sliderInterval) {
        this.sliderInterval = sliderInterval;
        this.currentIndex = 0;
        this.MaxCardWidth = 420;
        this.ResizeByGap = true;
        this.MaxCardDistance = 200;
    }

    init(sliderSelector, slideSelector) {
        this.slider = document.querySelector(sliderSelector); //slider is parent of all cards
        this.slides = Array.from(document.querySelectorAll(slideSelector)); //cards that move around
        let SliderHeight = this.slider.getBoundingClientRect().height + 30
        this.sliderCardDistance = 140

        this.slides.forEach(element => {
            element.style.position = "absolute"
        });

        this.setLayout();
        this.setSlidePositionRight();
        this.runShift();
        window.onresize = this.setLayout.bind(this);
        
        this.slider.style.minHeight = SliderHeight + "px"
    }
    
    setSlidePosition() {
        this.slides.forEach((slide, index) => {
            slide.style.left = (index - 1) * (this.cardWidth + this.sliderCardDistance) + "rem"
        })
    }
    setSlidePositionRight() {
        this.slides.forEach((slide, index) => {
            slide.style.left = (index) * (this.cardWidth + this.sliderCardDistance) + "rem"
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
            this.slideCards()
        }, this.sliderInterval)
    }
    runShiftRight() {
        this.timer = setInterval(() => {
            this.slideCardsRight()
        }, this.sliderInterval)
    }

    stopShift() {
        clearInterval(this.timer);
    }

    trigger() {
        //triger
    }

    slide3cards() {
        //render 3 phantom cards at once and move them
    }

    slideCards() { //make phantom slide
        let PhantomSlide = this.slides[0].cloneNode(true)
        PhantomSlide.style.left = this.slider.getBoundingClientRect().width + this.sliderCardDistance + "rem"
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
        PhantomSlide.style.left = this.slider.getBoundingClientRect().width + this.sliderCardDistance + "rem"
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

    setLeftButton(leftButton) {
        this.leftButton = document.querySelector(leftButton)
        this.leftButton.onclick = () => {
            this.slideLeft(1);
            console.log("left arrow")
        };
    }
    
    setRightButton(rightButton) {
        this.rightButton = document.querySelector(rightButton)
        this.rightButton.onclick = () => {
            this.slideRight(1);
            console.log("right arrow")
        };
    }


    slideLeft(ShiftNumber) {
        this.stopShift()
        for (let i = 0; i < ShiftNumber; i++) {
            setTimeout(() => {
                this.slideCards(ShiftNumber)
            }, 110 * i);
        }
        if (!this.isclicked) {
            setTimeout(() => {
                this.runShift()
                this.isclicked = false
            }, this.sliderInterval);
        }
        this.isclicked = true
    }
    
    slideRight(ShiftNumber) {
        this.stopShift();
        for (let i = 0; i < ShiftNumber; i++) { //slide crads right ()
            setTimeout(() => {
                this.slideCardsRight();
            }, 110 * i);
        }
        if (!this.isclicked) {
            setTimeout(() => {
                this.runShiftRight()
                this.isclicked = false
            }, this.sliderInterval);
        }
        this.isclicked = true
    }

    isclicked = false
}

class BrandSlider extends Slider {
    constructor(setTime) {
        super(setTime)
    }

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
        this.dotElement[this.activeDot].classList.add("activeDot")
        this.activeDot = (this.activeDot == this.dotElement.length-1)?0:++this.activeDot
        
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
mySLider.init(".AboutPhotos", ".AboutPhotosPeopleBlocks");


let myBrandSlider = new BrandSlider(3000);
myBrandSlider.init(".Partners-images",".Partners-images img");
myBrandSlider.setDots(".dot-selection")



let quotes = [
    {
        person: "Steve Jobs",
        text: "Your work is a large part of your life, and the only way to be truly satisfied is to use creative tools that reflect your vision. This creative agency template company redefines what it means to build great projects. If you haven’t found the right way to express your ideas yet, keep exploring. Don’t settle for less—this is the solution to bring your work to life."
    },{
        person: "Jeff Bezos",
        text: "A brand for a company is like a reputation for a person. This creative agency template platform helps you establish a strong brand by giving you tools to create with precision and quality. It's what clients remember when you're not in the room and what they trust to deliver professional results time and again."
    },{
        person: "Sergey Brin",
        text: "We strive to define what it means to be a force for good—always choosing the ethical path. This creative agency template company lives by this principle, providing solutions that enable businesses to create stunning and ethical designs. It's not just about templates; it's about empowering creativity in a way that truly makes a difference."
    },{
        person: "Indra Nooyi",
        text: "Never assume you've arrived. Even as a top creative, you must keep refining your approach. This creative agency template company is designed for leaders who are constantly evolving. It offers a fresh perspective, allowing you to challenge your creative thinking and stay ahead in an ever-changing market."
    },{
        person: "Richard Branson",
        text: "Branding is about commitment—reinventing continuously, connecting emotionally with clients, and fostering imagination. This creative agency template company isn’t just about templates; it’s about creating experiences that resonate. Their offerings inspire belief, persistence, and the courage to craft something truly meaningful."
    },{
        person: "Григорій Сковорода",
        text: "Всякому місту свій нрав і права. Кожен проект має свій стиль і характер. Ця компанія шаблонів для креативних агентств дозволяє поєднати унікальність і професіоналізм, щоб кожен проект був витвором мистецтва."
    },{
        person: "Тарас Шевченко",
        text: "Садок вишневий коло хати, вечірня зіронька стає. А ці шаблони для креативних агентств, як зорі вечірні, додають краси кожному проекту. Вони допомагають створювати ідеї, які захоплюють і надихають."
    },{
        person: "Леся Українка",
        text: "Ні, я хочу крізь сльози сміятись, серед лиха співати пісні. Ця компанія шаблонів для креативних агентств дає змогу творити, незважаючи на будь-які труднощі. Це натхнення, стиль і потужний поштовх до нових вершин."
    },{
        person: "Володимир Зеленський",
        text: "Вийди отсюда робійник! Але якщо створюєш креативні проекти, зайди і скористайся цими шаблонами для агентств. Вони зручні, красиві, і допоможуть виглядати професійно. Це шлях до ідеальних презентацій і результатів!"
    }
]

myBrandSlider.setQuote(quotes)