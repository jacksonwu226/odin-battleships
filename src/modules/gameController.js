import Player from "./player";
import Ship from "./ship";
import Gameboard from "./gameboard";
import UI from "./ui";

export default class GameController{
  constructor(player1Name="Player1", player2Name="NPC"){
    this.players = [new Player(player1Name), new Player(player2Name)];
    this.activePlayer = this.players[0];
    this.placeShips(this.players[0]);
    this.placeShips(this.players[1]);
  }

  switchPlayerTurn(){
    this.activePlayer = this.activePlayer === this.players[0] ? this.players[1] : this.players[0]; 
  }

  get player1(){
    return this.players[0];
  }

  get player2(){
    return this.players[1];
  }

  generateShips(){
    const carrier = new Ship(5);
    const battleship = new Ship(4);
    const destroyer = new Ship(3);
    const submarine = new Ship(3);
    const patrolBoat = new Ship(2);
    return {
      carrier,
      battleship,
      destroyer,
      submarine,
      patrolBoat
    }
  }

  placeShips(player){
    const ships = this.generateShips();
    const row = 0;
    const col = 0;
    let i = 0;
    for (const shipType in ships) {
      player.placeShip(ships[shipType] , row+i, col, false);
      i += 1;
    }
  }

}