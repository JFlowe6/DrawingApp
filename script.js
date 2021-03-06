//variables
const canvas = document.getElementById('canvas');
const increaseBtn = document.getElementById('increase');
const decreaseBtn = document.getElementById('decrease');
const clearBtn = document.getElementById('clear');
const sizeElem = document.getElementById('size');
const colorElem = document.getElementById('color');
const ctx = canvas.getContext('2d');

//sets the variables to preliminary states
let size = 10;
let isPressed=false;
let color='black';
let x = undefined;
let y = undefined;
var mousePos;

//this just sees if the mouse is pressed 
//which will then cause drawing to be displayed
canvas.addEventListener('mousedown', (e)=>{
    isPressed = true;
    var scale = elementScale(canvas);

    // x = e.offsetX * scale;
    // y = e.offsetY * scale;
    mousePos = getMousePosition(canvas, e);
    x = mousePos.x * scale;
    y = mousePos.y * scale;

    //This is done so that if the mouse is pressed down and doesn't move 
    //there will still be a dot/circle placed there
    drawCircle(x, y);
});

//resets the x and y values when mouse not pressed down
canvas.addEventListener('mouseup', (e)=>{
    isPressed = false;

    x = undefined;
    y = undefined;
});

//fills in the space between two points making it seem like a line has been drawn
canvas.addEventListener('mousemove', (e)=>{
    if(isPressed){
        var scale = elementScale(canvas);
        // const x2 = e.offsetX * scale;
        // const y2 = e.offsetY * scale;
        mousePos = getMousePosition(canvas, e);
        const x2 = mousePos.x * scale;
        const y2 = mousePos.y * scale;

        drawCircle(x2, y2);
        drawLine(x, y, x2, y2);
        x = x2;
        y = y2;
    }
});

//touch listeners for mobile and tablet

canvas.addEventListener('touchstart', function(e){
    mousePos = getMousePosition(canvas, e)
    var touch = e.touches[0];
    var mouseEvent = new MouseEvent("mousedown",{
        clientX:touch.clientX,
        clientY:touch.clientY
    });
    canvas.dispatchEvent(mouseEvent)
}, false);

canvas.addEventListener('touchend', function(e){
    var mouseEvent = new MouseEvent("mouseup",{});
    canvas.dispatchEvent(mouseEvent)
}, false);

canvas.addEventListener('touchmove', function(e){
    mousePos = getMousePosition(canvas, e)
    var touch = e.touches[0];
    var mouseEvent = new MouseEvent("mousemove",{
        clientX:touch.clientX,
        clientY:touch.clientY
    });
    canvas.dispatchEvent(mouseEvent)
}, false);

function getMousePosition(canvas, e){
    var rect = canvas.getBoundingClientRect();
    return{
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
    }
}

function drawCircle(x,y){
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
}

function drawLine(x1, y1, x2, y2){
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = color;
    ctx.lineWidth = size * 2;
    ctx.stroke();
}

//increases size of 'brush'
increaseBtn.addEventListener('click',()=>{
    size +=2.5;
    if (size>50){
        size=50;
    }
    updateBrushSize();
});

//decreases size
decreaseBtn.addEventListener('click',()=>{
    size -=2.5;
    if (size<5){
        size=5;
    }
    updateBrushSize();
});

//clears the canvas
clearBtn.addEventListener('click', ()=>{
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

colorElem.addEventListener('change',(e)=>{
    color = e.target.value;
});

function updateBrushSize(){
    sizeElem.innerText = size;
}

//allows to scale the size of the canvas/page 
//this might be the cause of the issue when it comes to the touch listeners
function elementScale(canvas) {
    return canvas.offsetWidth === 0 ? 0 : (canvas.width / canvas.offsetWidth);
}
  