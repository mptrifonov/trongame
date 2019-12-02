var snake;
var map;
var snakes = [];
var gameHub;
var gameLoop;

window.onload = function () {
    canvas = document.getElementById("gameCanvas");
    canvasCtx = canvas.getContext("2d");

    document.addEventListener("keydown", onKeyPressed);

    gameHub = $.connection.gameHub;

    gameHub.client.updateState = function (data) {
        snakes = JSON.parse(data);
    };

    $.connection.hub.start().done(function () {
        initGame();
    });
};

window.unload = function () {
    gameHub.server.deadSnake(snake.id);
};

function initGame() {
    map = new Map();

    snake = new Snake(gameHub.connection.id);
    snakes.push(snake);

    gameHub.server.newSnake(JSON.stringify(snake));

    snake.xvel = -1;
    snake.yvel = 0;

    gameLoop = setInterval(playGame, GAME_LOOP_INTERVAL);
}