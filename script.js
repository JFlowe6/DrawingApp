const canvas = document.getElementById('canvas');
const increaseBtn = document.getElementById('increase');
const decreaseBtn = document.getElementById('decrease');
const sizeElem = document.getElementById('size');
const ctx = canvas.getContext('2d');

let size = 10;
let isPressed=false;

//this just sees if the mouse is pressed 
//which will then cause drawing to be displayed
canvas.addEventListener('mousedown', ()=>{
    isPressed = true;
});

canvas.addEventListener('mouseup', ()=>{
    isPressed = false;
});

canvas.addEventListener('mousemove', (e)=>{
    if(isPressed){
        const x = e.offsetX;
        const y = e.offsetY;

        drawCircle(x, y);
    }
});

function drawCircle(x,y){
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fill();
}

increaseBtn.addEventListener('click',()=>{
    size +=5;
    if (size>50){
        size=50;
    }
    updateBrushSize();
});

decreaseBtn.addEventListener('click',()=>{
    size -=5;
    if (size<5){
        size=5;
    }
    updateBrushSize();
});

function updateBrushSize(){
    sizeElem.innerText = size;
}