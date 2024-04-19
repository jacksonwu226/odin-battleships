import Ship from "./ship";

export default class Gameboard {
  constructor(row, col) {
    this.ships = [];
    this.rows = row;
    this.cols = col;
    this.board = Array.from({ length: row }, () => Array(col).fill(0));
    this.visited =  Array.from({ length: row }, () => Array(col).fill(false));
  }

  get grid() {
    return this.board;
  }

  get attacked(){
    return this.visited;
  }

  get missedAttackCount(){
    let count = 0;
    for(let i = 0; i < this.rows; i += 1){
      for(let j = 0; j < this.cols; j += 1){
        if(!(this.board[i][j] instanceof Ship) && this.visited[i][j] === true){
          count +=1;
        }
      }
    }
    return count;
  }

  get allShipsSunk() {
    return this.ships.every(ship => ship.isSunk());
  }
  
  // places the ship in the position if valid
  placeShip(ship, row, col, isVertical) {
    if (!this.isValidPlacement(ship.length, row, col, isVertical)) {
      return;
    }
    this.ships.push(ship);
    if (isVertical) {
      for (let i = 0; i < ship.length; i += 1) {
        this.board[row + i][col] = ship;
      }
    } else {
      for (let i = 0; i < ship.length; i += 1) {
        this.board[row][col + i] = ship;
      }
    }
  }

  // checks to see if the ship placement is valid, ie there is space
  isValidPlacement(length, row, col, isVertical) {
    if (isVertical) {
      for (let i = 0; i < length; i += 1) {
        if (this.isValidCoord(row + i, col) && !(this.board[row + i][col] instanceof Ship)) {
          continue;
        } else {
          return false;
        }
      }
    } else {
      for (let i = 0; i < length; i += 1) {
        if (this.isValidCoord(row, col + i) && !(this.board[row][col + i] instanceof Ship)) {
          continue;
        } else {
          return false;
        }
      }
    }
    return true;
  }

  // this function checks to see if the row/col that we're checking are within bounds
  isValidCoord(row, col) {
    return row >= 0 && row < this.rows && col >= 0 && col < this.cols;
  }

  receiveAttack(row, col) {
    this.visited[row][col] = true;
    if (this.board[row][col] instanceof Ship) {
      this.board[row][col].hit([row, col]);
    }
  }
}
