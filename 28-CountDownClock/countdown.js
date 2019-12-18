let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const timerBtn = document.querySelectorAll('.timer__button');
const inputForm = document.querySelector('#custom');



function timer (seconds) {
  clearInterval(countdown);
  const now = Date.now();
  const then = now + seconds * 1000;
  displayTimes(seconds);
  displayEndTime(then);
  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    if (secondsLeft < 0) {
      clearInterval(countdown);
      return;
    } 

    displayTimes(secondsLeft);
  }, 1000);
}

function displayTimes(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainderSeconds = seconds % 60;
  const display = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
  timerDisplay.textContent = display;
  document.title = display;
}

function displayEndTime(timestamp) {
  const end = new Date(timestamp);
  const hours = end.getHours();
  const minutes = end.getMinutes();
  const displayMinutes = `${minutes < 10 ? '0' : ''}${minutes}`;
  endTime.textContent =
  `
  Be back at ${hours}:${displayMinutes} || ${hours > 12 ? hours - 12 : hours}:${displayMinutes} ${hours > 12 ? 'PM' : 'AM'}
  `;
}

function timerStart(e) {
  const seconds = this.dataset.time;
  timer(seconds);
}

function inputStart(e) {
  e.preventDefault();
  const minutes = this.minutes.value;
  if(isNaN(minutes)) return alert('not a number');
  timer(minutes * 60);
  this.reset();
  
}

timerBtn.forEach(btn => btn.addEventListener('click', timerStart));
inputForm.addEventListener('submit', inputStart);


