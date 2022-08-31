'use strict';

let scorePlayer1 = 0,
  scorePlayer2 = 0,
  currentSessionScore = 0,
  currentPlayer = 1;

let diceValue;
let isGamePlayed = false;

const diceFace = document.querySelector('.dice');
const newGameBtn = document.querySelector('.btn--new');
const rollDiceBtn = document.querySelector('.btn--roll');
const holdRollBtn = document.querySelector('.btn--hold');
const player1 = document.querySelector('.player--1');
const player2 = document.querySelector('.player--2');
const currentScores = document.querySelectorAll('.current-score');
const playerScores = document.querySelectorAll('.score');
const storeScore1 = document.querySelector('#score--1');
const storeScore2 = document.querySelector('#score--2');
const currentScore1 = document.querySelector('#current--1');
const currentScore2 = document.querySelector('#current--2');

function resetGame() {
  for (let i = 0; i <= 1; i++) {
    currentScores[i].textContent = '0';
    playerScores[i].textContent = '0';
  } // reset both players' player and current cores
  diceFace.style.display = 'none'; // turn off dice img till next draw
  currentSessionScore = 0;
}

function rollDice() {
  diceValue = Math.trunc(Math.random() * 6) + 1;
  console.log(diceValue);
  diceFace.style.display = 'block'; // show dice img
  diceFace.src = `dice-${diceValue}.png`; // show the dice face of corresponding number by diverging the src attribute of the img element
}

function switchPlayers() {
  //switch class states
  player1.classList.toggle('player--active');
  player2.classList.toggle('player--active');
}

function startGame($currentPlayer) {
  rollDice(); //generate a random dice roll

  // control point for the dice roll
  if (diceValue === 1) {
    // switch players IN JS VAR
    if (currentPlayer === 1) {
      currentPlayer = 2;
    } else {
      currentPlayer = 1;
    }
    //SWITCH IN HTML
    switchPlayers();
    // console.log(`${currentPlayer}player`);
    // startGame(currentPlayer);
    resetGame();
  } else {
    //add dice roll value to the current player's score
    // console.log(currentSessionScore);
    currentSessionScore += diceValue;
    // console.log(`${currentPlayer}player`);
    if (currentPlayer === 1) {
      currentScore1.textContent = `${currentSessionScore}`;
    } else if (currentPlayer === 2) {
      currentScore2.textContent = `${currentSessionScore}`;
    }
  }
}
//INITIALIZER
resetGame();
//LISTEN FOR NEWGAME BUTTON
newGameBtn.addEventListener('click', function () {
  resetGame();
});
//LISTEN FOR ROLL DICE BUTTON
rollDiceBtn.addEventListener('click', function () {
  isGamePlayed = true;
  startGame(currentPlayer);
});
//LISTEN FOR HOLD BUTTON
holdRollBtn.addEventListener('click', function () {
  // console.log(gamePlayed, currentPlayer);
  if (isGamePlayed) {
    storeScore();
    switchPlayers();
  } else {
    console.log('You havent initiated game yet!! Roll your dice Boi!!');
  }
});

function storeScore() {
  console.log(currentSessionScore);
  currentPlayer === 1
    ? (storeScore1.textContent = currentSessionScore)
    : (storeScore2.textContent = currentSessionScore);
}
