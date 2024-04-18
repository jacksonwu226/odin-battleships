export default class Ship{
  constructor(health){
    this.hitPoints  = health;
  }

  hit(){
    if(this.hitPoints > 0)
      this.hitPoints -=1;
  }

  isSunk(){
    return this.hitPoints === 0;
  }
}