const formCheck = document.querySelector('.check-form');
const inputCheck = Array.from(document.querySelectorAll('.check-input'));

//if we hold shift and checked one of the input all of the input value is true
let prevClicked;
function checkedAll(e){
    let inBetween = false;
    if (e.shiftKey && this.checked) {
       return inputCheck.forEach(input => {
        
        if (input === this || input === prevClicked) {  
            inBetween = !inBetween;
           }
           if (inBetween|| this === inputCheck[inputCheck.length-1]) {
               input.checked = true;
           }
       });
    }
    prevClicked = this;
}



inputCheck.forEach(input => input.addEventListener('click', checkedAll));






// inputCheck.forEach(element => {
//     let action = window.addEventListener('keydown', (key) => key.key);
//     if (action !== 'Shift') return;
//     element.addEventListener('click', allchecked);
// });



