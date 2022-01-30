import Board from "./Board.js";

var board = new Board();

const inputList = document.querySelectorAll("input");
const button = document.getElementById("but");

inputList.forEach((input) => {
  input.addEventListener("click", () => {
    board.markSquare(input.id);
  });
});

button.addEventListener("click", () => {
  inputList.forEach((input) => {
    input.value = "";
  });
  board.reset();
});
