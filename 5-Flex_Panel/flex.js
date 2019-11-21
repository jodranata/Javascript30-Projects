const panels = document.querySelectorAll('.panels');

function toggleOpen() {
    this.classList.toggle('open');
}
function toggleWord(event){
    if(event.propertyName.includes('flex-grow')) {
        this.classList.toggle('open-active');
    }
}
panels.forEach(element => element.addEventListener('click', toggleOpen));
panels.forEach(element => element.addEventListener('transitionend', toggleWord));