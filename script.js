const canvas =document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let size=30;

canvas.addEventListener('mousedown', ()=>{

});

function drawCircle(x,y){
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fill();
}

function draw(){
    requestAnimationFrame(draw);
}

draw();