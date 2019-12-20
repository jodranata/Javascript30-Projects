const holes = document.querySelectorAll('.hole');
const moles = document.querySelectorAll('.mole');
const scoreBoard = document.querySelector('.score');
const startText = document.querySelector('.start-text');
const gameDiv = document.querySelector('.game');

let score;
let lastHole;
let countdown;

const levelsBtn = document.querySelectorAll('.levels');
const startBtn = document.querySelector('.start-button');
let level;
let timesUp = false;

function setLevels() {
  level = this.dataset.level;
  const levelText = this.textContent;
  startText.textContent = `${levelText} mode`;
  startBtn.classList.add('selected');
  startBtn.disabled = false;
  startBtn.textContent = 'Start!';
}

function randomTime(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function randomHoles(holesDiv) {
  const idx = Math.floor(Math.random() * holes.length);
  const hole = holesDiv[idx];
  if (hole === lastHole) {
    //  console.log('same one');
    return randomHoles(holes);
  }
  lastHole = hole;
  return hole;
}

function popUp(levels) {
  const hole = randomHoles(holes);
  // console.log(hole);
  const difficulty = {
    1: randomTime(300, 1000),
    2: randomTime(200, 550),
    3: randomTime(150, 300),
    4: randomTime(100, 200)
  };

  const time = difficulty[levels];
  hole.classList.add('up');
  if (level === 4) gameDiv.classList.add('hard');
  else gameDiv.classList.remove('hard');
  setTimeout(() => {
    hole.classList.remove('up');
    if (!timesUp) popUp(level);
  }, time);
}

function displayTimes(sec, milli) {
  const seconds = sec;
  const milliseconds = milli;
  const display = `${seconds}.${milliseconds}`;
  startBtn.textContent = display;
}

function countdownTime(seconds) {
  clearInterval(countdown);
  const now = Date.now();
  const then = now + seconds * 1000;
  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    const millisecondsLeft = (then - Date.now()) % 100;
    if (secondsLeft <= 0 && millisecondsLeft <= 0) {
      displayTimes(0, 0);
      clearInterval(countdown);
      return;
    }
    displayTimes(secondsLeft, millisecondsLeft);
  }, 1);
}

function startGame() {
  scoreBoard.textContent = 0;
  timesUp = false; // set timesUp as false when we startGame
  score = 0;
  popUp(level);
  setTimeout(() => {
    //  after 10 second(of clicking startgame), the time is up and the levels button is clickable
    timesUp = true;
    levelsBtn.forEach(btn => {
      const disabled = btn;
      disabled.disabled = false;
    });
  }, 10000);
  setTimeout(() => {
    // after 2 miliseconds of start game, disabled and removed start button, disabled levelsbtn
    // startBtn.classList.remove('selected');
    countdownTime(10);
    startBtn.disabled = true;
    levelsBtn.forEach(btn => {
      const disabled = btn;
      disabled.disabled = true;
    });
  }, 0);
}

function bonk(e) {
  if (!e.isTrusted) return;
  score++;
  this.classList.remove('up');
  scoreBoard.textContent = score;
}

levelsBtn.forEach(btn => btn.addEventListener('click', setLevels));
startBtn.addEventListener('click', startGame);
moles.forEach(mole => mole.addEventListener('click', bonk));
