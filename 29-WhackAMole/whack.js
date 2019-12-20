const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
let lastHole;
let timesUp = false;
let score = 0;

function randomTime(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function randomHoles(holes) {
  const idx = Math.floor(Math.random() * holes.length);
  const hole = holes[idx];
  if (hole === lastHole) {
    console.log('same one');
    return randomHoles(holes);
  }
  lastHole = hole;
  return hole;
}

function popUp() {
  const time = randomTime(350, 1000);
  const hole = randomHoles(holes);
  hole.classList.add('up');
  setTimeout(() => {
    hole.classList.remove('up');
    if (!timesUp) popUp();
  }, time);
}

function startGame() {
  scoreBoard.textContent = 0;
  timesUp = false;
  score = 0;
  popUp();
  setTimeout(() => timesUp = true, 10000);
}

function bonk(e) {
  if (!e.isTrusted) return;
  score++;
  this.classList.remove('up');
  scoreBoard.textContent = score;
}

moles.forEach(mole => mole.addEventListener('click', bonk));