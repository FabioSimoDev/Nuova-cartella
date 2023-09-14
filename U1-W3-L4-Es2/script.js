const restart = () => {
  window.location.reload();
};

const initBingo = () => {
  // genera tabellone
  const board = document.getElementById("board");

  for (let i = 1; i <= 76; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.textContent = i;
    board.appendChild(cell);
  }

  // genera tabelle player
  const numCardsInput = document.getElementById("numCards");
  const cardsContainer = document.getElementById("cards");

  const generatePlayerTables = function () {
    cardsContainer.innerHTML = "";

    const numCards = numCardsInput.value;

    for (let i = 0; i < numCards; i++) {
      const card = document.createElement("div");
      card.classList.add("card");

      const numbers = generateCard();

      numbers.forEach((number) => {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.textContent = number;
        card.appendChild(cell);
      });

      cardsContainer.appendChild(card);
    }
  };

  numCardsInput.addEventListener("input", generatePlayerTables);

  // gestione estrazione numeri
  const extractedNumbers = [];

  const extractBtn = document.getElementById("extract");

  const extractNumbers = function () {
    if (document.querySelectorAll("#board > .extracted").length < 76) {
      console.log(document.querySelectorAll("#board > .extracted").length);
      numCardsInput.disabled = "true";
      let newNumber;
      do {
        newNumber = Math.floor(Math.random() * 76) + 1;
      } while (extractedNumbers.includes(newNumber));

      extractedNumbers.push(newNumber);

      const cell = document.querySelector(`.cell:nth-child(${newNumber})`);
      cell.classList.add("extracted");
      prova(cell, newNumber);
    } else {
      alert("bingooo");
      restart();
    }
  };

  function prova(cell, number) {
    document.querySelectorAll(".card .cell").forEach((cell) => {
      if (cell.textContent == number) {
        cell.classList.add("extracted");
      }
    });
  }

  extractBtn.addEventListener("click", extractNumbers);

  // genera numeri casuali per una tabella
  const generateCard = function () {
    const numbers = [];
    while (numbers.length < 24) {
      const randomNumber = Math.floor(Math.random() * 76) + 1;
      if (!numbers.includes(randomNumber)) {
        numbers.push(randomNumber);
      }
    }
    return numbers;
  };

  if (document.querySelector(".card") === null) {
    generatePlayerTables();
  }
};

const container = document.getElementsByClassName("container")[0];
container.style.display = "none";

const startGame = (element) => {
  element.parentElement.remove();
  initBingo();
  container.style.display = "block";
};
