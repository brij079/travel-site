import '../styles/styles.css'
import MobileMenu from './modules/MobileMenu'
import RevealOnScroll from './modules/RevealOnScroll'
import StickeyHeader from './modules/StickyHeader'

new StickeyHeader;
new RevealOnScroll(document.querySelectorAll(".feature-item"), 75);
new RevealOnScroll(document.querySelectorAll(".testimonial"), 60);
new MobileMenu();
let modal

document.querySelectorAll(".open-modal").forEach(el => {
    el.addEventListener("click", e => {
        e.preventDefault()
        if(typeof modal == "undefined"){
            import('./modules/Modal').then((x)=>{
                modal = new x.default()
                setTimeout(()=>{modal.openTheModal()}, 20)
            }).catch(()=>{console.log('error')})
        }else{
            modal.openTheModal()
        }
    })
})

if(module.hot){
    module.hot.accept()
}
