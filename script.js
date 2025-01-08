const textToType = document.getElementById("text-to-type");
const inputBox = document.getElementById("input-box");
const timer = document.getElementById("timer");
const score = document.getElementById("score");
const startButton = document.getElementById("start-button");
const feedback = document.createElement("p"); // Feedback dinámico

// Inserta el feedback en el DOM
feedback.id = "feedback";
document.getElementById("game-container").appendChild(feedback);

let time = 0;
let interval;
let words = ["práctica", "mecanografía", "velocidad", "juego", "diversión", "creatividad", "programación", "desarrollo"];
let currentWord = "";
let points = 0;

// Inicia el juego
function startGame() {
  resetGame();
  currentWord = getRandomWord();
  textToType.textContent = currentWord;
  interval = setInterval(updateTimer, 1000);
}

// Actualiza el temporizador
function updateTimer() {
  time++;
  timer.textContent = `Tiempo: ${time} segundos`;
}

// Valida la entrada del usuario
function checkInput() {
  if (inputBox.value === currentWord) {
    // Acierto
    points++;
    score.textContent = `Puntuación: ${points}`;
    feedback.textContent = "¡Correcto!";
    feedback.style.color = "#4caf50";
    feedback.style.visibility = "visible";
    inputBox.classList.add("correct");

    // Cambia a una nueva palabra
    currentWord = getRandomWord();
    textToType.textContent = currentWord;
    inputBox.value = "";
    setTimeout(() => feedback.style.visibility = "hidden", 1000); // Oculta feedback
  } else if (!currentWord.startsWith(inputBox.value)) {
    // Error
    feedback.textContent = `Incorrecto: ¡la palabra es "${currentWord}"!`;
    feedback.style.color = "#ff5252";
    feedback.style.visibility = "visible";
    inputBox.classList.add("wrong");
  } else {
    // Si es parcialmente correcto
    inputBox.classList.remove("wrong", "correct");
    feedback.style.visibility = "hidden";
  }
}

// Resetea el juego
function resetGame() {
  time = 0;
  points = 0;
  timer.textContent = "Tiempo: 0 segundos";
  score.textContent = "Puntuación: 0";
  inputBox.value = "";
  inputBox.classList.remove("wrong", "correct");
  feedback.style.visibility = "hidden";
}

// Genera una palabra aleatoria
function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

// Eventos
startButton.addEventListener("click", startGame);
inputBox.addEventListener("input", checkInput);
