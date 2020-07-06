import throttle from 'lodash/throttle'
import debounce from 'lodash/debounce'

class StickeyHeader{
    constructor(){
        this.siteHeader = document.querySelector(".site-header")
        this.pageSections = document.querySelectorAll(".page-section")
        this.prevScrollY = window.scrollY
        this.browerHeight = window.innerHeight;
        this.events()

    }

    events(){
        window.addEventListener("scroll", throttle(() => {
            this.runOnScroll()
        }), 200)
        window.addEventListener("resize", debounce(()=>{
            this.browerHeight = window.innerHeight;
        }, 333))
    }

    runOnScroll() {
        this.DscrollDirection()

        if(window.scrollY > 60){
            this.siteHeader.classList.add("site-header--dark");
        }else{
            this.siteHeader.classList.remove("site-header--dark");

        }

        this.pageSections.forEach(el => this.calcSection(el))
    }
    DscrollDirection(){
        if(window.scrollY > this.prevScrollY){
            this.scrollDirection = 'down'
        }
        else {
            this.scrollDirection = 'up'
        }
        this.prevScrollY = window.scrollY
    }
    calcSection(el){
        if(window.scrollY + this.browerHeight > el.offsetTop && window.scrollY < el.offsetTop + el.offsetHeight){
            let scrollPercent = el.getBoundingClientRect().y / this.browerHeight * 100;
            if(scrollPercent <18 && scrollPercent > -0.1 && this.scrollDirection == 'down' || scrollPercent < 33 && this.scrollDirection == 'up'){
                let matchingLink =el.getAttribute("data-matching-link")
                document.querySelectorAll(`.primary-nav a:not(${matchingLink})`).forEach(el => el.classList.remove("is-current-link"))
                document.querySelector(matchingLink).classList.add("is-current-link")
            }
        }
    }
}

export default StickeyHeader;