import Ship from "../src/modules/ship";

describe("test ship functions", () => {
  let ship;
  beforeAll(() => {
    ship = new Ship(2);
  });

  test("check if new ship of health=2 is sunken", () => {
    expect(ship.isSunk()).toBeFalsy();
  });
  test("check if ship will sink after 1 damage (1 health)", () => {
    ship.hit([1, 1]);
    expect(ship.isSunk()).toBeFalsy();
  });
  test("check if ship will sink after missing (1 health)", () => {
    ship.hit([1, 1]);
    expect(ship.isSunk()).toBeFalsy();
  });
  test("check if ship will sink after 1 damage (0 health)", () => {
    ship.hit([1, 2]);
    expect(ship.isSunk()).toBeTruthy();
  });
  test("check if ship length getter works", () => {
    expect(ship.length).toBe(2);
  });
});
