export default class Ship {
  constructor(length) {
    // coordinates.length should equal length
    this.hitPoints = length;
    this.hits = new Set();
  }

  get length() {
    return this.hitPoints;
  }

  hit(coord) {
    this.hits.add(coord.toString());
  }

  isSunk() {
    return this.hits.size === this.hitPoints;
  }
}
