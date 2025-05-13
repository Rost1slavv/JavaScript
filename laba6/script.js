const gridSize = 5;
let allLevels = [];
let currentLevel = null;
let grid = [];
let moves = 0;
let time = 0;
let timerInterval;

document.addEventListener('DOMContentLoaded', () => {
    fetch('data/initialState.json')
        .then(response => response.json())
        .then(data => {
            allLevels = data.levels;
            startNewGame();
        });
});

function startNewGame() {
    const randomIndex = Math.floor(Math.random() * allLevels.length);
    currentLevel = allLevels[randomIndex];
    grid = currentLevel.grid.map(row => row.slice());
    renderGrid();
    moves = 0;
    document.getElementById('moves').textContent = `Moves: ${moves}`;
    document.getElementById('target').textContent = `Target: ${currentLevel.target}`;
    startTimer();
}

function restartGame() {
    grid = currentLevel.grid.map(row => row.slice());
    renderGrid();
    moves = 0;
    document.getElementById('moves').textContent = `Moves: ${moves}`;
    startTimer();
}

function renderGrid() {
    const gameGrid = document.getElementById('gameGrid');
    gameGrid.innerHTML = '';
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            if (grid[i][j] === 1) cell.classList.add('on');
            cell.addEventListener('click', () => toggleLights(i, j));
            gameGrid.appendChild(cell);
        }
    }
}

function toggleLights(row, col) {
    toggleCell(row, col);
    if (row > 0) toggleCell(row - 1, col);
    if (row < gridSize - 1) toggleCell(row + 1, col);
    if (col > 0) toggleCell(row, col - 1);
    if (col < gridSize - 1) toggleCell(row, col + 1);
    
    moves++;
    document.getElementById('moves').textContent = `Moves: ${moves}`;
    checkWin();
}

function toggleCell(row, col) {
    grid[row][col] = 1 - grid[row][col];
    renderGrid();
}

function checkWin() {
    if (grid.every(row => row.every(cell => cell === 0))) {
        clearInterval(timerInterval);
        if (moves <= currentLevel.target) {
            alert('ПОТУЖНА ПЕРЕМОГА! Ви вклалися в цільову кількість ходів.');
        } else {
            alert('МЕНШ ПОТУЖНА ПЕРЕМОГА, бо не вклалися в цільову кількість ходів.');
        }
    }
}

function startTimer() {
    clearInterval(timerInterval);
    time = 0;
    timerInterval = setInterval(() => {
        time++;
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        document.getElementById('time').textContent = `Time: ${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
    }, 1000);
}

document.getElementById('newGameBtn').addEventListener('click', startNewGame);
document.getElementById('restartBtn').addEventListener('click', restartGame);
