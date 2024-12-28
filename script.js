'use strict';

// Selecting elements... 😀
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const player1 = document.querySelector(`.player--0`);
const player2 = document.querySelector(`.player--1`);
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// Initializing values... 🔃
const scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let gamePlaying = true;

const toggleBtns = ms => {
  if (ms) {
    btnRoll.disabled = true;
    btnHold.disabled = true;
    setTimeout(() => {
      btnRoll.disabled = false;
      btnHold.disabled = false;
    }, ms);
  } else {
    if (btnRoll.disabled) {
      btnRoll.disabled = false;
      btnHold.disabled = false;
    } else {
      btnRoll.disabled = true;
      btnHold.disabled = true;
    }
  }
};

const switchPlayer = () => {
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player1.classList.toggle('player--active');
  player2.classList.toggle('player--active');
  toggleBtns(1000);
};

const setCurrentScore = score => {
  currentScore = score;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
};

const setPlayerScore = score => {
  scores[activePlayer] += score;
  document.getElementById(`score--0`).textContent = scores[0];
  document.getElementById(`score--1`).textContent = scores[1];
};

const activePlayerWins = () => {
  toggleBtns();
  const winner = document.querySelector(`.player--${activePlayer}`);
  winner.classList.add('player--winner');
  gamePlaying = false;
  diceEl.classList.add('hidden');
};

const restartGame = () => {
  scores[0] = 0;
  scores[1] = 0;
  setPlayerScore(0);
  setCurrentScore(0);
  activePlayer = 0;
  player1.classList.add('player--active');
  player2.classList.remove('player--active');
  player1.classList.remove('player--winner');
  player2.classList.remove('player--winner');
  toggleBtns(1000);
  gamePlaying = true;
};

// Rolling dice... 🍥
const rollDice = () => {
  // 1. Generating a new dice roll... 🎲
  const dice = Math.ceil(Math.random() * 6);

  // 2. Display the dice... ✨
  diceEl.src = `./img/dice-${dice}.png`;
  diceEl.classList.remove('hidden');

  // 3. Check if rolled 1... 1️⃣
  if (dice !== 1) {
    // 3.1 add dice to current score 💯
    setCurrentScore(currentScore + dice);
  } else {
    // 3.2 switch to next player... 🎭
    setCurrentScore(0);
    switchPlayer();
  }
};

const holdScore = () => {
  // 1. Add current score to active player's score... ➕
  setPlayerScore(currentScore);

  // 2. If the player's score was >= 100... ❗❓
  if (scores[activePlayer] >= 100) {
    // 2.1 active player wins the game... 🎉
    activePlayerWins();
  } else {
    // 2.2 switch to next player... 🎭
    setCurrentScore(0);
    switchPlayer();
  }
};

btnRoll.addEventListener('click', () => {
  if (gamePlaying) rollDice();
});
btnHold.addEventListener('click', () => {
  if (gamePlaying) holdScore();
});
btnNew.addEventListener('click', restartGame);
