const bgm = new Audio("Backgroundmusic.mp3")
bgm.play()

let board = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
];
let score = 0;

window.onload = function () {
    setGame();
}

function setGame() {
    board = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ];
    score = 0;
    updateBoard();
    setTwo();
    setTwo();
}

function updateBoard() {
    const boardElement = document.getElementById('board');
    const scoreElement = document.getElementById('score');
    boardElement.innerHTML = '';
    scoreElement.innerText = `${score}`;

    for (let R = 0; R < 3; R++) {
        for (let C = 0; C < 3; C++) {
            const tile = document.createElement('div');
            tile.classList.add('tile');
            tile.innerText = board[R][C] !== 0 ? board[R][C] : '';
            boardElement.appendChild(tile);
        }
    }
}

function setTwo() {
    const emptyTiles = getEmptyTiles();
    if (emptyTiles.length > 0) {
        const randomIndex = Math.floor(Math.random() * emptyTiles.length);
        const [R, C] = emptyTiles[randomIndex];
        board[R][C] = 2;
        updateBoard();
    }
}

function getEmptyTiles() {
    const emptyTiles = [];
    for (let R = 0; R < 3; R++) {
        for (let C = 0; C < 3; C++) {
            if (board[R][C] === 0) {
                emptyTiles.push([R, C]);
            }
        }
    }
    return emptyTiles;
}

document.addEventListener('keydown',function (a) {

    if (a.code === 'ArrowUp') {
        slideup();
        setTwo();
    }
     else if (a.code === 'ArrowDown') {
        slidedown();
        setTwo();
    }
     else if (a.code === 'ArrowLeft') {
        slideleft();
        setTwo();
    }
     else if (a.code === 'ArrowRight') {
        slideright();
        setTwo();
    }
});
function slide(row) {

    row = row.filter(num => num !== 0);

    for (let i = 0; i < row.length - 1; i++) {

        if (row[i] === row[i + 1]) {
            row[i] *= 2;
            row[i + 1] = 0;
            score += row[i];
        }
    }

    row = row.filter(num => num !== 0);

    while (row.length < 3) {
        row.push(0);
    }

    return row;
}
function slideup() {

    for (let C = 0; C < 3; C++) {
        const col = [board[0][C], board[1][C], board[2][C]];
        const newr = slide(col);


        for (let R = 0; R < 3; R++) {
            board[R][C] = newr[R];
        }

    }
    updateBoard();
}
function slidedown() {
    for (let C = 0; C < 3; C++) {
        const col = [board[0][C], board[1][C], board[2][C]];
        const rowreversed = col.reverse();
        const newr = slide(rowreversed).reverse();


        for (let R = 0; R < 3; R++) {
            board[R][C] = newr[R];
        }
    }
    updateBoard();
}

function slideleft() {
    for (let R = 0; R < 3; R++) {
        const row = board[R];
        const newr = slide(row);
        board[R] = newr;
    }
    updateBoard();
}

function slideright() {
    for (let R = 0; R < 3; R++) {
        const row = board[R].reverse();
        const newr = slide(row).reverse();
        board[R] = newr;
    }
    updateBoard();
}



