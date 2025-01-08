const textToType = document.getElementById("text-to-type");
const inputBox = document.getElementById("input-box");
const timer = document.getElementById("timer");
const score = document.getElementById("score");
const startButton = document.getElementById("start-button");
const languageButton = document.getElementById("language-button");
const feedback = document.createElement("p");

// Inserta el feedback en el DOM
feedback.id = "feedback";
document.getElementById("game-container").appendChild(feedback);

let time = 0;
let interval;
let currentWord = "";
let points = 0;

// Palabras por idioma
const wordsES = [
  "práctica", "mecanografía", "velocidad", "juego", "diversión", 
  "creatividad", "programación", "desarrollo", "perro", "gato"
];
const wordsEN = [
  "practice", "typing", "speed", "game", "fun", 
  "creativity", "programming", "development", "dog", "cat"
];

let currentLanguage = "es"; // Idioma inicial: español
let words = wordsES; // Lista de palabras actual

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
    feedback.textContent = currentLanguage === "es" ? "¡Correcto!" : "Correct!";
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
    feedback.textContent = currentLanguage === "es"
      ? `Incorrecto: ¡la palabra es "${currentWord}"!`
      : `Incorrect: the word is "${currentWord}"!`;
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
  timer.textContent = currentLanguage === "es" ? "Tiempo: 0 segundos" : "Time: 0 seconds";
  score.textContent = currentLanguage === "es" ? "Puntuación: 0" : "Score: 0";
  inputBox.value = "";
  inputBox.classList.remove("wrong", "correct");
  feedback.style.visibility = "hidden";
}

// Genera una palabra aleatoria
function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

// Cambia el idioma
function toggleLanguage() {
  if (currentLanguage === "es") {
    currentLanguage = "en";
    words = wordsEN;
    languageButton.textContent = "Switch to Spanish";
    startButton.textContent = "Start Game";
    inputBox.placeholder = "Type here...";
  } else {
    currentLanguage = "es";
    words = wordsES;
    languageButton.textContent = "Cambiar a Inglés";
    startButton.textContent = "Iniciar Juego";
    inputBox.placeholder = "Escribe aquí...";
  }

  // Reinicia la interfaz con el nuevo idioma
  resetGame();
}

// Eventos
startButton.addEventListener("click", startGame);
inputBox.addEventListener("input", checkInput);
languageButton.addEventListener("click", toggleLanguage);
