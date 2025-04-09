import { Ship, Gameboard, Player } from './index.js';
import "./style.css";

const player1 = new Player(false);
const player2 = new Player(true);
const cpuClicks = [];
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
  player1.gameBoard.placeShipRandomly(p1Carrier);
  player1.gameBoard.placeShipRandomly(p1Battleship);
  player1.gameBoard.placeShipRandomly(p1Cruiser);
  player1.gameBoard.placeShipRandomly(p1Submarine);
  player1.gameBoard.placeShipRandomly(p1Destroyer);
  player2.gameBoard.placeShipRandomly(p2Carrier);
  player2.gameBoard.placeShipRandomly(p2Battleship);
  player2.gameBoard.placeShipRandomly(p2Cruiser);
  player2.gameBoard.placeShipRandomly(p2Submarine);
  player2.gameBoard.placeShipRandomly(p2Destroyer);
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
  if(isPlayer1 !== isCurrentTurnP1) {
    const x = event.target.dataset.x;
    const y = event.target.dataset.y;
    const player = getPlayer(isPlayer1);
    const isHit = player.gameBoard.receiveAttack(x,y);
    if(isHit) {
      event.target.style.backgroundColor='black';
      if(!player.gameBoard.reportAllSinksSunk()) {
        console.log("keep going");
      }
      else {
        document.querySelector('.game-status').textContent = "Game Over!";
        
      }
    }
    else {
      event.target.style.backgroundColor='yellow';
      isCurrentTurnP1 = !isCurrentTurnP1;
    }

    if(isCurrentTurnP1 === false && player2.isComputer === true) {
      cpuTurn();
    }
    //
    event.target.removeEventListener('click', boardClickHandler);
  }
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
      if(player.gameBoard.board[x][y] instanceof Ship && player.isComputer === false) {
        box.style.backgroundColor='gray';
      }
      else {
        box.style.backgroundColor='lightblue'
      }
      box.addEventListener('click', boardClickHandler);
    }
  }
}

function cpuTurn() {
  let board = document.querySelector('.p1-board');
  let squares = board.children;
  let randNum = Math.floor(Math.random() * 100);
  while(cpuClicks.includes(randNum)) {
    randNum = Math.floor(Math.random() * 100);
  }
  let square = squares.item(randNum);
  console.log(square);
  cpuClicks.push(randNum);
  square.click();
}