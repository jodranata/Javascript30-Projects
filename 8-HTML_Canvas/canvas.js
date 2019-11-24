const canvas = document.getElementById('draw');
const canvasContext = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvasContext.strokeStyle = '#158787';
canvasContext.lineJoin = 'round';
canvasContext.lineCap = 'round';
canvasContext.lineWidth = 1;

let isDrawing = false;
let lastX = 0;
let lastY = 0;
let hue = 0;
let direction = true;

function draw(e) {
    if (!isDrawing) return; //stop the function if it's not being clicked
    canvasContext.strokeStyle = `hsl(${hue}, 100%, 50%)`;
    
    canvasContext.beginPath();
    //start from 0
    canvasContext.moveTo(lastX, lastY);
    //end to
    canvasContext.lineTo(e.offsetX, e.offsetY);
    canvasContext.stroke();
    [lastX, lastY] = [e.offsetX, e.offsetY];
    hue++;
    if (hue >= 360) {hue = 0;}
    
    if (canvasContext.lineWidth >= 50 || canvasContext.lineWidth <= 1) 
    direction = !direction;
    
    if (direction) canvasContext.lineWidth++;
    else canvasContext.lineWidth--;
}

//update the offset when we clicked down
canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
    
});


canvas.addEventListener('mousemove', draw);

canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseout', () => isDrawing = false);