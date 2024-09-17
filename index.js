// Variables
const gameChoicesArray = ["Paper", "Scissors", "Rock"];
const rulesElement = document.querySelector(".container__rules");
const scoreNumberElement = document.querySelector(".header__scoreNumber");
const modalElement = document.querySelector(".modal");
const modalOverlayElement = document.querySelector(".modal__overlay");
const closeElement = document.querySelector(".modal__closeIcon");
const gameContentElement = document.querySelector(".gameContent");
const gameChoiceElements = document.querySelectorAll(
  ".gameContent__gameChoice"
);
const gameChoiceImageElement = document.querySelector(
  ".gameContent__gameChoiceImage"
);
const gameChoiceComputerElement = document.querySelector(
  ".gameContent__gameChoice--isComputer"
);
const countdownTextElement = document.querySelector(
  ".gameContent__countdownText"
);
const resultButtonElement = document.querySelector(
  ".gameContent__resultButton"
);
const resultTextElement = document.querySelector(".gameContent__resultText");
const player = document.querySelector("lottie-player"); //animation

let countdown = 4;
let randomResult;

// --- Functions ---

function toggleRulesModal() {
  modalElement.classList.toggle("modal--isActive");
}

function getRandomNumber() {
  return Math.floor(Math.random() * 3);
}

function showResult(userChoice, computerChoice) {
  const score = parseInt(scoreNumberElement.textContent);

  if (userChoice === computerChoice) {
    resultTextElement.textContent = "Draw";
  } else if (
    (userChoice === gameChoicesArray[0] &&
      computerChoice === gameChoicesArray[1]) ||
    (userChoice === gameChoicesArray[1] &&
      computerChoice === gameChoicesArray[2]) ||
    (userChoice === gameChoicesArray[2] &&
      computerChoice === gameChoicesArray[0])
  ) {
    resultTextElement.textContent = "You lose";
    gameContentElement.classList.add("gameContent--isLost");

    if (score > 0) {
      scoreNumberElement.textContent = score - 1;
    }
  } else {
    resultTextElement.textContent = "You win";
    setTimeout(
      () =>
        player.load(
          "https://assets10.lottiefiles.com/packages/lf20_aEFaHc.json"
        ),
      900
    );
    scoreNumberElement.textContent = score + 1;
  }

  localStorage.setItem("lastResult", resultTextElement.textContent);
}

function startCountdown() {
  countdownTextElement.textContent = countdown - 1;
  countdown -= 1;

  if (countdown) {
    setTimeout(() => startCountdown(), 600);
  } else {
    const selectedGameChoiceElement = document.querySelector(
      ".gameContent__gameChoice--isActive"
    );
    const selectedChoice = selectedGameChoiceElement.dataset.choice;
    randomResult = gameChoicesArray[getRandomNumber()];

    showResult(selectedChoice, randomResult);
    setTimeout(
      () => gameContentElement.classList.add(`gameContent--revealResult`),
      500
    );

    countdownTextElement.textContent = "";
    gameChoiceComputerElement.classList.add(
      `gameContent__gameChoice--is${randomResult}`
    );
    gameChoiceImageElement.setAttribute(
      "src",
      `./images/icon-${randomResult.toLowerCase()}.svg`
    );
    countdown = 4;
  }
}

function handleGameChoice(event) {
  gameContentElement.classList.add("gameContent--isActive");
  event.target.classList.add("gameContent__gameChoice--isActive");

  startCountdown();
}

function handlePlayAgain() {
  const activeChoiceElement = document.querySelector(
    ".gameContent__gameChoice--isActive"
  );

  gameContentElement.classList.remove(`gameContent--revealResult`);
  gameChoiceComputerElement.classList.remove(
    `gameContent__gameChoice--is${randomResult}`
  );
  gameChoiceImageElement.setAttribute("src", "");
  gameContentElement.classList.remove(
    "gameContent--isActive",
    "gameContent--isLost"
  );
  activeChoiceElement.classList.remove("gameContent__gameChoice--isActive");
}

// --- Event Listeners ---

rulesElement.addEventListener("click", toggleRulesModal);
closeElement.addEventListener("click", toggleRulesModal);
modalOverlayElement.addEventListener("click", toggleRulesModal);

gameChoiceElements.forEach((item) =>
  item.addEventListener("click", handleGameChoice)
);
resultButtonElement.addEventListener("click", handlePlayAgain);

window.onload = () => {
  const lastResult = localStorage.getItem("lastResult");
  if (lastResult) {
    resultTextElement.textContent = lastResult;
  }

  // Ensure the search bar and tags are shown
  document.querySelector(".search-bar").style.display = "block";
  document.querySelector(".tags").style.display = "block";
  const countryCards = document.querySelectorAll('.country-card'); // تأكد من أن هذا الـ selector صحيح
  countryCards.forEach(card => {
    card.addEventListener('click', () => {
      // الحصول على معلومات الدولة من الـ card
      const countryName = card.querySelector('h3').textContent; // تأكد من أن هذا الـ selector صحيح

      // استدعاء دالة showCountryDetail من script.js
      showCountryDetail(countryName); 
    });
  });
};

// --- Persistent Header ---
const header = document.getElementById("header");
const mainContent = document.querySelector("main");
mainContent.prepend(header);

// --- Filter Handling ---
let filterApplied = false;
function applyFilter(filter) {
  if (filterApplied) {
    resetFilters();
  }

  const filteredElements = document.querySelectorAll(".filterable");
  filteredElements.forEach((element) => {
    if (!element.classList.contains(filter)) {
      element.style.display = "none";
    } else {
      element.style.display = "block";
    }
  });
  filterApplied = true;
}

function resetFilters() {
  const filteredElements = document.querySelectorAll(".filterable");
  filteredElements.forEach((element) => {
    element.style.display = "block";
  });
  filterApplied = false;
}

// --- Filter Events ---
const filterButtons = document.querySelectorAll(".filter-button");
filterButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    const filter = event.target.dataset.filter;
    applyFilter(filter);
  });
});
