const cells = [...document.querySelectorAll(".cell")];
const currentTurnLabel = document.querySelector(".current_turn");
const resetButton = document.querySelector(".button");

const cellArray = new Array(9).fill(null);
const playerOne = "X";
const playerTwo = "O";
let currentTurn = playerOne;
let gameStatus = 1;

const winCondition = () => {
  const winCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (const combination of winCombinations) {
    let [a, b, c] = combination;
    console.log(a, b, c);
    if (
      cellArray[a] &&
      cellArray[a] === cellArray[b] &&
      cellArray[a] === cellArray[c]
    )
      return true;
  }
  return false;
};

const cellSelect = (e) => {
  const id = e.target.id;
  if (!cellArray[id] && gameStatus) {
    cellArray[id] = currentTurn;
    e.target.innerText = currentTurn;

    if (winCondition()) {
      currentTurnLabel.innerText = `${currentTurn} WINS! Click on Reset`;
      gameStatus = 0;
      return;
    }
    if (!cellArray.includes(null)) {
      currentTurnLabel.innerText = `DRAW!`;
      gameStatus = 0;
      return;
    }
    currentTurn = currentTurn === playerOne ? playerTwo : playerOne;
    currentTurnLabel.innerText = `${currentTurn}'s Turn`;
  }
};

const boardRender = () => {
  cells.forEach((cell, i) => {
    let cssStyle = "";
    if (i < 3) cssStyle += `border-bottom: 4px solid black;`;
    if (i > 5) cssStyle += `border-top: 4px solid black;`;
    if (i % 3 === 0) cssStyle += `border-right: 4px solid black;`;
    if (i % 3 === 2) cssStyle += `border-left: 4px solid black;`;
    cell.style = cssStyle;
    cell.addEventListener("click", cellSelect);
  });
};

const resetGame = function () {
  cellArray.fill(null);
  cells.forEach((cell) => (cell.innerText = ""));
  currentTurn = playerOne;
  currentTurnLabel.innerText = `X's Turn`;
  gameStatus = 1;
};

resetButton.addEventListener("click", resetGame);

boardRender();
