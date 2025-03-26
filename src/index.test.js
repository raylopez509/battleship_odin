import { Ship, Gameboard } from './index.js';

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

test('was a ship actually placed on the board', () => {
  let board = new Gameboard(10,10);
  // console.log(board.board);
  // console.log(board.board[0]);
  let x = [10][10];
  console.log(x);
  expect(board[2][3]).toBe(5);
});