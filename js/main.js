import Board from "./Board.js";

var board = new Board();

console.log(board.getBoard());

board.markSquare("b2");

console.log(board.getBoard());

board.markSquare("b4");

console.log(board.getBoard());
