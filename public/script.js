const landing = document.getElementById("landing");
const question = document.getElementById("question");
const accepted = document.getElementById("accepted");

const startButton = document.getElementById("startButton");
const yesButton = document.getElementById("yesButton");
const noButton = document.getElementById("noButton");
const statusLine = document.getElementById("statusLine");const acceptedGif = document.querySelector(".accepted-gif");

const celebrationGifs = [
  "https://media1.tenor.com/m/MimC9GygFMsAAAAd/mr-bean-mrbean.gif",
  "https://media1.tenor.com/m/PsJiKnUdAIIAAAAC/she-said-yes-nick-cannon.gif",
  "https://media1.tenor.com/m/lcRDHjziOpoAAAAd/thatha-dance.gif",
  "https://media1.tenor.com/m/VQCo5SIvl2kAAAAC/thats-cute-mason-kane.gif",
  "https://media1.tenor.com/m/Hp9eRwofx-EAAAAd/valentines-day.gif",
  "https://media1.tenor.com/m/hppcHIyK0kQAAAAC/oh-yeah-parks-and-recreation.gif",
  "https://media1.tenor.com/m/7E6_LJNFjR4AAAAC/oh-yeah.gif",
  "https://media1.tenor.com/m/j3JEYk31qZgAAAAC/ahh-ahhhhh.gif",
  "http://media1.tenor.com/m/t8bjAzYaA7sAAAAC/friends-phoebe.gif",
  "https://media1.tenor.com/m/rDWvLZHYJv0AAAAC/thumbs-up-go.gif"
];

let usedGifs = [];
let availableGifs = [...celebrationGifs];

function getNextGif() {
  if (availableGifs.length === 0) {
    availableGifs = [...celebrationGifs];
    usedGifs = [];
  }
  
  const randomIndex = Math.floor(Math.random() * availableGifs.length);
  const selectedGif = availableGifs[randomIndex];
  
  usedGifs.push(selectedGif);
  availableGifs.splice(randomIndex, 1);
  
  return selectedGif;
}
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
  const nextGif = getNextGif();
  acceptedGif.src = nextGif;
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

restartButton.addEventListener("click", () => {
  resetQuestion();
  show(landing);
});

const params = new URLSearchParams(window.location.search);
show(params.get("start") === "1" ? question : landing);
