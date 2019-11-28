let canvas;
let context;
let timer = null;
let period = 200;
let cellSize = 15;

let cells;
let width;
let height;

const MIN_PERIOD = 1;
const MAX_PERIOD = 5000;

const MIN_CELL_SIZE = 3;
const MAX_CELL_SIZE = 50;
const CELL_EMPTY = 0;
const CELL_LIFE = 1;

const LIFE_PERCENTAGE = 0.07;

function getRandom(max) {
    return getRandomMinMax(0, max - 1);
}

function getRandomMinMax(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function drawBackground() {
    context.fillStyle = "#999999";
    context.fillRect(0, 0, canvas.width, canvas.height);
}

function drawCell(x, y) {
    let cell = cells[y][x];
    if ([CELL_EMPTY, CELL_LIFE].includes(cell)) {
        switch (cell) {
            case CELL_EMPTY:
                context.fillStyle = "#FFFFFF";
                break;
            case CELL_LIFE:
                context.fillStyle = "#000000";
                break;
        }
        let posX = cellSize * x;
        let posY = cellSize * y;
        context.fillRect(posX, posY, cellSize - 1, cellSize - 1);
    }
}

function drawBoard() {
    drawBackground();
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            drawCell(x, y);
        }
    }
}

function setTimer() {
    if (timer !== null) {
        clearInterval(timer);
    }
    timer = setInterval(frame, period);
}

function decreasePeriod() {
    period /= 2;
    if (period < MIN_PERIOD) {
        period = MIN_PERIOD;
    }
    setTimer();
}

function increasePeriod() {
    period *= 2;
    if (period > MAX_PERIOD) {
        period = MAX_PERIOD;
    }
    setTimer();
}

function decreaseCellSize() {
    cellSize--;
    if (cellSize < MIN_CELL_SIZE) {
        cellSize = MIN_CELL_SIZE;
    }
    initBoard();
}

function increaseCellSize() {
    cellSize++;
    if (cellSize > MAX_CELL_SIZE) {
        cellSize = MAX_CELL_SIZE;
    }
    initBoard();
}

function minusX(x) {
    return (x + width - 1) % width;
}

function plusX(x) {
    return (x + 1) % width;
}

function minusY(y) {
    return (y + height - 1) % height;
}

function plusY(y) {
    return (y + 1) % height;
}

function countLives(x, y) {
    return (cells[minusY(y)][minusX(x)] == CELL_LIFE ? 1 : 0) + (cells[minusY(y)][x] == CELL_LIFE ? 1 : 0) +
        (cells[minusY(y)][plusX(x)] == CELL_LIFE ? 1 : 0) + (cells[y][minusX(x)] == CELL_LIFE ? 1 : 0) +
        (cells[y][plusX(x)] == CELL_LIFE ? 1 : 0) + (cells[plusY(y)][minusX(x)] == CELL_LIFE ? 1 : 0) +
        (cells[plusY(y)][x] == CELL_LIFE ? 1 : 0) + (cells[plusY(y)][plusX(x)] == CELL_LIFE ? 1 : 0);
}

function moveLives() {
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            let neighbors = countLives(x, y);
            if (cells[y][x] === CELL_LIFE) {
                if ((neighbors < 2) || (neighbors > 3)) {
                    cells[y][x] = CELL_EMPTY;
                }
            } else {
                if (neighbors === 3) {
                    cells[y][x] = CELL_LIFE;
                }
            }
        }
    }
}

function frame() {
    moveLives();
    drawBoard();
}

function initLives() {
    let lives = width * height * LIFE_PERCENTAGE;
    while (lives > 0) {
        let x = getRandom(width);
        let y = getRandom(height);
        if (cells[y][x] === CELL_EMPTY) {
            cells[y][x] = CELL_LIFE;
            lives--;
        }
    }
}

function initBoard() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    width = Math.floor(canvas.width / cellSize);
    height = Math.floor(canvas.height / cellSize);

    cells = [];
    cells.length = height;
    for (let y = 0; y < height; y++) {
        cells[y] = [];
        cells[y].length = width;
        for (let x = 0; x < width; x++) {
            cells[y][x] = CELL_EMPTY;
        }
    }

    initLives();
}

function keyPressed(event) {
    let key = event.key.toUpperCase();
    switch (key) {
        case 'Q':
            decreasePeriod();
            break;
        case 'A':
            increasePeriod();
            break;
        case 'W':
            increaseCellSize();
            break;
        case 'S':
            decreaseCellSize();
            break;
        case 'R':
            initBoard();
            break;
        case 'P':
            if (timer === null) {
                setTimer();
            } else {
                clearInterval(timer);
                timer = null;
            }
            break;
    }
    event.preventDefault();
}

function conway(id) {
    canvas = document.getElementById(id);
    context = canvas.getContext('2d');
    initBoard();
    drawBoard();

    setTimer();
    window.addEventListener("resize", initBoard);
    window.addEventListener("keypress", keyPressed);
}
