const holes = document.querySelectorAll(".hole");
const score = document.querySelector(".score");
const moles = document.querySelectorAll(".moles");
const startBtn = document.querySelector("#start");

let lastHole;
let timeUp = false;

function randomTime(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function randomHoles(holes) {
  const index = Math.floor(Math.random() * holes.length);
  const hole = holes[index];

  if (hole === lastHole) {
    console.log("same hole");
    return randomHoles(holes);
  }

  lastHole = hole;
  return hole;
}

function molePop() {
  const time = randomTime(200, 1000);
  const hole = randomHoles(holes);
  hole.classList.add("up");
  setTimeout(() => {
    hole.classList.remove("up");
    if (!timeUp) molePop();
  }, time);
}

function startGame() {
  score.textContent = 0;
  timeUp = false;
  molePop();
  setTimeout(() => (timeUp = true), 2000);
}

startBtn.addEventListener("click", startGame);
