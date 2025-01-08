const textToType = document.getElementById("text-to-type");
const inputBox = document.getElementById("input-box");
const timer = document.getElementById("timer");
const score = document.getElementById("score");
const startButton = document.getElementById("start-button");

let time = 0;
let interval;
let words = ["práctica", "mecanografía", "velocidad", "juego", "diversión"];
let currentWord = "";

function startGame() {
  resetGame();
  currentWord = getRandomWord();
  textToType.textContent = currentWord;
  interval = setInterval(updateTimer, 1000);
}

function updateTimer() {
  time++;
  timer.textContent = `Tiempo: ${time} segundos`;
}

function checkInput() {
  if (inputBox.value === currentWord) {
    score.textContent = `Puntuación: ${time}`;
    clearInterval(interval);
    alert("¡Bien hecho!");
  }
}

function resetGame() {
  time = 0;
  timer.textContent = "Tiempo: 0 segundos";
  inputBox.value = "";
  score.textContent = "Puntuación: 0";
}

function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

startButton.addEventListener("click", startGame);
inputBox.addEventListener("input", checkInput);

