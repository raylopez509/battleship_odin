console.log("test");

export class Ship {
  constructor(length, timesHit, sunk) {
    this.length = length;
    this.timesHit = timesHit;
    this.sunk = sunk;
  }
  hit() {
    this.timesHit++;
  }
  isSunk() {
    if(this.timesHit >= this.length) {
      this.sunk = true;
    }
    else {
      this.sunk = false;
    }
    return this.sunk;
  }
}

export class Gameboard {
  constructor(x, y) {
    this.board = [x];
    for(let i = 0; i < x; i++) {
      this.board[i] = [y];
    }
    this.missedAttacks = [];
  }
  placeShip(startX, startY, placeHorizontally) {

  }
  receiveAttack(x, y) {
    //check coordinates
    //if hit,
    //ship.hit
    //if miss, record miss
  }
}

let x = [10][10];

console.log(x);