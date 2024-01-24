"use strict";

/** Memory game: find matching pairs of cards and flip both of them. */

const FOUND_MATCH_WAIT_MSECS = 1000;
let clickedCards = [];
const COLORS = [
  "red", "blue", "green", "orange", "purple",
  "red", "blue", "green", "orange", "purple",
];
//call to shuffle colors array
const colors = shuffle(COLORS);

createCards(colors);


/** Shuffle array items in-place and return shuffled array. */

function shuffle(items) {
  // This algorithm does a "perfect shuffle", where there won't be any
  // statistical bias in the shuffle (many naive attempts to shuffle end up not
  // be a fair shuffle). This is called the Fisher-Yates shuffle algorithm; if
  // you're interested, you can learn about it, but it's not important.

  for (let i = items.length - 1; i > 0; i--) {
    // generate a random index between 0 and i
    let j = Math.floor(Math.random() * i); //0-9
    // swap item at i <-> item at j
    [items[i], items[j]] = [items[j], items[i]];
  }

  return items;
}

/** Create card for every color in colors (each will appear twice)
 *
 * Each div DOM element will have:
 * - a class with the value of the color
 * -want to keep track of the individual card --use id with index
 * -also set whether the card is flipped or not
 * - a click event listener for each card to handleCardClick
 */

function createCards(colors) {

  const gameBoard = document.getElementById("game");
  for (let i = 0; i < colors.length; i++) {
    const div = document.createElement('div');
    div.classList.add(colors[i]);
    div.setAttribute('id', i);
    gameBoard.append(div);
    div.addEventListener('click', handleCardClick);
  }
}

/** Flip a card face-up. */

function flipCard(card) {
  const color = card.getAttribute('class');
  card.style.backgroundColor = color;
}

/** Flip a card face-down. */

function unFlipCard(cards) {
  cards.map(card => card.style.backgroundColor = 'white');
  clickedCards = [];
}

/** Handle clicking on a card: this could be first-card or second-card. */

function handleCardClick(evt) {
  const card = evt.target;
  const cardColor = evt.target.getAttribute('class');
  const cardId = evt.target.getAttribute('id');
  if (clickedCards.find(card => card.getAttribute('id') === cardId)) {
    return;
  } else {
    clickedCards.push(card);
    flipCard(card);
    if (clickedCards.length === 2) {
      checkForMatch(clickedCards);
    }
  }
}


function checkForMatch(cards) {
  if (cards[0].getAttribute('class') !== cards[1].getAttribute('class')) {
    setTimeout(() => {
      unFlipCard(cards);
    }, 1000);
  } else {
    cards.map(card => card.removeEventListener('click', handleCardClick));
    clickedCards = [];
  }

}
/*
check if colors are same
  not - flip them back over to blank and clear clickedCardsArray
  yes - keep flipped with color but dont make them accessible anymore and clear the array
*/