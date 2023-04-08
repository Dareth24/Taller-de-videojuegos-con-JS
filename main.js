const canvas = document.querySelector('#game');
const context = canvas.getContext('2d');

let canvasSize;
let elementSize;

const playerPosition = {
    x: undefined,
    y: undefined,
}

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
    elementSize = (canvasSize/10.7) - 1;

    context.font = elementSize + 'px Verdana';
    context.textAlign = "center";

    const map = maps[0];
    const mapRows = map.trim().split("\n");
    const mapRowCols = mapRows.map(row => row.trim().split(''));
    // console.log(mapRowCols);

    context.clearRect(0,0, canvasSize, canvasSize);

    mapRowCols.forEach((row, rowIndex) => {
        row.forEach((col, colIndex) => {
            const emoji = emojis[col];
            const positionX = (elementSize*(rowIndex + 1));
            const positionY = (elementSize*(colIndex +1));

            playerLimits();

            if (playerPosition.x == undefined && col == 'O'){
                playerPosition.x = positionX;
                playerPosition.y = positionY;
            }

            context.fillText(emoji, positionX, positionY);
        })
    });
    movePlayer();
    console.log(playerPosition);
    // context.fillRect(0,0,100,100);
    // context.clearRect(0,0,50,50);
    // context.fillStyle = 'orangered';
    // context.font = '15px Roboto';
    // context.textAlign = 'center';
    // context.fillText('Soy la polla con cebolla', 100, 70);
}

function movePlayer() {
    context.fillText(emojis['PLAYER'], playerPosition.x, playerPosition.y);
}

function playerLimits() {
    if (playerPosition.x < elementSize) {
        playerPosition.x = elementSize;
    } 
    if (playerPosition.x > elementSize*10) {
        playerPosition.x = elementSize*10;
    }
    if (playerPosition.y < elementSize) {
        playerPosition.y = elementSize;
    }
    if (playerPosition.y > elementSize*10) {
        playerPosition.y = elementSize*10;
    }
}

function gameplay() {
    document.addEventListener("keyup", function(event){
        switch(event.code){
            case 'ArrowLeft':
                moveLeft();
                break;
            case 'ArrowUp':
                moveUp();
                break;
            case 'ArrowRight':
                moveRight();
                break;
            case 'ArrowDown':
                moveDown();
                break;
        }
    })
    const left = document.getElementById('left');
    const up = document.getElementById('up');
    const right = document.getElementById('right');
    const down = document.getElementById('down');

    left.addEventListener('click', moveLeft)
    up.addEventListener('click', moveUp)
    right.addEventListener('click', moveRight)
    down.addEventListener('click', moveDown)

    function moveLeft(){
        console.log('la flecha hacia la izquierda ha sido presionada');
        playerPosition.x -= elementSize;
        startGame();
    }
    function moveUp(){
        console.log('la flecha hacia arriba ha sido presionada');
        playerPosition.y -= elementSize;
        startGame();
    }
    function moveRight(){
        console.log('la flecha hacia la derecha ha sido presionada');
        playerPosition.x += elementSize;
        startGame();
    }
    function moveDown(){
        console.log('la flecha hacia abajo ha sido presionada');
        playerPosition.y += elementSize;
        startGame();
    }
}

gameplay();

