'use strict';

// Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

let scores, currentScore, activePlayer, playing;
//starting conditions
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0El.classList.toggle('player--active'); //similar to contains but instead of searching if it contains and then removing or adding, it automatically does this if it is present or not
  player1El.classList.toggle('player--active');
};

//rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    //1. generate random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1; //math trunc for whole numbers, add 1 so that it includes number 6 b/c without it only goes up to 5
    console.log(dice); //check if dice img corresponds with random no.
    //2. display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    //3. check if rolled 1, true = next player. False cont.
    if (dice !== 1) {
      // add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore; //add to score dynamically based on active player
    } else {
      //switch player
      switchPlayer();
    }
  }
});

//hold button
btnHold.addEventListener('click', function () {
  if (playing) {
    // console.log('Hold button');
    //1. add current score to active player's score
    scores[activePlayer] += currentScore;
    //i.e. scores [1] = scores[1] + current score
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    //2. check score is >= 100, if so, finish game. If not, switch to next player
    if (scores[activePlayer] >= 100) {
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
});

//reset button
btnNew.addEventListener('click', init);
