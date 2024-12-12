const words = ['the', 'and', 'to', 'a', 'in', 'for', 'is', 'on', 'that', 'by'];
let currentWordIndex = 0;
let timeLeft = 60;
let score = 0;
let gameInterval;

function displayCurrentWord() {
  document.getElementById('current-word').textContent = words[currentWordIndex];
}

function updateTimer() {
  document.getElementById('timer').textContent = `Time left: ${timeLeft} seconds`;
}

function updateScore() {
  document.getElementById('score').textContent = `Score: ${score}`;
}

function startGame() {
  displayCurrentWord();
  updateTimer();
  updateScore();

  gameInterval = setInterval(() => {
    timeLeft--;
    updateTimer();

    if (timeLeft === 0) {
      clearInterval(gameInterval);
      alert(`Game over! Your score is ${score}.`);
    }
  }, 1000);
}

document.getElementById('input-field').addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    const inputValue = event.target.value.trim().toLowerCase();
    const currentWord = words[currentWordIndex].toLowerCase();

    if (inputValue === currentWord) {
      score++;
      updateScore();
      currentWordIndex = (currentWordIndex + 1) % words.length;
      displayCurrentWord();
      event.target.value = '';
    }
  }
});

startGame();