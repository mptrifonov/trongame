var trailIncrementInterval = BASE_TRAIL_INCREMENT_INTERVAL;
var collisionDetected = false;
var currentDirection;

function die() {
    gameHub.server.deadSnake(snake.id);
    clearInterval(gameLoop);

    renderError();
}

function playGame() {
    updateHeadPosition();
    updateTrail();
    renderView();
    
    gameHub.server.updatePosition(JSON.stringify(snake)); 

    if (collisionDetected) {
        die();
    }
}

function updateHeadPosition() {
    snake.x += snake.xvel;
    snake.y += snake.yvel;
    
    //this transfers snake through walls, there could be modes e.g. you die when you hit it
    if (snake.x < 0) {
        snake.x = map.tilecount - 1;
    }

    if (snake.x > map.tilecount - 1) {
        snake.x = 0;
    }

    if (snake.y < 0) {
        snake.y = map.tilecount - 1;
    }

    if (snake.y > map.tilecount - 1) {
        snake.y = 0;
    }
}

function updateTrail() {
    snake.trail.push({ x: snake.x, y: snake.y });

    while (snake.trail.length > snake.tail) {
        snake.trail.shift();
    }

    if (trailIncrementInterval % (BASE_TRAIL_INCREMENT_INTERVAL * 10) === 0) {
        snake.tail++;
        trailIncrementInterval = 0;
    }

    trailIncrementInterval += 100; 
}

function renderView() {
    canvasCtx.fillStyle = BACKGROUND_COLOR;
    canvasCtx.fillRect(0, 0, canvas.width, canvas.height);

    snakes.forEach(function (sna) {
        for (var i = 0; i < sna.trail.length; i++) {
            canvasCtx.fillStyle = sna.id !== snake.id ? ENEMY_SNAKE_COLOR : SNAKE_COLOR;
            canvasCtx.fillRect(sna.trail[i].x * map.gridsize, sna.trail[i].y * map.gridsize, map.gridsize - 2, map.gridsize - 2);

            if (sna.trail[i].x === snake.x && sna.trail[i].y === snake.y && snake.trail.length > 1) {
                collisionDetected = true;
            }
        }
    });
}

function renderError() {
    canvasCtx.fillStyle = "red";
    canvasCtx.font = "45px Verdana";
    canvasCtx.fillText("GAME OVER", 250, 80);
}

function onKeyPressed(event) {

    //ignoring right arrow when snake direction is left etc.
    if (event.key === "ArrowLeft" && currentDirection !== "right") {
        snake.xvel = -1;
        snake.yvel = 0;
        currentDirection = "left";
    }

    if (event.key === "ArrowRight" && currentDirection !== "left") {
        snake.xvel = 1;
        snake.yvel = 0;
        currentDirection = "right";
    }

    if (event.key === "ArrowUp" && currentDirection !== "down") {
        snake.xvel = 0;
        snake.yvel = -1;
        currentDirection = "up";
    }

    if (event.key === "ArrowDown" && currentDirection !== "up") {
        snake.xvel = 0;
        snake.yvel = 1;
        currentDirection = "down";
    }
}