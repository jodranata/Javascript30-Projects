// let [inputSpacing, inputBlur, inputColor] = document.querySelectorAll('.actions input');

let inputs = document.querySelectorAll('.actions input');
let imgContainer_div = document.getElementById('img-container');

function changeCSS() {
    let unit = this.dataset.sizing || '';
    let value = this.value;
    let cssVar = this.name;
    document.documentElement.style.setProperty(`--${cssVar}`, value+unit);
}

inputs.forEach(element => element.addEventListener('change',changeCSS));
inputs.forEach(element => element.addEventListener('mousemove',changeCSS));




// function changeSpacing() {
//     let spacingValue = inputSpacing.value;
//     imgContainer_div.style.padding = `${spacingValue}px`;
// }

// function changeBlur() {
//     let blurValue = inputBlur.value;
//     imgContainer_div.style.filter = `blur(${blurValue}px)`;
    
// }

// function changeColor() {
//     let colorValue = inputColor.value;
//     imgContainer_div.style.backgroundColor = colorValue;
    
// }

// // inputSpacing.addEventListener('change', changeSpacing);
// inputSpacing.addEventListener('mousemove', changeSpacing);
// inputBlur.addEventListener('mousemove', changeBlur);
// inputColor.addEventListener('change', changeColor);