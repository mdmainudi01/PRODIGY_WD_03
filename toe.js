const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('resetButton');
const message = document.getElementById('message');
const playWithFriendButton = document.getElementById('playWithFriend');
const playWithAIButton = document.getElementById('playWithAI');
const board = document.getElementById('board');
const gameContainer = document.getElementById('gameContainer');
const frontPage = document.querySelector('.front-page');
const currentPlayerDisplay = document.getElementById('currentPlayer');
const popup = document.getElementById('popup');
const popupContent = document.getElementById('popupContent');
const popupMessage = document.getElementById('popupMessage');
const closePopup = document.getElementById('closePopup');

let currentPlayer = 'X';
let boardState = ['', '', '', '', '', '', '', '', ''];
let isGameOver = false;
let isVsAI = false;

playWithFriendButton.addEventListener('click', () => startGame(false));
playWithAIButton.addEventListener('click', () => startGame(true));
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);
closePopup.addEventListener('click', closePopupBox);

function startGame(vsAI) {
    isVsAI = vsAI;
    gameContainer.style.display = 'block';
    frontPage.style.display = 'none';
}

function handleCellClick(e) {
    const index = e.target.getAttribute('data-index');
    if (boardState[index] === '' && !isGameOver) {
        boardState[index] = currentPlayer;
        e.target.innerHTML = currentPlayer === 'X' ? '❌' : '⭕';
        if (checkWin()) {
            showPopup(`Player ${currentPlayer} wins!`);
            isGameOver = true;
        } else if (boardState.every(cell => cell !== '')) {
            showPopup('It\'s a draw!');
            isGameOver = true;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            currentPlayerDisplay.textContent = `Current Player: ${currentPlayer}`;
            if (isVsAI && currentPlayer === 'O') {
                setTimeout(aiMove, 300); // Delay AI move by 0.3 seconds
            }
        }
    }
}

function aiMove() {
    let availableCells = boardState.map((cell, index) => cell === '' ? index : null).filter(val => val !== null);
    let move = availableCells[Math.floor(Math.random() * availableCells.length)];
    boardState[move] = 'O';
    document.querySelector(`.cell[data-index="${move}"]`).innerHTML = '⭕';
    if (checkWin()) {
        showPopup('AI wins!');
        isGameOver = true;
    } else if (boardState.every(cell => cell !== '')) {
        showPopup('It\'s a draw!');
        isGameOver = true;
    } else {
        currentPlayer = 'X';
        currentPlayerDisplay.textContent = `Current Player: ${currentPlayer}`;
    }
}

function checkWin() {
    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    return winPatterns.some(pattern => {
        return pattern.every(index => boardState[index] === currentPlayer);
    });
}

function resetGame() {
    boardState = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell => cell.innerHTML = '');
    currentPlayer = 'X';
    isGameOver = false;
    message.textContent = '';
    currentPlayerDisplay.textContent = `Current Player: ${currentPlayer}`;
    gameContainer.style.display = 'none';
    frontPage.style.display = 'block';
}

function showPopup(msg) {
    popupMessage.textContent = msg;
    popup.style.display = 'flex';
}

function closePopupBox() {
    popup.style.display = 'none';
    resetGame();
}