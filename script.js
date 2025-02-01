// Select all cells and the restart button
const cells = document.querySelectorAll(".cell");
const restartBtn = document.getElementById("restart");

// Game state variables
let board = ["", "", "", "", "", "", "", "", ""]; // Empty board
let currentPlayer = "X"; // First player is always "X"
let gameActive = true; // Game is running

// Winning combinations (rows, columns, diagonals)
const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagonals
];

// Function to handle a player move
function handleClick(event) {
    const index = event.target.dataset.index; // Get clicked cell index

    // If the cell is already filled or game is over, ignore the click
    if (board[index] !== "" || !gameActive) return;

    // Update board and UI
    board[index] = currentPlayer;
    event.target.textContent = currentPlayer;

    // Check if we have a winner or a draw
    checkWinner();

    // Switch player (X → O or O → X)
    currentPlayer = currentPlayer === "X" ? "O" : "X";
}

// Function to check for a win or draw
function checkWinner() {
    for (let combo of winningCombinations) {
        let [a, b, c] = combo;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            gameActive = false; // Stop the game
            alert(`${board[a]} wins!`);
            return;
        }
    }

    // If board is full and no winner, it's a draw
    if (!board.includes("")) {
        gameActive = false;
        alert("It's a draw!");
    }
}

// Function to restart the game
function restartGame() {
    board = ["", "", "", "", "", "", "", "", ""]; // Reset board
    gameActive = true; // Restart game
    currentPlayer = "X"; // Start with X again

    // Clear UI
    cells.forEach(cell => cell.textContent = "");
}

// Add event listeners
cells.forEach(cell => cell.addEventListener("click", handleClick));
restartBtn.addEventListener("click", restartGame);
