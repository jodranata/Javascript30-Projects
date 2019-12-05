//get the HTML element
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const recording = document.querySelector('.player');
const downloadsBar = document.querySelector('.strip');
const snapAudio = document.querySelector('.snap');
const screenshotBtn = document.querySelector('.screenshot');
const accessVidBtn = document.querySelector('.access-video');
const startRecordBtn = document.querySelector('.start-recording');
const stopRecordtBtn = document.querySelector('.stop-recording');
const selectBtn = document.querySelector('.dropdown');
const displayBtn = document.querySelector('.display-video');
const recordCanvasBtn = document.querySelector('.record-canvas');
const stopCanvas = document.querySelector('.stop-canvas');
const rgbDiv = document.querySelector('.rgb');

const applyFilters = { //Obejcts containing filter functions
  redEffect : function (pixels) {
              for(let i = 0; i < pixels.data.length; i += 4) {
              pixels.data[i + 0] += 150;
              pixels.data[i + 1] -= 50;
              pixels.data[i + 2] *= 0.5;
            }
            return pixels;
            },
    greenScreen: function (pixels) {
            const levels = {};
          
            document.querySelectorAll('.rgb input').forEach((input) => {
              levels[input.name] = input.value;
            });
          
            for (i = 0; i < pixels.data.length; i = i + 4) {
              red = pixels.data[i + 0];
              green = pixels.data[i + 1];
              blue = pixels.data[i + 2];
              alpha = pixels.data[i + 3];
          
              if (red >= levels.rmin && 
                green >= levels.gmin && 
                blue >= levels.bmin && 
                red <= levels.rmax && 
                green <= levels.gmax && 
                blue <= levels.bmax) {
                // take it out!
                pixels.data[i + 3] = 0;
              }
            }
            return pixels;
          },
    rgbSplit: function (pixels) {
      for(let i = 0; i < pixels.data.length; i += 4) {
        pixels.data[i - 200] = pixels.data[i + 0];
        pixels.data[i + 500] = pixels.data[i + 1];
        pixels.data[i - 550] = pixels.data[i + 2];
      }
      return pixels;
    }
};


function streamVideo() {
  let constraintObj = {video: true, audio: false}; //the type of data we want to stream
  navigator.mediaDevices.getUserMedia(constraintObj) //access the user media and asked for the constraing (type of data)
    .then(mediaStream => { //return mediastream/data from the webcam >> as a promise
      recording.srcObject = mediaStream;//put the data stream into the HTML video player
      recording.onloadedmetadata = (e) => recording.play(); //play the stream in HTML video element
      let mediaRecorder = new MediaRecorder(mediaStream); // record the mediaStream using MediaRecorder constructor and assign it into mediaRecorder
      let chunks = [];
      startRecordBtn.onclick = (e) => { //when startRecordBtn is clicked
        startRecordBtn.disabled = true;
        stopRecordtBtn.disabled = false;
        mediaRecorder.start(); //mediaRecorder will start recording the data(stream) and assign it into mediaRecorder object
        console.log('start recording');
      };
      stopRecordtBtn.onclick = (e) => {//when stopRecordBtn is clicked
        startRecordBtn.disabled = false;
        stopRecordtBtn.disabled = true;
        mediaRecorder.stop();//media recorder will stop recording/adding data into mediaRecorder object
        console.log('now it is stopped');
      };
      mediaRecorder.ondataavailable = (e) => {//when data in the mediaRecorder is available(the recorded data)
        chunks.push(e.data);//when it start streaming, the data is available, it'll push it into the chunks array;
        console.log(e.data);
      };
      mediaRecorder.onstop = (e) => {//when mediaRecorder is stopped

        let blob = new Blob(chunks, {'type' : 'video/mp4'}); //we use the the data in the chunks array, and create a blob with addition of a new Key:value using Blob constructor
        chunks = [];//we reset the chunks so the previous data array is not saved to the next to(clear out the current data in the chunks so it can be replaced(NOT ADDED) by the next data)
          let url = URL.createObjectURL(blob); //create a URL from the blob so it can be downloaded
          console.log(url);
          let link = document.createElement("a");
          link.href = url;
          link.setAttribute('download', 'recording');
          link.textContent = 'Downloaded recording';
          downloadsBar.insertBefore(link, downloadsBar.firstChild);
          link.innerHTML = `<video src="${url}"></video>`;
          link.download = "video.mp4";
      };
    })
    .catch(error => {
      console.error("MEDIA USAGE PERMISSION DENIED::", error);
    })
    ;
}

function displayToCanvas() {
  const recordingWidth = recording.videoWidth;
  const recordingHeight = recording.videoHeight;
  canvas.width = recordingWidth;
  canvas.height = recordingHeight;
  let filterType = selectBtn.addEventListener('change', function() {
    filterType = this.value;
    if (filterType === 'greenScreen') rgbDiv.style.display = 'block';
    else rgbDiv.style.display = 'none';
  });
  
  return setInterval(()=> {
    ctx.drawImage(recording,0,0,recordingWidth,recordingHeight);
    let pixels = ctx.getImageData(0,0, recordingWidth, recordingHeight);
    if (filterType !== undefined) {
      pixels = applyFilters[filterType](pixels);
    }
    else {
      pixels = pixels;
    }
    ctx.putImageData(pixels, 0, 0);
  }, 16);
  
}


function recordCanvas() { //has the same principle with mediaRecorder 
  recordCanvasBtn.disabled = true;
  stopCanvas.disabled = false;
  let canvasStream = canvas.captureStream(); //capture the canvas data
  //record the canvas
  let options = {mimeType : 'video/webm'};
  let canvasChunks = [];
  let recStream = new MediaStream(); //store the mediaStream(from the canvas) in the recStream variable
  recStream.addTrack(canvasStream.getVideoTracks()[0]);//add canvasStream as video tracks in the recStream
  let mediaRecorder = new MediaRecorder(recStream, options);  //turn the recorded data in the canvas into a video as mediaRecorder
  mediaRecorder.start(); // after recordCanvasBtn is clicked we start recording
  stopCanvas.onclick = (e) => {
    mediaRecorder.stop();
  };
  mediaRecorder.ondataavailable = function(e) {
    canvasChunks.push(e.data);
    console.log(canvasChunks);
  };
  mediaRecorder.onstop = (e) => {
    recordCanvasBtn.disabled = false;
    stopCanvas.disabled = true;
    let blob = new Blob(canvasChunks, {'type' : 'video/webm'});
    canvasChunks = [];
    let url = URL.createObjectURL(blob);
    console.log(url);
    let link = document.createElement("a");
    link.href = url;
    link.setAttribute('download', 'recording');
    link.textContent = 'Downloaded recording';
    downloadsBar.insertBefore(link, downloadsBar.firstChild);
    link.innerHTML = `<video src="${url}"></video>`;
    link.download = "video.webm";
  };
    
}

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

accessVidBtn.addEventListener('click', streamVideo);
displayBtn.addEventListener('click', displayToCanvas);
recordCanvasBtn.addEventListener('click', recordCanvas);
screenshotBtn.addEventListener('click', takePhoto);

