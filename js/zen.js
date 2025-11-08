let timer;
let timeLeft = 0;
let running = false;

const timerDisplay = document.getElementById("timerDisplay");
const timeSelect = document.getElementById("timeSelect");

// Botões do timer
document.getElementById("startBtn").onclick = () => {
  if (!running) {
    timeLeft = timeSelect.value;
    startTimer();
  }
};

document.getElementById("pauseBtn").onclick = () => {
  clearInterval(timer);
  running = false;
};

document.getElementById("resetBtn").onclick = () => {
  clearInterval(timer);
  running = false;
  timerDisplay.textContent = "00:00";
};

function startTimer() {
  running = true;
  timer = setInterval(() => {
    if (timeLeft <= 0) {
      clearInterval(timer);
      running = false;
      timerDisplay.textContent = "Concluído!";
      return;
    }
    timeLeft--;
    timerDisplay.textContent = formatTime(timeLeft);
  }, 1000);
}

function formatTime(sec) {
  let min = Math.floor(sec / 60);
  let s = sec % 60;
  if (s < 10) s = "0" + s;
  return `${min}:${s}`;
}

// ------------------------
// Controle dos Sons
// ------------------------

const rain = document.getElementById("rainSound");
const forest = document.getElementById("forestSound");
const ocean = document.getElementById("oceanSound");
const piano = document.getElementById("pianoSound");
const violao = document.getElementById("violaoSound");

const rainBtn = document.getElementById("rainBtn");
const forestBtn = document.getElementById("forestBtn");
const oceanBtn = document.getElementById("oceanBtn");
const pianoBtn = document.getElementById("pianoBtn");
const violaoBtn = document.getElementById("violaoBtn");

// Volume suave e confortável
rain.volume = 0.5;
forest.volume = 0.5;
ocean.volume = 0.5;
piano.volume = 0.5;
violao.volume = 0.5

function stopAll() {
  rain.pause();
  forest.pause();
  ocean.pause();
  piano.pause();
  violao.pause();

  rainBtn.textContent = "Chuva";
  forestBtn.textContent = "Floresta";
  oceanBtn.textContent = "Mar";
  pianoBtn.textContent = "Piano";
  violaoBtn.textContent = "Violão";
}

rainBtn.onclick = () => {
  if (rain.paused) {
    stopAll();
    rain.play().catch(() => {});
    rainBtn.textContent = "Parar Chuva";
  } else {
    stopAll();
  }
};

forestBtn.onclick = () => {
  if (forest.paused) {
    stopAll();
    forest.play().catch(() => {});
    forestBtn.textContent = "Parar Floresta";
  } else {
    stopAll();
  }
};

oceanBtn.onclick = () => {
  if (ocean.paused) {
    stopAll();
    ocean.play().catch(() => {});
    oceanBtn.textContent = "Parar Mar";
  } else {
    stopAll();
  }
};

pianoBtn.onclick = () => {
  if (piano.paused) {
    stopAll();
    piano.play().catch(() => {});
    pianoBtn.textContent = "Parar Piano";
  } else {
    stopAll();
  }
};

violaoBtn.onclick = () => {
  if (violao.paused) {
    stopAll();
    violao.play().catch(() => {});
    violaoBtn.textContent = "Parar Violão";
  } else {
    stopAll();
  }
};