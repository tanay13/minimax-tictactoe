export default class Board {
  constructor(state = [0, 0, 0, 0, 0, 0, 0, 0, 0]) {
    this.state = state;
    this.player = 1;
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
    // horizontal check
    for (var i = 0; i < 3; i++) {
      if (
        this.state[i][0] === this.state[i][1] &&
        this.state[i][1] === this.state[i][2]
      ) {
        return {
          result: "winner",
          winner: this.state[i][0],
        };
      }
    }

    //vertical check
    for (var i = 0; i < 3; i++) {
      if (
        this.state[0][i] === this.state[1][i] &&
        this.state[1][i] === this.state[2][i]
      ) {
        return {
          result: "winner",
          winner: this.state[0][i],
        };
      }
    }

    // diagonal check
    if (
      this.state[0][0] === this.state[1][1] &&
      this.state[1][1] === this.state[2][2]
    ) {
      return {
        result: "winner",
        winner: this.state[0][0],
      };
    }
    if (
      this.state[0][2] === this.state[1][1] &&
      this.state[1][1] === this.state[2][0]
    ) {
      return {
        result: "winner",
        winner: this.state[0][0],
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

    square.value = this.player === 1 ? "X" : "O";

    this.player = 0;

    var sq = parseInt(id[id.length - 1]);

    this.state[sq] = square.value;
  }

  getBoard() {
    return this.state;
  }
}
