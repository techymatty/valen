const landing = document.getElementById("landing");
const question = document.getElementById("question");
const accepted = document.getElementById("accepted");

const startButton = document.getElementById("startButton");
const yesButton = document.getElementById("yesButton");
const noButton = document.getElementById("noButton");
const restartButton = document.getElementById("restartButton");
const statusLine = document.getElementById("statusLine");

const noMessages = [
  "Are you sure? I brought extra chocolates 🍫",
  "Maybe give me one tiny chance? 🥹",
  "I'll keep asking nicely... with flowers 🌷",
  "Last try: say yes and I’ll plan the perfect date ✨"
];

let noClicks = 0;

function show(section) {
  [landing, question, accepted].forEach((el) => el.classList.add("hidden"));
  section.classList.remove("hidden");
}

function inflateYesButton() {
  const scale = 1 + noClicks * 0.18;
  yesButton.style.transform = `scale(${Math.min(scale, 2.2)})`;
}

function updateNoButtonText() {
  noButton.textContent = noClicks >= 4 ? "Fine... Yes 💕" : "No 🙈";
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
  noClicks = 0;
  yesButton.style.transform = "scale(1)";
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
  noClicks += 1;

  if (noClicks >= 4) {
    show(accepted);
    burstConfetti();
    return;
  }

  statusLine.textContent = noMessages[noClicks - 1];
  inflateYesButton();
  updateNoButtonText();
});

restartButton.addEventListener("click", () => {
  show(landing);
});

const params = new URLSearchParams(window.location.search);
show(params.get("start") === "1" ? question : landing);
