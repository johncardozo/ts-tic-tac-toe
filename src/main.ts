import "./scss/style.scss";
import { EMPTY, CIRCLE, CROSS, data } from "./data";

// Gets DOM elements
const board = document.getElementById("board") as HTMLElement;
const winner = document.getElementById("winner") as HTMLElement;

// Current player
let current = CIRCLE;

/**
 * Create the board cells base on data values
 */
function initGame() {
  // Loops through data array
  for (let index = 0; index < data.length; index++) {
    // Create the cell
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.setAttribute("data-id", index.toString());
    // Handle click on cell
    cell.addEventListener("click", handlerClick);
    // Add the new cell to the board
    board.appendChild(cell);
  }
}

/**
 * Handle the click made by the user to a board cell
 * @param event click to a cell
 */
function handlerClick(event: MouseEvent) {
  if (event.target instanceof HTMLElement) {
    // Get cell id
    const id: number = Number(event.target.dataset.id);
    // Check cell value on data array
    if (data[id] === EMPTY) {
      // Store the new play
      data[id] = current;
      // Update the cell
      updateCell(event.target);
      // Avoid the click on the cell again
      event.target.removeEventListener("click", handlerClick);
      // Check if there's a winner
      if (checkWinner()) {
        // Display the winner message
        winner.style.display = "block";
        winner.textContent = `The winner is ${current}`;
      } else {
        // Switch player
        current = current === CIRCLE ? CROSS : CIRCLE;
      }
    }
  }
}

/**
 * Update the content and style of a board cell
 * @param target cell to be updated
 */
function updateCell(target: HTMLElement) {
  // Update the style
  target.classList.add(current);
  // Update the icon
  target.innerHTML =
    current === CIRCLE
      ? '<i class="fa-regular fa-circle"></i>'
      : '<i class="fa-solid fa-x"></i>';
}

/**
 * Check if there's a winner
 * @returns true if there's a winner and false otherwise
 */
function checkWinner() {
  const matches = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  // Loop through all possible matches
  for (const match of matches) {
    // Get current values for each position
    let values = match.map((position) => data[position]);
    // Verify if all values are equal to current player
    let result = values.every((value) => value === current);
    // If finds a tic-tac-toe it returns
    if (result) return true;
  }
  return false;
}

// Start the game
initGame();
