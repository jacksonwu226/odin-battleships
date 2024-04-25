import GameController from "./gameController";
import UI from "./ui";

export default class MasterController{
  constructor(){
    this.uiController = new UI();
    this.gameController = new GameController();
    this.uiController.renderPlayer(this.gameController.player1, true);
    this.uiController.renderPlayer(this.gameController.player2, false);
  }
}