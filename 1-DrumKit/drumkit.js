//hit specific key
//play sound
//change the corresponding div
//remove it again


//playdrum sound when hit the right keyCode
window.addEventListener('keydown', playsound);

//e parameter is the event on addevent listener;
function playsound(e) {
    //select the HTML element based on the pressed key
    const pressedKey = document.querySelector(`div[data-key="${e.keyCode}"]`);
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);

    //do nothing if not pressed the right key
    if (!audio) return;
    audio.currentTime = 0;
    audio.play();
    pressedKey.classList.add('played'); 
}



const keys = document.querySelectorAll('.key');
function removePlayed(e){
    this.classList.remove('played');
}
keys.forEach(element => element.addEventListener('transitionend', removePlayed));


