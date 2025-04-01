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
  constructor(length, height) {
    this.length = length;
    this.height = height;
    this.board = [length];
    for(let i = 0; i < length; i++) {
      this.board[i] = [height];
    }
    this.missedAttacks = [];
  }
  placeShip(ship,startX, startY, placeHorizontally) {
    if(placeHorizontally) {
      if(startX + ship.length > this.length) {
        return "error placing ship";
      }
      else {
        let i = startX;
        for(let j = 0; j < ship.length; j++) {
          this.board[i][startY] = ship;
          i++;
        }
        return "placed ship";
      }
    }
  }
  receiveAttack(x, y) {
    //check coordinates
    //if hit,
    //ship.hit
    //if miss, record miss
  }
}