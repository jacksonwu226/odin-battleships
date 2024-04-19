import Ship from "./ship";

export default class Gameboard {
  constructor(row=10, col=10) {
    this.checkDimensions(row, col);
    this._ships = [];
    this._rows = row;
    this._cols = col;
    this._grid = Array.from({ length: row }, () => Array(col).fill(0));
    this._attacked =  Array.from({ length: row }, () => Array(col).fill(false));
  }

  checkDimensions(row,col){
    if(row < 0 || col < 0){
      throw new Error("Invalid dimensions: Length and height must be greater than 0")
    }
  }

  get grid() {
    return this._grid;
  }

  get attacked(){
    return this._attacked;
  }

  get rows(){
    return this._rows;
  }

  get cols() {
    return this._cols;
  }

  get missedAttackCount(){
    let count = 0;
    for(let i = 0; i < this._rows; i += 1){
      for(let j = 0; j < this._cols; j += 1){
        if(!(this._grid[i][j] instanceof Ship) && this._attacked[i][j] === true){
          count +=1;
        }
      }
    }
    return count;
  }

  get isAllShipsSunk() {
    return this._ships.every(ship => ship.isSunk());
  }
  
  // places the ship in the position if valid
  placeShip(ship, row, col, isVertical) {
    if (!this.isValidPlacement(ship.length, row, col, isVertical)) {
      return;
    }
    this._ships.push(ship);
    if (isVertical) {
      for (let i = 0; i < ship.length; i += 1) {
        this._grid[row + i][col] = ship;
      }
    } else {
      for (let i = 0; i < ship.length; i += 1) {
        this._grid[row][col + i] = ship;
      }
    }
  }

  // checks to see if the ship placement is valid, ie there is space
  isValidPlacement(length, row, col, isVertical) {
    if (isVertical) {
      for (let i = 0; i < length; i += 1) {
        if (this.isValidCoord(row + i, col) && !(this._grid[row + i][col] instanceof Ship)) {
          continue;
        } else {
          return false;
        }
      }
    } else {
      for (let i = 0; i < length; i += 1) {
        if (this.isValidCoord(row, col + i) && !(this._grid[row][col + i] instanceof Ship)) {
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
    return row >= 0 && row < this._rows && col >= 0 && col < this._cols;
  }

  // this function receives an attack
  receiveAttack(row, col) {
    if(!this.isValidCoord(row,col) || this._attacked[row][col]){
      return false;
    }
    this._attacked[row][col] = true;
    if (this._grid[row][col] instanceof Ship) {
      this._grid[row][col].hit([row, col]);
    }
    return true;
  }
}
