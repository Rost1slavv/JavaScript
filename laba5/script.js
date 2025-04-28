document.addEventListener("DOMContentLoaded", () => {
    const startBtn    = document.getElementById('start-button');
    const setup       = document.getElementById('setup');
    const game        = document.getElementById('game');
    const block       = document.getElementById('block');
    const scoreEl     = document.getElementById('score');
    const timeEl      = document.getElementById('time-left');
    const colorSelect = document.getElementById('color');

    const difficulties = {
        easy:   { time: 10, size: 60, range: 0.5  },
        normal: { time: 6,  size: 45, range: 0.75 },
        hard:   { time: 2,  size: 30, range: 1    }
    };

    let score,
        timeLeft,
        timer,
        currentTime,
        currentColor,
        currentSize,
        currentRange;

    startBtn.addEventListener('click', () => {
        const key = document.getElementById('difficulty').value;
        ({ time: currentTime, size: currentSize, range: currentRange } = difficulties[key]);
        currentColor = colorSelect.value;

        block.style.width  = `${currentSize}px`;
        block.style.height = `${currentSize}px`;
        block.style.backgroundColor = currentColor;

        setup.style.display = 'none';
        game.style.display  = 'block';
        initGame();
    });

    function initGame() {
        score = 0;
        updateScore();
        gameLoop();
    }

    function updateScore() {
        scoreEl.textContent = score;
    }

    function gameLoop() {
        moveBlock();
        startTimer(currentTime);
    }

    function moveBlock() {
        const area = game.getBoundingClientRect();
        const maxX = area.width  - currentSize;
        const maxY = area.height - currentSize;

        const x = Math.random() * maxX * currentRange;
        const y = Math.random() * maxY * currentRange;

        block.style.left = `${x}px`;
        block.style.top  = `${y}px`;

        block.style.width  = `${currentSize}px`;
        block.style.height = `${currentSize}px`;
        block.style.backgroundColor = currentColor;
    }

    function startTimer(duration) {
        clearInterval(timer);
        timeLeft = duration;
        timeEl.textContent = timeLeft;

        timer = setInterval(() => {
            timeLeft--;
            timeEl.textContent = timeLeft;
            if (timeLeft <= 0) endGame();
        }, 1000);
    }

    function endGame() {
        clearInterval(timer);
        block.removeEventListener('click', handleClick);
        alert(`Гра завершена! Ваш рахунок: ${score}`);
        location.reload();
    }

    function handleClick() {
        if (timeLeft <= 0) return;
        score++;
        updateScore();
        clearInterval(timer);
        gameLoop();
    }

    block.addEventListener('click', handleClick);
});