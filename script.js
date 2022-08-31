'use strict';

let scorePlayer1 = 0,
  scorePlayer2 = 0,
  currentSessionScore = 0,
  currentPlayer = 1;

let diceValue;
// let isGamePlayed = false;

const diceFace = document.querySelector('.dice');
const newGameBtn = document.querySelector('.btn--new');
const rollDiceBtn = document.querySelector('.btn--roll');
const holdRollBtn = document.querySelector('.btn--hold');
const player1 = document.querySelector('.player--1');
const player2 = document.querySelector('.player--2');
const playerScores = document.querySelectorAll('.score');
const storeScore1 = document.querySelector('#score--1');
const storeScore2 = document.querySelector('#score--2');
const currentScores = document.querySelectorAll('.current-score');
const currentScore1 = document.querySelector('#current--1');
const currentScore2 = document.querySelector('#current--2');

function resetGame() {
  for (let i = 0; i <= 1; i++) {
    currentScores[i].textContent = '0';
    playerScores[i].textContent = '0';
  } // reset both players' player and current cores
  diceFace.style.visibility = 'hidden'; // turn off dice img till next draw
  currentSessionScore = 0;
  diceValue = '';
}

function rollDice() {
  diceValue = Math.trunc(Math.random() * 6) + 1;
  console.log(diceValue);
  diceFace.style.visibility = 'visible'; // show dice img
  holdRollBtn.style.visibility = 'visible';
  diceFace.src = `dice-${diceValue}.png`; // show the dice face of corresponding number by diverging the src attribute of the img element
}

function startGame($currentPlayer) {
  //ROLL DICE & DISPLAY
  rollDice(); //generate a random dice roll
  //PITSTOP: IS IT A 1?
  if (diceValue === 1) {
    switchPlayers();
  } else {
    //Update current players score value with the dice value
    currentSessionScore += diceValue;
    //Update the summed value on the HTML element
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
  // isGamePlayed = true;
  startGame(currentPlayer);
});
//LISTEN FOR HOLD BUTTON
holdRollBtn.addEventListener('click', function () {
  // console.log(gamePlayed, currentPlayer);
  console.log(`${diceValue}`);
  if (diceValue !== 0) {
    storeScore();
    switchPlayers();
  } else {
    console.log('You havent initiated game yet!! Roll your dice Boi!!');
  }
});

function storeScore() {
  console.log(currentSessionScore);
  if (currentPlayer === 1) {
    storeScore1.textContent = `${currentSessionScore}`;
  } else {
    storeScore2.textContent = `${currentSessionScore}`;
  }
}

function switchPlayers() {
  //switch class states
  player1.classList.toggle('player--active');
  player2.classList.toggle('player--active');

  for (let i = 0; i <= 1; i++) {
    currentScores[i].textContent = '0';
  } // current score only reset
  diceFace.style.visibility = 'hidden'; // turn off dice img till next draw
  currentSessionScore = 0;
  // isGamePlayed = false;
  // console.log(`${currentPlayer} !!!`);

  if (currentPlayer === 1) {
    currentPlayer = 2;
  } else {
    currentPlayer = 1;
  }
  holdRollBtn.style.visibility = 'hidden';
  // console.log(`${currentPlayer} !!!`);
  // console.log(`${isGamePlayed} OHA !!!`);
}
