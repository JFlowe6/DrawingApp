const canvas =document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let size = 30;
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

// function draw(){
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//     requestAnimationFrame(draw);
// }

// draw();