const board = document.getElementById('board');
const status = document.getElementById('status');
const resetButton = document.getElementById('reset');

let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let isGameActive = true;

// Function to create the board
const createBoard = () => {
    gameBoard.forEach((cell, index) => {
        const cellElement = document.createElement('div');
        cellElement.classList.add('cell');
        cellElement.setAttribute('data-index', index);
        cellElement.textContent = cell;
        cellElement.addEventListener('click', handleCellClick);
        board.appendChild(cellElement);
    });
};

// Handle cell click
const handleCellClick = (event) => {
    const cell = event.target;
    const index = cell.getAttribute('data-index');

    // Prevent changing the cell if it's already filled or the game is over
    if (gameBoard[index] || !isGameActive) {
        return;
    }

    // Update the board and UI
    gameBoard[index] = currentPlayer;
    cell.textContent = currentPlayer;

    // Check for a win or a draw
    checkResult();
};

// Check for game result
const checkResult = () => {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    let roundWon = false;
    for (let i = 0; i < winningCombinations.length; i++) {
        const [a, b, c] = winningCombinations[i];
        if (gameBoard[a] === currentPlayer && gameBoard[b] === currentPlayer && gameBoard[c] === currentPlayer) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        status.textContent = `${currentPlayer} has won!`;
        isGameActive = false;
        return;
    }

    // Check for a draw
    if (!gameBoard.includes('')) {
        status.textContent = "It's a draw!";
        isGameActive = false;
        return;
    }

    // Switch player
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    status.textContent = `It's ${currentPlayer}'s turn.`;
};

// Reset game
const resetGame = () => {
    isGameActive = true;
    currentPlayer = 'X';
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    status.textContent = `It's ${currentPlayer}'s turn.`;
    board.innerHTML = ''; // Clear the board
    createBoard(); // Create a new board
};

// Initialize the game
resetButton.addEventListener('click', resetGame);
createBoard();
status.textContent = `It's ${currentPlayer}'s turn.`;
