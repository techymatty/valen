const landing = document.getElementById("landing");
const question = document.getElementById("question");
const accepted = document.getElementById("accepted");

const startButton = document.getElementById("startButton");
const yesButton = document.getElementById("yesButton");
const noButton = document.getElementById("noButton");
const restartButton = document.getElementById("restartButton");
const landingForm = document.getElementById("landingForm");
const recipientName = document.getElementById("recipientName");
const greeting = document.getElementById("greeting");
const statusLine = document.getElementById("statusLine");const acceptedGif = document.querySelector(".accepted-gif");

const celebrationGifs = [
  "https://media1.tenor.com/m/PNaiLyqokFEAAAAC/kiss.gif",
  "https://media.tenor.com/F0_vdS_Qo2UAAAAi/hehehehe-in-love.gif",
  "https://media.tenor.com/H_u4zlHSRUoAAAAi/love-delivery.gif",
  "https://media.tenor.com/30-YAHDySRIAAAAi/i-need-you.gif",
  "https://media.tenor.com/ffG8ZgTeQ74AAAAi/peach-and-goma-cute.gif",
  "https://media1.tenor.com/m/gJ1y-yw_GT0AAAAC/milk-and-mocha-milk-mocha.gif",
  "https://media.tenor.com/F2SQcVd5fMIAAAAj/hug-couple.gif",
  "https://media.tenor.com/n0fGerq4HTYAAAAj/heart-here.gif",
  "https://media1.tenor.com/m/ITtPYeOZKpYAAAAC/aw-its-so-cute.gif",
  "https://media.tenor.com/m8vwQqfk0I4AAAAj/peach-and-goma-cuddle.gif"
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
let lastDodgeTime = 0;
const dodgeDebounce = 150; // ms to prevent double-triggering

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
    noButton.classList.add("hidden");
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
  noButton.classList.remove("hidden");
  statusLine.textContent = "Take your time. I can wait forever.";
}

if (landingForm) {
  landingForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = (recipientName && recipientName.value.trim()) || "";
    if (!name) {
      if (recipientName) {
        recipientName.classList.add("input-error");
        recipientName.setAttribute("aria-invalid", "true");
        recipientName.focus();
        setTimeout(() => {
          recipientName.classList.remove("input-error");
          recipientName.removeAttribute("aria-invalid");
        }, 1800);
      }
      return; // don't proceed without a name
    }

    if (greeting) greeting.textContent = `Hey ${name} 💌`;
    // generate shareable link
    try {
      const url = new URL(window.location.href);
      url.searchParams.set("start", "1");
      url.searchParams.set("name", name);
      const shareUrl = url.toString();
      // open modal with share actions
      const shareModal = document.getElementById("shareModal");
      const modalShareLink = document.getElementById("modalShareLink");
      const modalCopy = document.getElementById("modalCopy");
      const modalClose = document.getElementById("modalClose");
      const modalOverlay = document.getElementById("modalOverlay");
      if (modalShareLink) modalShareLink.value = shareUrl;
      if (shareModal) shareModal.classList.remove("hidden");

      if (modalCopy) {
        modalCopy.onclick = async () => {
          try {
            await navigator.clipboard.writeText(shareUrl);
            modalCopy.textContent = "Copied";
            setTimeout(() => (modalCopy.textContent = "Copy Link"), 1400);
          } catch (err) {
            console.warn("Copy failed", err);
          }
        };
      }

      const hideModal = () => {
        if (shareModal) shareModal.classList.add("hidden");
        // return user to the landing (enter name) page when modal closes
        resetQuestion();
        show(landing);
        if (recipientName) recipientName.focus();
      };

      if (modalClose) modalClose.onclick = hideModal;
      if (modalOverlay) modalOverlay.onclick = hideModal;

    } catch (err) {
      console.warn("Failed to build share URL", err);
    }

    resetQuestion();
    show(question);
  });
} else {
  startButton.addEventListener("click", () => {
    resetQuestion();
    show(question);
  });
}
if (recipientName) {
  recipientName.addEventListener("input", () => {
    recipientName.classList.remove("input-error");
    recipientName.removeAttribute("aria-invalid");
  });
}

yesButton.addEventListener("click", () => {
  const nextGif = getNextGif();
  acceptedGif.src = nextGif;
  show(accepted);
  burstConfetti();
});

noButton.addEventListener("click", () => {
  if (noDodges < maxNoDodges) {
    const now = Date.now();
    if (now - lastDodgeTime > dodgeDebounce) {
      lastDodgeTime = now;
      dodgeNoButton();
    }
    return;
  }

  statusLine.textContent = "You finally caught it. But yes is still cuter 💖";
});

noButton.addEventListener("pointerenter", (e) => {
  if (e.pointerType === "mouse") {
    const now = Date.now();
    if (now - lastDodgeTime > dodgeDebounce) {
      lastDodgeTime = now;
      dodgeNoButton();
    }
  }
});

noButton.addEventListener("pointerdown", (e) => {
  if (e.pointerType === "touch" || e.pointerType === "pen") {
    const now = Date.now();
    if (now - lastDodgeTime > dodgeDebounce) {
      lastDodgeTime = now;
      dodgeNoButton();
    }
  }
});

if (restartButton) {
  restartButton.addEventListener("click", () => {
    resetQuestion();
    show(question);
  });
}

const params = new URLSearchParams(window.location.search);
const startParam = params.get("start");
const nameParam = params.get("name");
if (nameParam && greeting) {
  try {
    const decoded = decodeURIComponent(nameParam);
    greeting.textContent = `Hey ${decoded} 💌`;
  } catch (e) {
    greeting.textContent = `Hey ${nameParam} 💌`;
  }
}
show(startParam === "1" ? question : landing);
