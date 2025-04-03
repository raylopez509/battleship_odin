import { Ship, Gameboard, Player } from './index.js';
import "./style.css";

const player1 = new Player(false);
const player2 = new Player(false);

const p1Carrier = new Ship(5,0,false)
const p1Battleship = new Ship(4,0,false)
const p1Cruiser = new Ship(3,0,false)
const p1Submarine = new Ship(3,0,false)
const p1Destroyer = new Ship(2,0,false)

const p2Carrier = new Ship(5,0,false)
const p2Battleship = new Ship(4,0,false)
const p2Cruiser = new Ship(3,0,false)
const p2Submarine = new Ship(3,0,false)
const p2Destroyer = new Ship(2,0,false)

player1.gameBoard.placeShip(p1Carrier,0,0,true);
player2.gameBoard.placeShip(p1Cruiser,5,5,true);

const boardContainer = document.querySelector('.board-container');
for(let x = 0; x < 10; x++) {
  for(let y = 0; y < 10; y++) {
    const box = document.createElement('div');
    box.dataset.x = x;
    box.dataset.y = y;
    boardContainer.appendChild(box);
    if(player1.gameBoard.board[x][y] instanceof Ship) {
      box.style.backgroundColor='red';
    }
    box.addEventListener('click', (event) => {
      console.log(`${event.target.dataset.x},${event.target.dataset.y}`);
    });
  }
}