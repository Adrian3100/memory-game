const gameBoard = document.getElementById("gameBoard");
const emojis = ["🍕", "🍔", "🍟", "🌮", "🍩", "🍪", "🍎", "🍉"];
let cards = [...emojis, ...emojis];
let flippedCards = [];
let lockBoard = false;

// Shuffle cards
cards.sort(() => 0.5 - Math.random());

// Create card elements
cards.forEach((emoji, index) => {
  const card = document.createElement("div");
  card.classList.add("card");
  card.dataset.emoji = emoji;
  card.innerHTML = `<span>${emoji}</span>`;
  card.addEventListener("click", handleFlip);
  gameBoard.appendChild(card);
});

function handleFlip(e) {
  const card = e.currentTarget;

  if (
    lockBoard ||
    card.classList.contains("flipped") ||
    card.classList.contains("matched")
  )
    return;

  card.classList.add("flipped");
  flippedCards.push(card);

  if (flippedCards.length === 2) {
    checkMatch();
  }
}

function checkMatch() {
  lockBoard = true;
  const [card1, card2] = flippedCards;

  if (card1.dataset.emoji === card2.dataset.emoji) {
    card1.classList.add("matched");
    card2.classList.add("matched");
    resetBoard();
  } else {
    setTimeout(() => {
      card1.classList.remove("flipped");
      card2.classList.remove("flipped");
      resetBoard();
    }, 1000);
  }
}

function resetBoard() {
  [flippedCards, lockBoard] = [[], false];
}
