import Player from "./player";
import Gameboard from "./gameboard";
import Ship from "./ship";
import GameController from "./gameController";

export default class UI{
  constructor(){
    this.body = document.querySelector("body");
    this.createBoilerPlate();
    this.cacheDom();
  }

  createBoilerPlate(){
    this.body.innerHTML = `
    <div class="wrapper">
      <div class="header">
      </div>
      <div class="content">
        <div class="player-container" id="player-1">
          <div class="name-container">
          </div>
          <div class="board-container">
          </div>
        </div>
        <div class="player-container" id="player-2">
          <div class="name-container">
          </div>
          <div class="board-container">
          </div>
        </div>
      </div>
      <div class="footer">
        <p>
          <a href="https://github.com/jacksonwu226">
        Copyright ©
        <script>
          document.write(new Date().getFullYear())
        </script>
        Jackson Wu
          </a> 
        </p>
      </div>
    </div>`
  }

  cacheDom(){
    this.wrapper = document.querySelector(".wrapper");
    this.content = document.querySelector(".content");
    this.footer = document.querySelector(".footer");
    this.playerOneContainer = document.querySelector("#player-1");
    this.playerTwoContainer = document.querySelector("#player-2");
  }

  renderPlayer(player, isPlayer1){
    if(isPlayer1){
      this.renderName(player, this.playerOneContainer);
      this.renderPlayerBoard(player, this.playerOneContainer);
    }else{
      this.renderName(player, this.playerTwoContainer);
      this.renderPlayerBoard(player, this.playerTwoContainer);
    }
  }

  renderName(player, playerContainer){
    const nameContainer = playerContainer.querySelector(".name-container");
    this.clearContent(nameContainer);
    const name = document.createElement("p");
    name.classList.add("name");
    name.textContent = player.name;
    nameContainer.appendChild(name);
  }

  renderPlayerBoard(player, playerContainer){
    const boardContainer = playerContainer.querySelector(".board-container");
    this.clearContent(boardContainer);

    const boardGrid = document.createElement("div");
    boardGrid.classList.add("board-grid");

    for(let row = 0; row < player.board.rows; row +=1){
      const rowDom = document.createElement("div");
      rowDom.classList.add("rows")  ;
      for(let col = 0; col < player.board.cols; col +=1){
        const colDom = document.createElement("div")
        colDom.setAttribute("data-row", row); // Set data attribute for row
        colDom.setAttribute("data-col", col); // Set data attribute for column
        colDom.classList.add("cols");

        if(player.board.grid[row][col] instanceof Ship){
          colDom.classList.add("ship");
        }
        if(player.board.attacked[row][col] === true){
          colDom.classList.add("attacked");
        }
        rowDom.appendChild(colDom)
      }
      boardGrid.appendChild(rowDom);    
    }
    boardContainer.appendChild(boardGrid);
  }

  clearContent(node){
    while(node.firstChild){
      node.removeChild(node.firstChild)
    }
  }
}