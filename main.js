const canvas = document.querySelector('#game');
const context = canvas.getContext('2d');

let canvasSize;
let elementSize;

window.addEventListener('load', setCanvasSize);

window.addEventListener('resize', setCanvasSize);

function setCanvasSize() {
    if (window.innerHeight > this.window.innerWidth) {
        canvasSize = window.innerWidth*0.8;
    } else {
        canvasSize = window.innerHeight*0.7;
    }
    canvas.setAttribute('width', canvasSize);
    canvas.setAttribute('height', canvasSize);
    startGame();
}

function startGame() {
    elementSize = (canvasSize/10) - 1;

    context.font = elementSize + 'px Roboto';
    context.textAlign = "end";

    for (let i = 1; i <= 10; i++){
        context.fillText(emojis['X'], elementSize*i, elementSize);
    }

    // context.fillRect(0,0,100,100);
    // context.clearRect(0,0,50,50);
    // context.fillStyle = 'orangered';
    // context.font = '15px Roboto';
    // context.textAlign = 'center';
    // context.fillText('Soy la polla con cebolla', 100, 70);
}