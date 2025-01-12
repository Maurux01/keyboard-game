const textToType = document.getElementById("text-to-type");
const inputBox = document.getElementById("input-box");
const timer = document.getElementById("timer");
const score = document.getElementById("score");
const startButton = document.getElementById("start-button");
const languageButton = document.getElementById("language-button");
const pauseButton = document.getElementById("pause-button");
const feedback = document.createElement("p");

// Inserta el feedback en el DOM
feedback.id = "feedback";
document.getElementById("game-container").appendChild(feedback);

let time = 0;
let interval;
let currentWord = "";
let points = 0;
let paused = false; // Estado de pausa

let currentLanguage = "es"; // Idioma inicial: español
let words = []; // Lista de palabras actual (cargada dinámicamente)

// Función para cargar palabras según el idioma
async function loadWords(language) {
    const filePath = language === "es" ? "assets/spanish_words.txt" : "assets/english_words.txt";
    try {
        const response = await fetch(filePath);
        if (response.ok) {
            const text = await response.text();
            words = text.split("\n").filter(word => word.trim() !== "");
        } else {
            console.error(`Error al cargar el archivo: ${filePath}`);
        }
    } catch (error) {
        console.error("Error al cargar las palabras:", error);
    }
}

// Inicia el juego
function startGame() {
    if (words.length === 0) {
        alert(
            currentLanguage === "es"
                ? "No se pudieron cargar las palabras. Por favor, verifica los archivos."
                : "Words could not be loaded. Please check the files."
        );
        return;
    }
    resetGame();
    currentWord = getRandomWord();
    textToType.textContent = currentWord;
    interval = setInterval(updateTimer, 1000);
}

// Actualiza el temporizador
function updateTimer() {
    if (!paused) {
        time++;
        timer.textContent =
            currentLanguage === "es"
                ? `Tiempo: ${time} segundos`
                : `Time: ${time} seconds`;
    }
}

// Valida la entrada del usuario
function checkInput() {
    if (inputBox.value === currentWord) {
        points++;
        score.textContent =
            currentLanguage === "es"
                ? `Puntuación: ${points}`
                : `Score: ${points}`;
        feedback.textContent = currentLanguage === "es" ? "¡Correcto!" : "Correct!";
        feedback.style.color = "#4caf50";
        feedback.style.visibility = "visible";
        inputBox.classList.add("correct");

        currentWord = getRandomWord();
        textToType.textContent = currentWord;
        inputBox.value = "";
        setTimeout(() => (feedback.style.visibility = "hidden"), 1000);
    } else if (!currentWord.startsWith(inputBox.value)) {
        feedback.textContent =
            currentLanguage === "es"
                ? `Incorrecto: ¡la palabra es "${currentWord}"!`
                : `Incorrect: the word is "${currentWord}"!`;
        feedback.style.color = "#ff5252";
        feedback.style.visibility = "visible";
        inputBox.classList.add("wrong");
    } else {
        inputBox.classList.remove("wrong", "correct");
        feedback.style.visibility = "hidden";
    }
}

// Resetea el juego
function resetGame() {
    time = 0;
    points = 0;
    timer.textContent =
        currentLanguage === "es" ? "Tiempo: 0 segundos" : "Time: 0 seconds";
    score.textContent =
        currentLanguage === "es" ? "Puntuación: 0" : "Score: 0";
    inputBox.value = "";
    inputBox.classList.remove("wrong", "correct");
    feedback.style.visibility = "hidden";
    paused = false;
    pauseButton.textContent = currentLanguage === "es" ? "Pausar" : "Pause";
    clearInterval(interval);
}

// Genera una palabra aleatoria
function getRandomWord() {
    return words[Math.floor(Math.random() * words.length)];
}

// Cambia el idioma
async function toggleLanguage() {
    currentLanguage = currentLanguage === "es" ? "en" : "es";
    await loadWords(currentLanguage);
    languageButton.textContent =
        currentLanguage === "es" ? "Cambiar a Inglés" : "Switch to Spanish";
    startButton.textContent =
        currentLanguage === "es" ? "Iniciar Juego" : "Start Game";
    inputBox.placeholder =
        currentLanguage === "es" ? "Escribe aquí..." : "Type here...";
    resetGame();
}

// Pausa o reanuda el juego
function togglePause() {
    if (paused) {
        paused = false;
        interval = setInterval(updateTimer, 1000);
        pauseButton.textContent =
            currentLanguage === "es" ? "Pausar" : "Pause";
    } else {
        paused = true;
        clearInterval(interval);
        pauseButton.textContent =
            currentLanguage === "es" ? "Reanudar" : "Resume";
    }
}

// Eventos
startButton.addEventListener("click", startGame);
inputBox.addEventListener("input", checkInput);
languageButton.addEventListener("click", toggleLanguage);
pauseButton.addEventListener("click", togglePause);

// Carga inicial de palabras
loadWords(currentLanguage);
