const holes = document.querySelectorAll(".hole");
const scoreBoard = document.querySelector(".score");
const moles = document.querySelectorAll(".mole");
const startBtn = document.querySelector("#start");
const easyBtn = document.querySelector("#easy");
const mediumBtn = document.querySelector("#medium");
const expertBtn = document.querySelector("#expert");
const input = document.querySelector("#input");
const timer = document.querySelector(".timer");
const playAgainBtn = document.querySelector("#play-again");
const gameBoard = document.querySelector(".game");
const resultBoard = document.querySelector(".final-results");
const finalScore = document.querySelector(".final-score");
const buttons = document.querySelector(".buttons");
const level = document.querySelector(".level");
const levelSelected = document.querySelector(".level-selected");

let lastHole;
let timeUp = false;
let score = 0;
let easy = true;
let medium = false;
let expert = false;
let gameTime;
let count;
let inputValue;

function randomTime(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function randomHoles(holes) {
  const index = Math.floor(Math.random() * holes.length);
  const hole = holes[index];

  if (hole === lastHole) {
    return randomHoles(holes);
  }

  lastHole = hole;
  return hole;
}

function molePop() {
  if (easy === true) {
    time = randomTime(1000, 2000);
  } else if (medium === true) {
    time = randomTime(500, 1000);
  } else if (expert === true) {
    time = randomTime(200, 500);
  }

  console.log(time);
  const hole = randomHoles(holes);
  hole.classList.add("up");
  setTimeout(() => {
    hole.classList.remove("up");
    if (!timeUp) molePop();
  }, time);
}

function startGame() {
  timeUp = false;
  inputValue = input.value;
  if (!inputValue) {
    alert("Please select the game time");
    location.reload();
  } else {
    timer.style.display = "block";
    levelSelected.style.display = "block";
    timer.textContent = inputValue;
    gameTime = inputValue * 1000;
    molePop();
    setTimeout(() => (timeUp = true), gameTime);
    countDown();
    buttons.style.display = "none";
  }
}

startBtn.addEventListener("click", startGame);

function hitTheMole(e) {
  score++;
  this.classList.remove("up");
  scoreBoard.textContent = score;
  count;
}

moles.forEach((mole) => mole.addEventListener("click", hitTheMole));

easyBtn.addEventListener("click", function () {
  easy = true;
  medium = false;
  expert = false;
  easyBtn.classList.toggle("level-clicked");
  mediumBtn.classList.remove("level-clicked");
  expertBtn.classList.remove("level-clicked");
  levelSelected.textContent = easyBtn.value;
});

mediumBtn.addEventListener("click", function () {
  medium = true;
  easy = false;
  expert = false;
  mediumBtn.classList.toggle("level-clicked");
  easyBtn.classList.remove("level-clicked");
  expertBtn.classList.remove("level-clicked");
  console.log(easy, medium, expert);
  levelSelected.textContent = mediumBtn.value;
});

expertBtn.addEventListener("click", function () {
  easy = false;
  medium = false;
  expert = true;
  expertBtn.classList.toggle("level-clicked");
  easyBtn.classList.remove("level-clicked");
  mediumBtn.classList.remove("level-clicked");
  levelSelected.textContent = expertBtn.value;
  console.log(easy, medium, expert);
});

let countDownTimer = setInterval(countDown, 1000);

function countDown() {
  inputValue--;
  timer.textContent = inputValue;

  if (inputValue <= 0) {
    clearInterval(countDownTimer);
    gameBoard.style.display = "none";
    buttons.style.display = "none";
    resultBoard.style.display = "block";
    console.log("Game Over");
    finalScore.textContent = "Your final score is: " + score;
  }
}

playAgainBtn.addEventListener("click", function () {
  location.reload();
  buttons.style.display = "";
  timer.style.display = "none";
  levelSelected.style.display = "none";
});
