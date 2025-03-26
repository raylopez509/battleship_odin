import { Ship } from './index.js';

beforeEach(() => {

});

test('ship gets hit is +1 hit', () => {
  let ship = new Ship(2,0,false);
  ship.hit();
  expect(ship.timesHit).toBe(1);
});

test('show that ship is sunk', () => {
  let ship = new Ship(4,3,false);
  ship.hit();
  ship.isSunk();
  expect(ship.isSunk).toBeTruthy();
});