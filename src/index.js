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
