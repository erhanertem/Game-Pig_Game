'use strict';

let diceValue,
  scorePlayer1 = 0,
  scorePlayer2 = 0,
  currentSessionScore = 0,
  currentPlayer = 1;

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
const playerActive = document.querySelector('.player--active');

// create victory CSS object
let animationStyles = {
  backgroundColor: 'rgba(0, 0, 0, .8)',
  animation: 'blinker 1s linear infinite',
};

function resetGame() {
  for (let i = 0; i <= 1; i++) {
    currentScores[i].textContent = '0';
    playerScores[i].textContent = '0';
  } // reset both players' player and current cores
  rollDiceBtn.style.visibility = 'visible';
  diceFace.style.visibility = 'hidden'; // turn off dice img till next draw
  holdRollBtn.style.visibility = 'hidden';

  //reset victory CSS object to default
  animationStyles = {
    backgroundColor: '',
    animation: '',
  };
  // apply styles to the playerActive
  Object.assign(playerActive.style, animationStyles);

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

function startGame() {
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

function storeScore() {
  if (currentPlayer === 1) {
    scorePlayer1 += currentSessionScore;
    storeScore1.textContent = `${scorePlayer1}`;
    if (scorePlayer1 >= 100) {
      winnerPopup(player1);
    }
  } else {
    scorePlayer2 += currentSessionScore;
    storeScore2.textContent = `${scorePlayer2}`;
    if (scorePlayer2 >= 100) {
      winnerPopup(player2);
    }
  }
}

function switchPlayers() {
  //switch class states
  player1.classList.toggle('player--active');
  player2.classList.toggle('player--active');

  for (let i = 0; i <= 1; i++) {
    currentScores[i].textContent = '0';
  } // current score only reset
  currentSessionScore = 0;
  if (currentPlayer === 1) {
    currentPlayer = 2;
  } else {
    currentPlayer = 1;
  }
  holdRollBtn.style.visibility = 'hidden';
}

function winnerPopup($winner) {
  rollDiceBtn.style.visibility = 'hidden';
  holdRollBtn.style.visibility = 'hidden';
  diceFace.style.visibility = 'hidden'; // turn off dice img till next draws

  for (let i = 0; i <= 1; i++) {
    currentScores[i].textContent = '0';
  } // current score only reset
  scorePlayer1 = 0;
  scorePlayer2 = 0;

  //Victory CSS object
  animationStyles = {
    backgroundColor: 'rgba(0, 0, 0, .6)',
    color: 'white',
    animation: 'blinker 1.5s ease-in-out infinite',
  };
  // apply styles to the playerActive
  Object.assign($winner.style, animationStyles);
  // console.log(`winner is ${$winner}`);
}

// *****************GAME******************
//****************************************
//INITIALIZER
resetGame();

//LISTEN FOR NEWGAME BUTTON
newGameBtn.addEventListener('click', function () {
  scorePlayer1 = 0;
  scorePlayer2 = 0;
  resetGame();
});

//LISTEN FOR ROLL DICE BUTTON
rollDiceBtn.addEventListener('click', function () {
  startGame(currentPlayer);
});

//LISTEN FOR HOLD BUTTON
holdRollBtn.addEventListener('click', function () {
  // console.log(diceValue, currentPlayer);
  if (diceValue) {
    storeScore();
    switchPlayers();
  } else {
    alert('You havent rolled dice yet Boi!!');
  }
});
