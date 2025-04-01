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

test('cant place ship', () => {
  let board = new Gameboard(10,10);
  let ship = new Ship(3,0,false);
  let result = board.placeShip(ship,8,0,true);
  expect(result).toMatch(/error placing ship/);
})

test('correctly placed ship', () => {
  let board = new Gameboard(10,10);
  let ship = new Ship(2,0,false);
  let result = board.placeShip(ship,8,0,true);
  expect(result).toMatch(/placed ship/);  
})

test('ship are in each spot', () => {
  let board = new Gameboard(10,10);
  let ship = new Ship(3,0,false);
  let result = board.placeShip(ship,7,0,true);
  expect(board.board[7][0]).toEqual(ship);
  expect(board.board[8][0]).toEqual(ship);
  expect(board.board[9][0]).toEqual(ship);
})

test('ship hits get increased', () => {
  let board = new Gameboard(10,10);
  let ship = new Ship(3,0,false);
  board.placeShip(ship,7,0,true);
  board.board[7][0].hit();
  expect(board.board[7][0].timesHit).toBe(1);
  expect(ship.timesHit).toBe(1);
});