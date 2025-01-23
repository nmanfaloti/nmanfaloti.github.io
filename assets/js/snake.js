
let width = 30;
let height = 30;


let snake = [];
let direction = 'right';
let newDirection = 'right';
let speed = 100;
let gameover = false;
let head = null;
let score = 0;
let apple = {x: 0, y: 0};

/* Gameboard Creation */
for (let i=0;i<width;i++){
    document.getElementsByClassName('gameboard')[0].innerHTML += '<div class="line"></div>';
    document.getElementsByClassName('line')[i].innerHTML = '<div class="cell"></div>'.repeat(height);
}

/* Snake Creation */
function initSnake(){
    for (let i=0;i<snake.length;i++){
        document.getElementsByClassName('cell')[(snake[i].y)*width + snake[i].x].innerHTML = '';
        if (snake[i].tail){
            let tail = document.querySelector('.tail');
            if (tail) {
                tail.remove();
            }
            let newTail = document.createElement('div');
            newTail.classList.add('tail');
            newTail.classList.add(snake[i].direction);
            document.getElementsByClassName('cell')[(snake[i].y)*width + snake[i].x].appendChild(newTail);
        }
        else if (snake[i].head){
            let head = document.querySelector('.head');
            if (head) {
                head.remove();
            }
            let newHead = document.createElement('div');
            newHead.classList.add('head');
            let Lefteyes = document.createElement('div');
            Lefteyes.classList.add('eyes');
            newHead.appendChild(Lefteyes);
            let Righteyes = document.createElement('div');
            Righteyes.classList.add('eyes');
            newHead.appendChild(Righteyes);
            let eyesdot1 = document.createElement('div');
            eyesdot1.classList.add('eyesdot');
            Lefteyes.appendChild(eyesdot1);
            let eyesdot2 = document.createElement('div');
            eyesdot2.classList.add('eyesdot');
            eyesdot2.classList.add('reverse');
            Righteyes.appendChild(eyesdot2);
            document.getElementsByClassName('cell')[(snake[i].y)*width + snake[i].x].appendChild(newHead);
            newHead.classList.add(snake[i].direction);
        }
        else {
            let newSnake = document.createElement('div');
            newSnake.classList.add('snake');
            newSnake.classList.add(snake[i].direction);
            document.getElementsByClassName('cell')[(snake[i].y)*width + snake[i].x].appendChild(newSnake);
        }
    }
}

/* Snake Movement */
function moveSnake(){
    if (gameover) return;
    let newHead = {x: snake[snake.length-1].x, y: snake[snake.length-1].y, direction: newDirection, head: true};
    if (newDirection === 'up'){
        newHead.y--;
    }
    else if (newDirection === 'down'){
        newHead.y++;
    }
    else if (newDirection === 'left'){
        newHead.x--;
    }
    else if (newDirection === 'right'){
        newHead.x++;
    }

    if (newHead.x < 0 || newHead.x >= width || newHead.y < 0 || newHead.y >= height){
        gameover = true;
        return;
    }

    for (let i=0;i<snake.length;i++){
        if (newHead.x === snake[i].x && newHead.y === snake[i].y){
            gameover = true;
            return;
        }
    }

    if (newHead.x === apple.x && newHead.y === apple.y){
        score++;
        let scoreElement = document.getElementById('score');
        scoreElement.innerHTML = 'Score: ' + score;
        createApple();
    }
    else {
        let tail = document.querySelector('.tail');
        if (tail) {
            tail.remove();
        }
        let tailIndex = snake[0].y * width + snake[0].x;
        document.getElementsByClassName('cell')[tailIndex].innerHTML = '';
        snake.shift();
    }

    snake.push(newHead);
    for (let i=0;i<snake.length-1;i++){
        snake[i].head = false;
        if (snake[i].x == snake[snake.length-1].x || snake[i].y == snake[snake.length-1].y){
            snake[i].direction = snake[snake.length-1].direction;
        }
    }
    snake[0].tail = true;
    initSnake();

    direction = newDirection;
    setTimeout(moveSnake, speed*1);
}

/* Apple Creation */
function createApple(){
    apple.x = Math.floor(Math.random()*width);
    apple.y = Math.floor(Math.random()*height);
    let newApple = document.createElement('div');
    newApple.classList.add('apple');
    document.getElementsByClassName('cell')[(apple.y)*width + apple.x].appendChild(newApple);

}

document.getElementsByTagName('body')[0].addEventListener('keydown', function(event){
    if (event.key === 'ArrowUp' && direction !== 'down'){
        newDirection = 'up';
    }
    else if (event.key === 'ArrowDown' && direction !== 'up'){
        newDirection = 'down';
    }
    else if (event.key === 'ArrowLeft' && direction !== 'right'){
        newDirection = 'left';
    }
    else if (event.key === 'ArrowRight' && direction !== 'left'){
        newDirection = 'right';
    }  
});

/* Game Management */
function startGame(){
    snake.push({x: 1, y: height-2, tail: true});
    snake.push({x: 2, y: height-2});
    snake.push({x: 3, y: height-2, head: true});
    createApple();
    initSnake();
    moveSnake();
}

startGame();

