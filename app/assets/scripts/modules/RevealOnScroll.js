import throttle from 'lodash/throttle'
import debounce from 'lodash/debounce'

class RevealOnScroll {
    constructor(els, threshHoldPrcnt) {
        this.threshHoldPrcnt = threshHoldPrcnt
        this.itemsToReveal = els
        this.browerHeight = window.innerHeight;
        this.hideInitially()
        this.scrollThrottle = throttle(this.calcCaller, 200).bind(this)
        this.events()
    }
    events(){
        window.addEventListener("scroll", this.scrollThrottle)
        window.addEventListener("resize", debounce(()=>{
            console.log("height");
            this.browerHeight = window.innerHeight;
        }, 333))
    }
    calcCaller(){
        this.itemsToReveal.forEach( el =>{
            if(el.isRevealed == false){
                this.ifScrollTo(el)
            }
        })
    }
    ifScrollTo(el){
        if(window.scrollY + this.browerHeight > el.offsetTop){
            console.log("started")
        let scrollPercent = el.getBoundingClientRect().top
        scrollPercent = (scrollPercent / this.browerHeight) *100
        if(scrollPercent < this.threshHoldPrcnt) {
            el.classList.add("reveal-item--is-visible")
            el.isRevealed = true;
            if(el.isLastItem) {
                window.removeEventListener("scroll", this.scrollThrottle);
            }
        }
        }
    }

    hideInitially(){
        this.itemsToReveal.forEach((el)=>{
            el.classList.add("reveal-item")
            el.isRevealed =false;
        })
        this.itemsToReveal[this.itemsToReveal.length - 1].isLastItem =true
    }
}

export default RevealOnScroll;