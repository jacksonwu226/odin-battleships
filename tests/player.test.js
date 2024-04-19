import Gameboard from "../src/modules/gameboard";
import Player from "../src/modules/player";

describe("Player constructor", () => {
  let player;
  let player2;
  beforeAll(()=>{
    player = new Player();
    player2 = new Player("Player 2");
  });
  test("check player names", () => {
    expect(player.name).toBe("Player");
    expect(player2.name).toBe("Player 2");
  })
  test("check if both boards are the same", () => {
    expect(player.board).not.toBe(player2.board);
  })
})

describe("Player set board/name", () => {
  let player1;
  let otherBoard;
  beforeAll(()=>{
    otherBoard = new Gameboard(5,5);
    player1 = new Player("Player 1");
  })

  test("Set player 1 board to a 5x5 board",() =>{
    expect(player1.board.rows).toBe(10);
    expect(player1.board.cols).toBe(10);
    player1.board = otherBoard;
    expect(player1.board.rows).toBe(5);
    expect(player1.board.cols).toBe(5);  
  });

  test("Set player 1 name to Halo", ()=>{
    player1.name = "Halo";
    expect(player1.name).toBe("Halo");
  });
  test("Set player 1 name to empty string", ()=>{
    player1.name = "";
    expect(player1.name).toBe("");
  });
});

test("Attack enemy board", () => {
  const player = new Player();
  const enemyBoard = new Gameboard(3, 3);
  // Repeat the test multiple times to increase confidence in randomness
  expect(enemyBoard.attacked).toEqual([
    [false, false, false],
    [false, false, false],
    [false, false, false],
  ])
  player.attack(enemyBoard, 0,0);
  expect(enemyBoard.attacked).toEqual([
    [true, false, false],
    [false, false, false],
    [false, false, false],
  ])
});

describe("Random attack on enemy board", () =>{
  let player;
  let enemyBoard1;
  let enemyBoard10;
  let enemyBoard;
  beforeAll(()=>{
    player = new Player();
    enemyBoard1 = new Gameboard(3,3);
    enemyBoard = new Gameboard(3,3);
    enemyBoard10 = new Gameboard();
  });
  test("random attack should attack all cells eventually", () => {
    expect(enemyBoard1.attacked).toEqual([
      [false, false, false],
      [false, false, false],
      [false, false, false],
    ]);
    for(let i = 0; i < 9; i += 1){
      player.randomAttack(enemyBoard1);
    }
    expect(enemyBoard1.attacked).toEqual([
      [true, true, true],
      [true, true, true],
      [true, true, true],
    ]);
  })
  test("random attack should stop and not infinitely loop if no cells to attack", () => {

    for(let i = 0; i < 200; i += 1){
      player.randomAttack(enemyBoard10);
    }
    expect(enemyBoard10.attacked.every(arr => arr.every(val => val === true))).toBe(true);
  })
  test("random attack on top left", () => {
    global.Math.random = () => 0;
    player.randomAttack(enemyBoard);
    expect(enemyBoard.attacked).toEqual([
      [true, false, false],
      [false, false, false],
      [false, false, false],
    ]);
  })
  test("random attack on bottom right", () => {
    global.Math.random = () => 0.9;
    player.randomAttack(enemyBoard);
    expect(enemyBoard.attacked).toEqual([
      [true, false, false],
      [false, false, false],
      [false, false, true],
    ])
  })
  test("random attack on middle middle", () => {
    global.Math.random = () => 0.5;
    player.randomAttack(enemyBoard);
    expect(enemyBoard.attacked).toEqual([
      [true, false, false],
      [false, true, false],
      [false, false, true],
    ])
  })
})