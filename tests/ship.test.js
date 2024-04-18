import Ship from "../src/modules/ship"

describe("test ship functions",() => {
  let ship;
  beforeAll(()=>{
    ship = new Ship(2);
  });
  
  test(("check if new ship of health=2 is sunken"), ()=>{
    expect(ship.isSunk()).toBeFalsy();
  })
  test(("check if ship will sink after 1 damage (1 health)"), () => {
    ship.hit();
    expect(ship.isSunk()).toBeFalsy();
  })
  test(("check if ship will sink after 1 damage (0 health)"), () => {
    ship.hit();
    expect(ship.isSunk()).toBeTruthy();
  })
});