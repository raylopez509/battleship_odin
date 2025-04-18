export class Ship {
  constructor(length, timesHit, sunk) {
    this.length = length;
    this.timesHit = timesHit;
    this.sunk = sunk;
  }
  hit() {
    this.timesHit++;
    this.isSunk();
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
    this.ships = []
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
        this.ships.push(ship);
        return "placed ship";
      }
    }
    else {
      if(startY + ship.length > this.length) {
        return "error placing ship";
      }
      else {
        let i = startY;
        for(let j = 0; j < ship.length; j++) {
          this.board[startX][i] = ship;
          i++;
        }
        this.ships.push(ship);
        return "placed ship";
      }
    }
  }

  placeShipRandomly(ship) {
    let randIfHorizontally = Math.random() < 0.5;
    // let randIfHorizontally = true;
    let shipLength = ship.length;
    let canLegallyPlace = false;
    while(!canLegallyPlace) {
      let randX, randY;
      if(randIfHorizontally) {
        randX = Math.floor(Math.random() * (this.length - shipLength + 1));
        randY = Math.floor(Math.random() * this.height);
        canLegallyPlace = true;
        for(let x = randX; x < randX + shipLength; x++) {
          if(this.board[x][randY] instanceof Ship) {
            canLegallyPlace = false;
          }
        }

      }
      else {
        randX = Math.floor(Math.random() * this.height);
        randY = Math.floor(Math.random() * (this.length - shipLength + 1));
        canLegallyPlace = true;
        for(let y = randY; y < randY + shipLength;y++) {
          if(this.board[randX][y] instanceof Ship) {
            canLegallyPlace = false;
          }
        }
      }
      if(canLegallyPlace) {
        this.placeShip(ship,randX,randY,randIfHorizontally);
      }
    }
  }
  
  receiveAttack(x, y) {
    if(this.board[x][y] instanceof Ship) {
      this.board[x][y].hit();
      return true;
    }
    else {
      this.missedAttacks.push({x:x, y:y});
      return false;
    }
  }
  alreadyReceivedAttack(x, y) {
    for(let attack of this.missedAttacks) {
      if(attack.x === x && attack.y === y) {
        return true;
      }
    }
    return false;
  }
  reportAllSinksSunk() {
    for(let ship of this.ships) {
      if(ship.sunk == false) {
        return false;
      }
    }
    return true;
  }
}

export class Player {
  constructor(isComputer) {
    this.isComputer = isComputer;
    this.gameBoard = new Gameboard(10,10);
  }
}
