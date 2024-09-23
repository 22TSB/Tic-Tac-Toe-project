const grid = document.querySelector('.ttGrid');

let sw = true;
let game = true;

const winPos = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [7, 5, 3],
];

const player1 = [];
const player2 = [];

const resetGame = () => {
    sw = true;
    game = true;
    for (let i = 1; i <= 9; ++i) {
        if (player1.includes(i)) {
            const cell = document.querySelector('.player1Selected');
            cell.removeAttribute('class', 'player1Selected');
            cell.setAttribute('class', `cell${i}`);
        } else if (player2.includes(i)) {
            const cell = document.querySelector('.player2Selected');
            cell.removeAttribute('class', 'player2Selected');
            cell.setAttribute('class', `cell${i}`);
        }
    }
    const title = document.querySelector('.h1Title');
    title.lastElementChild.remove();
    title.lastElementChild.remove();
    player1.length = 0;
    player2.length = 0;
};

const gameOver = (result) => {
    const title = document.querySelector('.h1Title');
    const h2 = document.createElement('h2');
    const resetBtn = document.createElement('button');
    resetBtn.setAttribute('class', 'resetBtn');
    resetBtn.textContent = 'Play again';
    if (result === 'player1') {
        h2.textContent = 'Player 1 won!';
    } else if (result === 'player2') {
        h2.textContent = 'Player 2 won!';
    } else {
        h2.textContent = "It's a Draw!";
    }
    title.append(h2);
    title.append(resetBtn);
    resetBtn.addEventListener('click', resetGame);
};

const checkWin = (sw) => {
    for (let i = 0; i < winPos.length; ++i) {
        let ok = true;
        for (let j = 0; j < 3; ++j) {
            if (sw) {
                if (!player1.includes(winPos[i][j])) {
                    ok = false;
                    break;
                }
            } else {
                if (!player2.includes(winPos[i][j])) {
                    ok = false;
                    break;
                }
            }
        }
        if (ok) {
            return 1;
        }
    }
    if (player1.length + player2.length > 8) {
        gameOver('draw');
        game = false;
    } else {
        return 0;
    }
};

const cellSelect = (e) => {
    if (game) {
        if (e.target.getAttribute('class')[
            e.target.getAttribute('class').length - 1
        ] !== "d") {
            const cell = Number(
            e.target.getAttribute('class')[
                e.target.getAttribute('class').length - 1
            ]
            );
            if (player1.length + player2.length > 8) {
                gameOver('draw');
                game = false;
            } else if (sw && !player2.includes(cell) && !player1.includes(cell)) {
                const colorCell = document.querySelector(`.cell${cell}`);
                colorCell.setAttribute('class', 'player1Selected');
                player1.push(cell);
                if (checkWin(sw)) {
                    gameOver('player1');
                    game = false;
                }
                sw = false;
            } else if (!player1.includes(cell) && !player2.includes(cell)) {
                const colorCell = document.querySelector(`.cell${cell}`);
                colorCell.setAttribute('class', 'player2Selected');
                player2.push(cell);
                if (checkWin(sw)) {
                    gameOver('player2');
                    game = false;
                }
                sw = true;
            }
        }
    }
};

grid.addEventListener('click', cellSelect);