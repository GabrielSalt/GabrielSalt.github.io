function overlay (imagesrc) { 
    var overlayElem = document.getElementById('overlay')
    var overlayImage = document.getElementById('overlayImage')
    var tint = document.getElementById('tint')

    overlayElem.hidden = false
    overlayImage.hidden = false
    overlayImage.src = imagesrc
    tint.hidden = false
}

function hideOverlay (e) {
    var overlayElem = document.getElementById('overlay')
    var overlayImage = document.getElementById('overlayImage')
    var tint = document.getElementById('tint')

    overlayElem.hidden = true
    overlayImage.hidden = true
    tint.hidden = true
}

let body = document.getElementById('body');

body.style.border = `${16/1470*window.innerWidth}px solid #FF00FF`

const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");


ctx.canvas.width  = window.innerWidth-(33/1470*window.innerWidth);
ctx.canvas.height = window.innerHeight-(33/802*window.innerHeight);

drawStar(ctx, 180, 480, 5, 70, 30, 10, 'black', 'magenta');
drawStar(ctx, 1200/1470*ctx.canvas.width, 330/802*ctx.canvas.height, 5, 130/1470*ctx.canvas.width, 55/1470*ctx.canvas.width, 10, 'black', 'magenta');
drawStar(ctx, 740/1470*ctx.canvas.width, 660/802*ctx.canvas.height, 5, 35/1470*ctx.canvas.width, 12/1470*ctx.canvas.width, 10, 'black', 'magenta');
drawStar(ctx, 330/1470*ctx.canvas.width, 620/802*ctx.canvas.height, 5, 70/1470*ctx.canvas.width, 30/1470*ctx.canvas.width, 15, 'black', 'black');
drawStar(ctx, 330/1470*ctx.canvas.width, 620/802*ctx.canvas.height, 5, 10/1470*ctx.canvas.width, 4/1470*ctx.canvas.width, 15, 'white', 'white');
drawStar(ctx, ctx.canvas.width / 2, 140/802*ctx.canvas.height, 5, 55/1470*ctx.canvas.width, 22/1470*ctx.canvas.width, 15, 'black', 'black');
drawStar(ctx, ctx.canvas.width / 2, 140/802*ctx.canvas.height, 5, 10/1470*ctx.canvas.width, 4/1470*ctx.canvas.width, 15, 'white', 'white');
drawStar(ctx, 1000/1470*ctx.canvas.width, 130/802*ctx.canvas.height, 5, 70/1470*ctx.canvas.width, 15/1470*ctx.canvas.width, 15, 'black', 'black');

function getBorderWidth(){
    if (window.innerWidth > window.innerHeight) return window.innerWidth / 10
    else return window.innerWidth
}

body = document.getElementsByTagName("body")
body.style.border = getBorderWidth()
window.onresize = (event) => {
    ctx.canvas.width  = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
    body.style.border = getBorderWidth()
}

function drawStar(ctx, cx, cy, spikes, outerRadius, innerRadius, width, fill, stroke) {
let rot = Math.PI / 2 * 3;
let x = cx;
let y = cy;
let step = Math.PI / spikes;

ctx.beginPath();
ctx.moveTo(cx, cy - outerRadius);

for (let i = 0; i < spikes; i++) {
x = cx + Math.cos(rot) * outerRadius;
y = cy + Math.sin(rot) * outerRadius;
ctx.lineTo(x, y);
rot += step;

x = cx + Math.cos(rot) * innerRadius;
y = cy + Math.sin(rot) * innerRadius;
ctx.lineTo(x, y);
rot += step;
}

ctx.lineTo(cx, cy - outerRadius);
ctx.closePath();
ctx.lineWidth = width;
ctx.strokeStyle = stroke;
ctx.stroke();
ctx.fillStyle = fill;
ctx.fill();
}