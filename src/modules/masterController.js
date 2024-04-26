import GameController from "./gameController";
import UI from "./ui";

export default class MasterController{
  constructor(){
    this.uiController = new UI();
    this.gameController = new GameController();
    this.uiController.renderPlayer(this.gameController.player1, true);
    this.uiController.renderPlayer(this.gameController.player2, false);
    this.attachEnemyBoardClickListener();
  }

  attachEnemyBoardClickListener() {
    const enemyBoardContainer = document.querySelector("#player-2 .board-container");
    enemyBoardContainer.addEventListener("click", (event) => {
      const clickedCell = event.target;
      const row = parseInt(clickedCell.getAttribute("data-row"));
      const col = parseInt(clickedCell.getAttribute("data-col"));

      // Check if the clicked cell is on the enemy board and handle the click
      if (clickedCell.classList.contains("cols") && !clickedCell.classList.contains("attacked")) {
        this.handleEnemyBoardClick(row, col);
      }
    });
  }

  handleEnemyBoardClick(row,col){

    if(!this.gameController.isGameOver()){
    this.gameController.playRound(row,col);
    this.uiController.renderPlayer(this.gameController.player2, false);
    }
    if(!this.gameController.isGameOver()){
      this.gameController.playRandomRound();
      this.uiController.renderPlayer(this.gameController.player1, true);  
    }

  }
}