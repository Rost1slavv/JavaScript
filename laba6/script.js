const gridSize = 5;
let grid = [];
let moves = 0;
let time = 0;
let timerInterval;

document.addEventListener('DOMContentLoaded', () => {
    initializeGame();
    document.getElementById('restartBtn').addEventListener('click', restartGame);
});

function initializeGame() {
    fetch('data/initialState.json')
        .then(response => response.json())
        .then(data => {
            grid = data.grid;
            renderGrid();
            startTimer();
        })
        .catch(error => console.error('Помилка завантаження JSON:', error));
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
        alert('Ви перемогли!');
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

function restartGame() {
    moves = 0;
    document.getElementById('moves').textContent = `Moves: ${moves}`;
    initializeGame();
}
