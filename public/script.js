const landing = document.getElementById("landing");
const question = document.getElementById("question");
const accepted = document.getElementById("accepted");

const startButton = document.getElementById("startButton");
const yesButton = document.getElementById("yesButton");
const noButton = document.getElementById("noButton");
const statusLine = document.getElementById("statusLine");

const noMessages = [
  "Are you sure? I brought extra chocolates 🍫",
 "This isn’t flirting. This is me giving you a chance 😏",
  "FYI, I know black magic 🧙‍♀️",
  "You can't escape love! 😂",
  "You’re lucky I’m even asking nicely 😉",
  "Careful… I’m the type you regret losing 😘",
  "Refuse me? That’s illegal in 7 countries 😜",
  "Choose wisely… I’m a limited edition 😏🔥",
  "Say yes and I’ll plan the perfect date ✨"
];

let noDodges = 0;
const maxNoDodges = 9;

function show(section) {
  [landing, question, accepted].forEach((el) => el.classList.add("hidden"));
  section.classList.remove("hidden");
}

function updateButtonSizes() {
  const yesScale = 1 + noDodges * 0.05;
  const noScale = Math.max(0.5, 1 - noDodges * 0.02);
  
  yesButton.style.transform = `scale(${Math.min(yesScale, 2.5)})`;
  noButton.style.transform = `scale(${noScale}) translate(${Math.floor((Math.random() * 260) - 130)}px, ${Math.floor((Math.random() * 120) - 60)}px)`;
}

function dodgeNoButton() {
  if (noDodges >= maxNoDodges) {
    return;
  }

  noDodges += 1;
  updateButtonSizes();

  if (noDodges < maxNoDodges) {
    statusLine.textContent = noMessages[(noDodges - 1) % noMessages.length];
  } else {
    statusLine.textContent = "Okay fine... the No button is done running 😅";
  }
}

function burstConfetti() {
  for (let i = 0; i < 28; i += 1) {
    const dot = document.createElement("span");
    dot.className = "confetti";
    dot.style.left = `${Math.random() * window.innerWidth}px`;
    dot.style.top = `${Math.random() * (window.innerHeight * 0.45)}px`;
    dot.style.background = ["#ff2b72", "#ffc6d3", "#f9418f", "#ff8fab"][i % 4];
    document.body.appendChild(dot);
    setTimeout(() => dot.remove(), 900);
  }
}

function resetQuestion() {
  noDodges = 0;
  yesButton.style.transform = "scale(1)";
  noButton.style.transform = "scale(1)";
  noButton.textContent = "No 🙈";
  statusLine.textContent = "Take your time. I can wait forever.";
}

startButton.addEventListener("click", () => {
  resetQuestion();
  show(question);
});

yesButton.addEventListener("click", () => {
  show(accepted);
  burstConfetti();
});

noButton.addEventListener("click", () => {
  if (noDodges < maxNoDodges) {
    dodgeNoButton();
    return;
  }

  statusLine.textContent = "You finally caught it. But yes is still cuter 💖";
});

noButton.addEventListener("mouseenter", dodgeNoButton);
noButton.addEventListener("touchstart", dodgeNoButton, { passive: true });


const params = new URLSearchParams(window.location.search);
show(params.get("start") === "1" ? question : landing);
