'use strict';

let scorePlayer1 = 0,
  scorePlayer2 = 0,
  currentSessionScore = 0,
  currentPlayer = 1;

let diceValue;

const diceFace = document.querySelector('.dice');
const rollDiceBtn = document.querySelector('.btn--roll');
const player1 = document.querySelector('.player--1');
const player2 = document.querySelector('.player--2');
const currentScores = document.querySelectorAll('.current-score');
const playerScores = document.querySelectorAll('.score');
const currentScore1 = document.querySelector('#current--1');
const currentScore2 = document.querySelector('#current--2');

//FIRST INITIALIZER
resetGame(currentPlayer);

rollDiceBtn.addEventListener('click', function () {
  startGame(currentPlayer);
});

function resetGame($currentPlayer) {
  for (let i = 0; i <= 1; i++) {
    currentScores[i].textContent = '0';
    playerScores[i].textContent = '0';
  } // reset both players' player and current cores
  diceFace.style.display = 'none'; // turn off dice img till next draw
  currentPlayer = $currentPlayer;
  currentSessionScore = 0;
  player1.classList.add('player--active');
  player2.classList.remove('player--active');
}

function rollDice() {
  diceValue = Math.trunc(Math.random() * 6) + 1;
  console.log(diceValue);
  diceFace.style.display = 'block'; // show dice img
  diceFace.src = `dice-${diceValue}.png`; // show the dice face of corresponding number by diverging the src attribute of the img element
}

function startGame($currentPlayer) {
  rollDice(); //generate a random dice roll

  // control point for the dice roll
  if (diceValue === 1) {
    // switch players
    if (currentPlayer === 1) {
      currentPlayer === 2;
    } else {
      currentPlayer === 1;
    }
    //reset game
    resetGame($currentPlayer);
    startGame($currentPlayer);
  } else {
    //add dice roll value to the current player's score
    currentSessionScore += diceValue;

    if (currentPlayer === 1) {
      currentScore1.textContent = String(currentSessionScore);
    } else if (currentPlayer === 2) {
      currentScore2.textContent = String(currentSessionScore);
    }
  }
}
