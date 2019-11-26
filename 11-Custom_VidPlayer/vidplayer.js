const playerContainer = document.querySelector('.player-container');
const btnPlay = playerContainer.querySelector('#toggle-play');
const btnSkips = playerContainer.querySelectorAll('[data-skip]');
const playerSlider = playerContainer.querySelectorAll('.player-slider');
const videoPlayer = playerContainer.querySelector('video');
const timeBar = playerContainer.querySelector('.player-timebar');
const timeBarFilled = playerContainer.querySelector('.timebar-filled');
console.log(playerSlider);


//toggle play/pause, if pause === true, 'play', if play, then pause 
function togglePlay() {
    let event = videoPlayer.paused ? 'play' : 'pause';
    videoPlayer[event]();
}

function changeIcon(){
    let icon = this.paused ? '►' : '▌▌';
    btnPlay.innerHTML = icon;    
}

//skip backward or skip forward depending on the data key;
function skipVideo() {
    let skipTime = parseFloat(this.dataset.skip); 
    videoPlayer.currentTime += skipTime;
}

//click + hold to change the volume and playbackrate
function changeVolRate() {
    let attri = this.name;
    videoPlayer[attri] = this.value;
}

function updateTimeBar() {
    const videoProgress = (this.currentTime / this.duration) * 100; //in percent
    timeBarFilled.style.flexBasis = `${videoProgress}%`;
}

function scrub(e) {
    let scrubTime = (e.offsetX / timeBar.offsetWidth) * videoPlayer.duration;
    videoPlayer.currentTime = scrubTime;
}

//play toggle
videoPlayer.addEventListener('click', togglePlay);
btnPlay.addEventListener('click', togglePlay);
videoPlayer.addEventListener('play', changeIcon);
videoPlayer.addEventListener('pause', changeIcon);
videoPlayer.addEventListener('timeupdate', updateTimeBar);

//skips button
btnSkips.forEach(button => button.addEventListener('click', skipVideo));

//slider
playerSlider.forEach(slider => slider.addEventListener('change', changeVolRate));
playerSlider.forEach(slider => slider.addEventListener('mousemove', changeVolRate));

//scrub the timebar to change the currentTime;
let isClicked = false;
timeBar.addEventListener('click', scrub);
timeBar.addEventListener('mousedown', ()=> isClicked = true);
timeBar.addEventListener('mousemove', (e)=> isClicked && scrub(e) );
timeBar.addEventListener('mouseup', () => isClicked=false);
