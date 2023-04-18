const canvas = document.querySelector('#game');
const context = canvas.getContext('2d');
const spanLives = document.querySelector('#lives');
const spanTime = document.querySelector('#time');

let canvasSize;
let elementSize;
let level = 0;
let lives = 3;
let timeStart;
let timePlayer;
let timeInterval;

const playerPosition = {
    x: undefined,
    y: undefined,
}

const giftPosition = {
    x: undefined,
    y: undefined,
}

let bombs = [];

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

    const map = maps[level];
    
    if (!map) {
        gameWin();
        return;
    }

    if (!timeStart) {
        timeStart = Date.now();
        timeInterval = setInterval(showTime, 100);
    }

    const mapRows = map.trim().split("\n");
    const mapRowCols = mapRows.map(row => row.trim().split(''));
    // console.log(mapRowCols);

    showLives();

    bombs = [];
    context.clearRect(0,0, canvasSize, canvasSize);

    mapRowCols.forEach((row, rowIndex) => {
        row.forEach((col, colIndex) => {
            const emoji = emojis[col];
            const positionX = (elementSize*(colIndex + 1));
            const positionY = (elementSize*(rowIndex +1));

            playerLimits();

            if (playerPosition.x == undefined && col == 'O'){
                playerPosition.x = positionX;
                playerPosition.y = positionY;
            } else if (col == 'I') {
                giftPosition.x = positionX;
                giftPosition.y = positionY;
            } else if (col == 'X') {
                bombs.push({//le hacemos push a un objeto con las posiciónes en x y y
                    x: positionX,
                    y: positionY,
                })
            }
            context.fillText(emoji, positionX, positionY);
        })
    });
    movePlayer();
    // console.log(bombs);
    // context.fillRect(0,0,100,100);
    // context.clearRect(0,0,50,50);
    // context.fillStyle = 'orangered';
    // context.font = '15px Roboto';
    // context.textAlign = 'center';
    // context.fillText('Soy la polla con cebolla', 100, 70);
}

function movePlayer() {
    const giftCollisionX = playerPosition.x.toFixed(3) == giftPosition.x.toFixed(3);
    const giftCollisionY = playerPosition.y.toFixed(3) == giftPosition.y.toFixed(3);
    const giftCollision = giftCollisionX && giftCollisionY;

    if(giftCollision) {
        nextLevel();
        console.log('jala');
    }
    
    // for (let i = 0; i < bombs.length; i++) {
    //     const bombCollisionX = playerPosition.x.toFixed(5) == bombs[i].x.toFixed(5);
    //     const bombCollisionY = playerPosition.y.toFixed(5) == bombs[i].y.toFixed(5);
    //     // console.log(bombCollisionX);
    //     // console.log(bombCollisionY);
    //     const bombCollision = bombCollisionX && bombCollisionY;

    //     if(bombCollision) {
    //         console.log('CAGASTE!')
    //     }
    // }

    const bombCollision = bombs.find(bomb => {
        const bombCollisionX = bomb.x.toFixed(3) == playerPosition.x.toFixed(3);
        const bombCollisionY = bomb.y.toFixed(3) == playerPosition.y.toFixed(3);
        return bombCollisionX && bombCollisionY;
    })

    if(bombCollision) {
        explosion();
    }

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

function explosion() {
    spanLives.innerHTML = emojis['HEART'];

    lives --;
    if (lives <= 0) {
        level = 0;
        lives = 3;
        timeStart = undefined;
    }
    context.fillText(emojis['BOMB_COLLISION'], playerPosition.x, playerPosition.y);
    playerPosition.x = undefined;
    playerPosition.y = undefined;
    // startGame()
    setTimeout(startGame, 100);
    console.log('çhocaste'); 
}

function nextLevel() {
    console.log('Subiste de nivel')
    level++;
    startGame();
}

function gameWin() {
    console.log('acabaste el juego');
    clearInterval(timeInterval);
}

function showLives() {
    spanLives.innerHTML = emojis['HEART'].repeat(lives);
}

function showTime() {
    spanTime.innerHTML = Date.now() - timeStart;
}
