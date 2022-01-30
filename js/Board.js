export default class Board {
  constructor(state = [0, 0, 0, 0, 0, 0, 0, 0, 0]) {
    this.state = state;
    this.player = 1;
    this.index = -1;
  }

  reset() {
    this.state = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  }

  //Get available indices
  getAvailable() {
    var available = [];

    for (var i = 0; i < 9; i++) {
      if (this.state[i] === 0) available.push(i);
    }

    return available;
  }

  // check if board is full or not

  isFull() {
    return this.state.every((el) => {
      return el !== 0;
    });
  }

  //checks for the winner if there is one

  result() {
    // vertical check
    for (var i = 0; i < 3; i++) {
      if (
        (this.state[i] === "X" || this.state[i] === "O") &&
        this.state[i] === this.state[i + 3] &&
        this.state[i + 3] === this.state[i + 6]
      ) {
        return {
          result: "winner",
          winner: this.state[i],
        };
      }
    }

    //horizontal check
    for (var i = 0; i <= 6; i += 3) {
      if (
        (this.state[i] === "X" || this.state[i] === "O") &&
        this.state[i] === this.state[i + 1] &&
        this.state[i + 1] === this.state[i + 2]
      ) {
        return {
          result: "winner",
          winner: this.state[i],
        };
      }
    }

    // diagonal check
    if (
      (this.state[4] === "X" || this.state[4] === "O") &&
      this.state[0] === this.state[4] &&
      this.state[4] === this.state[8]
    ) {
      return {
        result: "winner",
        winner: this.state[0],
      };
    }
    if (
      (this.state[4] === "X" || this.state[4] === "O") &&
      this.state[2] === this.state[4] &&
      this.state[4] === this.state[6]
    ) {
      // alert(`${this.state[4]} wins`);
      return {
        result: "winner",
        winner: this.state[2],
      };
    }

    if (!this.isFull()) {
      return {
        result: "Game not over yet",
      };
    } else {
      return {
        result: "Draw",
      };
    }
  }

  //marks the index
  markSquare(id) {
    var square = document.getElementById(id);

    square.value = "X";

    this.player = 1 - this.player;

    var sq = parseInt(id[id.length - 1]);

    this.state[sq] = square.value;
    let res = this.result();

    if (res.winner === "X") alert("X wins");

    this.play();

    res = this.result();

    if (res.winner === "O") alert("O wins");
  }

  play() {
    const depth = this.getAvailable().length;

    var ind = this.getBestMove(false).index;

    var id = "b" + ind;

    var square = document.getElementById(id);

    square.value = "O";

    this.player = 1 - this.player;

    var sq = parseInt(id[id.length - 1]);

    this.state[sq] = "O";
  }

  getBoard() {
    return this.state;
  }

  //get best move (minimax algo)

  getBestMove(maximize) {
    var res = this.result();
    if (res.result !== "Game not over yet") {
      if (res.result === "Draw") return { score: 0 };
      if (res.winner === "O") return { score: -1 };
      if (res.winner === "X") return { score: 1 };
    }

    const empty = this.getAvailable();

    var moves = [];

    for (var i = 0; i < empty.length; i++) {
      let move = {};
      move.index = empty[i];
      if (maximize) {
        this.state[empty[i]] = "X";
        move.score = this.getBestMove(false).score;
      } else {
        this.state[empty[i]] = "O";
        move.score = this.getBestMove(true).score;
      }
      this.state[empty[i]] = 0;
      moves.push(move);
    }

    var bestMove;
    if (!maximize) {
      var bestScore = Infinity;
      for (var i = 0; i < moves.length; i++) {
        if (moves[i].score < bestScore) {
          bestScore = moves[i].score;
          bestMove = i;
        }
      }
    } else {
      var bestScore = -Infinity;
      for (var i = 0; i < moves.length; i++) {
        if (moves[i].score > bestScore) {
          bestScore = moves[i].score;
          bestMove = i;
        }
      }
    }
    return moves[bestMove];
  }
}
