import Gameboard from "./gameboard";

export default class Player {
  constructor(name = "Player") {
    this._name = name;
    this._gameBoard = new Gameboard();
  }

  get board() {
    return this._gameBoard;
  }

  set board(board) {
    this._gameBoard = board;
    this.rows = board.rows;
    this.cols = board.cols;
  }

  get name() {
    return this._name;
  }

  set name(name) {
    this._name = name;
  }

  randomAttack(enemyBoard) {
    let row;
    let col;
    do {
      row = Math.floor(Math.random() * enemyBoard.rows);
      col = Math.floor(Math.random() * enemyBoard.cols);
    } while (!this.attack(enemyBoard, row, col) && !enemyBoard.isAllAttacked);
  }

  attack(enemyBoard, row, col) {
    return enemyBoard.receiveAttack(row, col);
  }

  placeShip(ship, row, col, isVertical) {
    return this._gameBoard.placeShip(ship,row,col,isVertical);
  }
}
