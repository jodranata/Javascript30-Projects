const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');
const screenshot = document.querySelector('.controls button');

//stream video to website, play it in the player
function getVideo() {
  navigator.mediaDevices.getUserMedia({video: true, audio:false})
    .then(localMediaStream => {
      console.log(localMediaStream);
      video.srcObject = localMediaStream;
      video.play();
    })
      .catch(err => {
        console.error('nooo', err);
      });
}

//paint the video to canvas
function paintToCanvas() {
  const width = video.videoWidth;//set when getVideo is executed
  const height = video.videoHeight;//set when getVideo is executed
  canvas.width = width;
  canvas.height = height;
  return setInterval(() => {
    ctx.drawImage(video, 0, 0, width, height);
    //take pixels Out
    let pixels = ctx.getImageData(0,0, width, height);
    //mess it up
    // pixels = redEffect(pixels);
    pixels = greenScreen(pixels);
    //put it back to canvas
    ctx.putImageData(pixels, 0,0);
     }, 16);
}

// take a screenShot
function takePhoto() {
  snap.currentTime = 0;
  snap.play();
  
  //take data out from the current image to canvas
  const data = canvas.toDataURL('image/jpeg');
  const link = document.createElement('a');
  link.href = data;
  link.setAttribute('download', 'screenshot');
  link.textContent = 'Download Image';
  link.innerHTML = `<img src="${data}" alt="screenshot image"/>`;
  strip.insertBefore(link, strip.firstChild);
}

//Filters
function redEffect(pixels) {
  for(let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i + 0] += 100;
    pixels.data[i + 1] -= 50;
    pixels.data[i + 2] *= 0.5;
  }
  return pixels;
}

function rgbSplit(pixels) {
  for(let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i - 200] = pixels.data[i + 0];
    pixels.data[i + 500] = pixels.data[i + 1];
    pixels.data[i - 550] = pixels.data[i + 2];
  }
  return pixels;
}

function greenScreen(pixels) {
  const levels = {};

  document.querySelectorAll('.rgb input').forEach((input) => {
    levels[input.name] = input.value;
  });

  for (i = 0; i < pixels.data.length; i = i + 4) {
    red = pixels.data[i + 0];
    green = pixels.data[i + 1];
    blue = pixels.data[i + 2];
    alpha = pixels.data[i + 3];

    if (red >= levels.rmin && green >= levels.gmin && blue >= levels.bmin && red <= levels.rmax && green <= levels.gmax && blue <= levels.bmax) {
      // take it out!
      pixels.data[i + 3] = 0;
    }
  }
  return pixels;
}


// getVideo();
video.addEventListener('canplay', paintToCanvas);
screenshot.addEventListener('click', takePhoto);
// 
// 




