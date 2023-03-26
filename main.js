const canvas = document.querySelector('#game');
const context = canvas.getContext('2d');

window.addEventListener('load', startGame);

function startGame() {
    context.fillRect(0,0,100,100);
    context.clearRect(0,0,50,50);
    context.fillStyle = 'orangered';
    context.font = '15px Roboto';
    context.textAlign = 'center';
    context.fillText('Soy la polla con cebolla', 100, 70);
}