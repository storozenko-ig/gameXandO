const defaultGameFeild = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];

function max(a, b) {
  return a > b ? a : b;
}
function min(a, b) {
  return a < b ? a : b;
}

function XandOGame() {
  this.player1 = null;
  this.player2 = null;
  this.gameFeild = [...defaultGameFeild];
  this.complit = false;

  this.createPlayer = (name, simbl, ai) => {
    if (this.player1 == null) {
      this.player1 = { simbl: simbl ? simbl : "X", name: name, ai: ai };
    } else if (this.player2 == null) {
      this.player2 = { simbl: simbl ? simbl : "O", name: name, ai: ai };
    }
  };

  this._aiGetAi = (isAi) => {
    return this.player1.ai === isAi ? this.player1 : this.player2.ai === isAi ? this.player2 : null;
  };

  this._aiGetEmptyFields = (board) => {
    let result = [];
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] === 0) result.push([i, j]);
      }
    }
    return result;
  };

  this._aiGetBestMove = (board) => {
    let bestmove = [];
    let bestscore = -1000000;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] == 0) {
          board[i][j] = this._aiGetAi(true).simbl;
          const score = this._aiMiniMax(board, 0, false);
          board[i][j] = 0;
          if (score > bestscore) {
            bestscore = score;
            bestmove[0] = i;
            bestmove[1] = j;
          }
        }
      }
    }
    return bestmove;
  };

  this._aiMiniMax = (board, depth, maximum) => {
    const ai = this._aiGetAi(true);
    const human = this._aiGetAi(false);
    if (this.winner(board, ai)) {
      return 1;
    }
    if (this.winner(board, human)) {
      return -1;
    }
    const emptyf = this._aiGetEmptyFields(board);
    if (emptyf.length == 0) {
      return 0;
    }

    let bestscore;

    if (maximum) {
      bestscore = -1000;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (board[i][j] == 0) {
            board[i][j] = ai.simbl;
            const score = this._aiMiniMax(board, depth + 1, false);
            board[i][j] = 0;
            bestscore = max(bestscore, score);
          }
        }
      }
    } else {
      bestscore = 10000;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (board[i][j] == 0) {
            board[i][j] = human.simbl;
            const score = this._aiMiniMax(board, depth + 1, true);
            board[i][j] = 0;
            bestscore = min(bestscore, score);
          }
        }
      }
    }
    return bestscore;
  };

  this.getWhoWin = () => {
    return this.whoWin ? this.whoWin : "пока нет победителя";
  };

  this.getWhoGo = () => {
    if (!this.complit) return "нужно начать игру";
    if (this.whoGo == this.player1.name) {
      return this.player2.name;
    } else {
      return this.player1.name;
    }
  };

  this.startGame = () => {
    if (!this.player1 && !this.player2) return;
    this.complit = true;

    this.whoWin = null;
    this.whoGo = null;
    // this.gameFeild = [...defaultGameFeild];
    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < 3; j++) {
        this.gameFeild[i][j] = 0;
      }
    }
    return true;
  };

  this.go = (x, y) => {
    if (!this.complit) return;

    var turn = (x, y, player) => {
      let calcX = x;
      let calcY = y;

      if (player.ai) {
        const bmove = this._aiGetBestMove(this.gameFeild);
        calcX = bmove[0];
        calcY = bmove[1];
      }

      if (this.gameFeild[calcX][calcY] == 0) {
        this.gameFeild[calcX][calcY] = player.simbl;
        this.whoGo = player.name;
        if (this.winner(this.gameFeild, player)) {
          this.whoWin = player.name;
          this.complit = false;
        }
      }
    };
    if (this.whoGo == this.player1.name) {
      turn(x, y, this.player2);
    } else {
      turn(x, y, this.player1);
    }
    return this;
  };

  this.winner = (g, player) => {
    let result = false;
    for (let x = 0; x < 3; x++) {
      if ((g[x][0] === g[x][1] && g[x][1] === g[x][2] && g[x][1] == player.simbl) || (g[0][x] === g[1][x] && g[1][x] === g[2][x] && g[1][x] == player.simbl)) {
        result = true;
      }
    }
    if ((g[0][0] === g[1][1] && g[1][1] === g[2][2] && g[1][1] == player.simbl) || (g[0][2] === g[1][1] && g[1][1] === g[2][0] && g[1][1] == player.simbl)) {
      result = true;
    }
    return result;
  };
}
