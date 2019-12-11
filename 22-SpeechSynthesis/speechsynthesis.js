const msg = new SpeechSynthesisUtterance();
let voices = [];
const voiceType = document.querySelector('[name="voices"]');
const modifier = document.querySelectorAll('[type="range"], [name="text"]');
const speakBtn = document.querySelector('.button-speak');
const stopBtn = document.querySelector('.button-stop');
console.log(modifier);
msg.text = document.querySelector('[name="text"]').value;

function populateVoices() {
  voices = this.getVoices();
  voiceType.innerHTML = voices.map(voice => `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`)
  .join('');
  
}

function setVoice () {
  msg.voice = voices.find(voice=> voice.name === this.value);
  toggle();
}

function toggle(startOver = true) {
  speechSynthesis.cancel();
  if (startOver) {
    speechSynthesis.speak(msg);
  }
}

function modifiedSpeech() {
  msg[this.name] = this.value;
  if(this.name === 'rate' || this.name==='pitch') toggle();
}

speechSynthesis.addEventListener('voiceschanged', populateVoices);
voiceType.addEventListener('change', setVoice);
modifier.forEach(option => option.addEventListener('change', modifiedSpeech));
speakBtn.addEventListener('click', toggle);
stopBtn.addEventListener('click', toggle.bind(null, false)); 