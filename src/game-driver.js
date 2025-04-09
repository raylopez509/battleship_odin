import { Ship, Gameboard, Player } from './index.js';
import "./style.css";

const player1 = new Player(false);
const player2 = new Player(true);
let isCurrentTurnP1 = true;

const initBoards = (() => {
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
  player1.gameBoard.placeShip(p1Cruiser,5,5,true);
  player2.gameBoard.placeShip(p2Carrier,0,1,false);
  player2.gameBoard.placeShip(p2Destroyer,8,9,true);
  createBoard(player1, true);
  createBoard(player2, false);
})();

function createBoard(player, isPlayer1) {
  let board;
  if(isPlayer1) {
    board = document.querySelector('.p1-board');
    renderBoard(player,board,true);   
  }
  else {
    board = document.querySelector('.p2-board');
    renderBoard(player,board,false);
  }
  // board.replaceChildren();
}

function boardClickHandler(event) {
  const isPlayer1 = event.target.dataset.isPlayer1 === 'true';
  const x = event.target.dataset.x;
  const y = event.target.dataset.y;
  const player = getPlayer(isPlayer1);
  const isHit = player.gameBoard.receiveAttack(x,y);
  console.log(event.target);
  if(isHit) {
    event.target.style.backgroundColor='black';
    if(!player.gameBoard.reportAllSinksSunk()) {
      console.log("keep going");
    }
    else {
      console.log("game over");
    }
  }
  else {
    event.target.style.backgroundColor='yellow';
  }
  event.target.removeEventListener('click', boardClickHandler);
  //check if there's a ship in space
  //if ship, give that ship a hit register
  //else register miss
  
  //afterward, remove event listener to that event.target
}

function getPlayer(isPlayer1) {
  if(isPlayer1) {
    return player1;
  }
  else {
    return player2;
  }
}

function renderBoard(player,boardNode, isPlayer1) {
  const board = player.gameBoard.board;
  for(let y = 0; y < 10; y++) {
    for(let x = 0; x < 10; x++) {
      const box = document.createElement('div');
      box.dataset.isPlayer1 = isPlayer1;
      box.dataset.x = x;
      box.dataset.y = y;
      boardNode.appendChild(box);
      if(player.gameBoard.board[x][y] instanceof Ship) {
        box.style.backgroundColor='red';
      }
      box.addEventListener('click', boardClickHandler);
    }
  }
}