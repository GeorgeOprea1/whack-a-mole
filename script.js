const holes = document.querySelectorAll(".hole");
const scoreBoard = document.querySelector(".score");
const moles = document.querySelectorAll(".mole");
const startBtn = document.querySelector("#start");
const easyBtn = document.querySelector("#easy");
const mediumBtn = document.querySelector("#medium");
const expertBtn = document.querySelector("#expert");

let lastHole;
let timeUp = false;
let score = 0;
let easy = true;
let medium = false;
let expert = false;

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
  scoreBoard.textContent = 0;
  timeUp = false;
  score = 0;
  molePop();
  setTimeout(() => (timeUp = true), 30000);
}

startBtn.addEventListener("click", startGame);

function hitTheMole(e) {
  score++;
  this.classList.remove("up");
  scoreBoard.textContent = score;
}

moles.forEach((mole) => mole.addEventListener("click", hitTheMole));

easyBtn.addEventListener("click", function () {
  easy = true;
  medium = false;
  expert = false;
  console.log(easy, medium, expert);
});

mediumBtn.addEventListener("click", function () {
  medium = true;
  easy = false;
  expert = false;
  console.log(easy, medium, expert);
});

expertBtn.addEventListener("click", function () {
  easy = false;
  medium = false;
  expert = true;
  console.log(easy, medium, expert);
});
