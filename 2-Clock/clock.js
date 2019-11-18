//  transform deg of the clockHand by min,sec,hour
//  need to select the hoursHand, minutesHand, secondsHand
//  using date method to get the date;
//  using getHour, min and secod to get the actual time

const [hoursHand, minutesHand, secondsHand] = document.querySelectorAll(
  '.clockHand'
);

function setDegree(hands, ratio) {
  hands.style.setProperty('--rotation', ratio * 360);
}

function getActualTime() {
  const date = new Date();
  const seconds = date.getSeconds() / 60;
  const minutes = (seconds + date.getMinutes()) / 60;
  const hours = (minutes + date.getHours()) / 12;
  setDegree(secondsHand, seconds);
  setDegree(minutesHand, minutes);
  setDegree(hoursHand, hours);
}

setInterval(getActualTime, 1000);
getActualTime();
