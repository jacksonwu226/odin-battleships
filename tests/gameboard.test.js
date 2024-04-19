import Gameboard from "../src/modules/gameboard";
import Ship from "../src/modules/ship";

describe("Gameboard setup", () => {
  let gameboard;
  beforeEach(() => {
    gameboard = new Gameboard(3, 4); // Example: 3x4 gameboard
  });
  test("gameboard with no row/col inputs", () => {
    const gameboard0 = new Gameboard();
    expect(gameboard0.grid.length).toBe(10);
    expect(gameboard0.grid[0].length).toBe(10);
  })
  test("Creating a gameboard with negative dimensions throws an error", () => {
    expect(()=> new Gameboard(-1,-1)).toThrowError("Invalid dimensions");
  })

  test("Gameboard initializes with correct dimensions", () => {
    expect(gameboard.grid.length).toBe(3);
    expect(gameboard.grid[0].length).toBe(4);
  });

  test("Gameboard grid is initialized correctly with false values", () => {
    expect(gameboard.grid.every((row) => row.every((cell) => cell === 0))).toBe(
      true,
    );
  });

  test("Gameboard grid is mutable", () => {
    gameboard.grid[1][1] = 0;
    expect(gameboard.grid[1][1]).toBe(0);
  });
});

describe("Gameboard placeship vertical", () => {
  let gameboard;
  let ship1;
  let ship11;
  let ship2;
  beforeAll(() => {
    gameboard = new Gameboard(5, 5);
    ship1 = new Ship(1);
    ship11 = new Ship(1);
    ship2 = new Ship(2);
  });
  test("placing a ship at an out-of-bounds coordinate", () => {
    // Attempt to place a ship at an out-of-bounds coordinate
    gameboard.placeShip(ship1, 6, 6, true); // Assuming 6, 6 is out of bounds
    // Expect the grid to remain unchanged
    expect(gameboard.grid).toEqual([
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
    ]);
  });
  test("placing a ship at (0,0)", () => {
    gameboard.placeShip(ship1, 0, 0, true);
    expect(gameboard.grid[0][0]).not.toBe(ship11);
    expect(gameboard.grid[0][0]).toBe(ship1);
  });
  test("placing another ship at (0,0)", () => {
    gameboard.placeShip(ship2, 0, 0, true);
    expect(gameboard.grid[0][0]).toBe(ship1);
  });
  test("placing a ship at at an invalid coordinate", () => {
    gameboard.placeShip(ship2, 4, 4, true);
    expect(gameboard.grid[4][4]).toBe(0);
  });
});
describe("Gameboard placeship horizontal", () => {
  let gameboard;
  let ship1;
  let ship11;
  let ship2;
  beforeAll(() => {
    gameboard = new Gameboard(5, 5);
    ship1 = new Ship(1);
    ship11 = new Ship(1);
    ship2 = new Ship(2);
  });
  test("placing a ship at an out-of-bounds coordinate", () => {
    gameboard.placeShip(ship1, 6, 6, false);
    // Expect the grid to remain unchanged
    expect(gameboard.grid).toEqual([
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
    ]);
  });
  test("placing a ship at (0,0)", () => {
    gameboard.placeShip(ship1, 0, 0, false);
    expect(gameboard.grid[0][0]).not.toBe(ship11);
    expect(gameboard.grid[0][0]).toBe(ship1);
  });
  test("placing another ship at (0,0)", () => {
    gameboard.placeShip(ship2, 0, 0, false);
    expect(gameboard.grid[0][0]).toBe(ship1);
  });
  test("placing a ship at at an invalid coordinate", () => {
    gameboard.placeShip(ship2, 4, 4, false);
    expect(gameboard.grid[4][4]).toBe(0);
  });
});

describe("Gameboard receiveAttacks function", () => {
  let gameboard;
  let ship;
  beforeAll(()=>{
    gameboard = new Gameboard(5,5);
    ship = new Ship(3);
    gameboard.placeShip(ship, 0, 0, true);
  })
  test("Ship([0,2], 0) receiving attack at (0,0) - hit", () => {
    gameboard.receiveAttack(0,0)
    expect(gameboard.grid).toEqual([
      [ship, 0, 0, 0, 0],
      [ship, 0, 0, 0, 0],
      [ship, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
    ]);
    expect(gameboard.attacked).toEqual([
      [true, false, false, false, false],
      [false, false, false, false, false],
      [false, false, false, false, false],
      [false, false, false, false, false],
      [false, false, false, false, false]
    ]);
  })
  test("Ship([0,2], 0) receiving attack at (1,0) - hit", () => {
    gameboard.receiveAttack(1,0)
    expect(gameboard.grid).toEqual([
      [ship, 0, 0, 0, 0],
      [ship, 0, 0, 0, 0],
      [ship, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
    ]);
    expect(gameboard.attacked).toEqual([
      [true, false, false, false, false],
      [true, false, false, false, false],
      [false, false, false, false, false],
      [false, false, false, false, false],
      [false, false, false, false, false]
    ]);
  })
  test("Ship([0,2], 0) receiving attack at (1,1) - miss", () => {
    gameboard.receiveAttack(1,1)
    expect(gameboard.grid).toEqual([
      [ship, 0, 0, 0, 0],
      [ship, 0, 0, 0, 0],
      [ship, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
    ]);
    expect(gameboard.attacked).toEqual([
      [true, false, false, false, false],
      [true, true, false, false, false],
      [false, false, false, false, false],
      [false, false, false, false, false],
      [false, false, false, false, false]
    ]);
  })
});

describe("Gameboard missedAttackCount is allShipsSunk function", () => {
  let gameboard;
  let ship;
  beforeAll(()=>{
    gameboard = new Gameboard(5,5);
    ship = new Ship(3);
    gameboard.placeShip(ship, 0, 0, true);
  })
  test("Ship([0,2], 0) receiving attack at (0,0) - hit, ship alive", () => {
    gameboard.receiveAttack(0,0)
    expect(gameboard.missedAttackCount).toBe(0);
    expect(gameboard.allShipsSunk).toBe(false);
  })
  test("Ship([0,2], 0) receiving attack at (1,0) - hit, ship alive", () => {
    gameboard.receiveAttack(1,0)
    expect(gameboard.allShipsSunk).toBe(false);
    expect(gameboard.missedAttackCount).toBe(0);
  })
  test("Ship([0,2], 0) receiving attack at (1,0) twice, no increase in miss", () => {
    gameboard.receiveAttack(1,0)
    expect(gameboard.allShipsSunk).toBe(false);
    expect(gameboard.missedAttackCount).toBe(0);
  })
  test("Ship([0,2], 0) receiving attack at (1,1) - miss, ship alive", () => {
    gameboard.receiveAttack(1,1);
    expect(gameboard.allShipsSunk).toBe(false);
    expect(gameboard.missedAttackCount).toBe(1);
  })
  test("Ship([0,2], 0) receiving attack at (1,2) - miss, ship alive", () => {
    gameboard.receiveAttack(1,2);
    expect(gameboard.allShipsSunk).toBe(false);
    expect(gameboard.missedAttackCount).toBe(2);
  })
  test("Ship([0,2], 0) receiving attack at (1,2) second time - miss, ship alive", () => {
    gameboard.receiveAttack(1,2);
    expect(gameboard.allShipsSunk).toBe(false);
    expect(gameboard.missedAttackCount).toBe(2);
  })
  test("Ship([0,2], 0) receiving attack at (0,2) - hit, all ships sunk ", () => {
    gameboard.receiveAttack(2,0);
    expect(gameboard.missedAttackCount).toBe(2);
    expect(gameboard.allShipsSunk).toBe(true);
  })
});
