"use strict";

/** Memory game: find matching pairs of cards and flip both of them. */
const newGame = document.getElementById('reset-game');
const resetScores = document.getElementById('reset-scores');
const gameBoard = document.getElementById("game");
let score = document.getElementById('score');
score.innerText = 0;
let bestScore = document.getElementById('best-score');
bestScore.innerText = localStorage.getItem('highScore') ?? 0;

let clickedCards = [];
let pauseClick = false;
let matchCount = 0;

const cardImgs = [
  { srcImg: "sashaColby", id: 0, alt: 'Sasha Colby' },
  { srcImg: "willowPill", id: 1, alt: 'Willow Pill' },
  { srcImg: "symone", id: 2, alt: 'Symone' },
  { srcImg: "jaidaEssenceHall", id: 3, alt: 'Jaida Essence Hall' },
  { srcImg: "yyvieOddly", id: 4, alt: 'Yyvie Oddly' },
  { srcImg: "aquaria", id: 5, alt: 'Aquaria' },
  { srcImg: "sashaVelour", id: 6, alt: 'Sasha Velour' },
  { srcImg: "bobDragQueen", id: 7, alt: 'Bob the Drag Queen' },
  { srcImg: "violetChachki", id: 8, alt: 'Violet Chachki' },
  { srcImg: "biancaDelRio", id: 9, alt: 'Bianca Del Rio' },
  { srcImg: "jinkxMonsoon", id: 10, alt: 'Jinkx Monsoon' },
  { srcImg: "sharonNeedles", id: 11, alt: 'Sharon Needles' },
  { srcImg: "rajaGemini", id: 12, alt: 'Raja Gemini' },
  { srcImg: "tyraSanchez", id: 13, alt: 'Tyra Sanchez' },
  { srcImg: "bebeZahara", id: 14, alt: 'BeBe Zahara Benet' },
  { srcImg: "sashaColby", id: 15, alt: 'Sasha Colby' },
  { srcImg: "willowPill", id: 16, alt: 'Willow Pill' },
  { srcImg: "symone", id: 17, alt: 'Symone' },
  { srcImg: "jaidaEssenceHall", id: 18, alt: 'Jaida Essence Hall' },
  { srcImg: "yyvieOddly", id: 19, alt: 'Yyvie Oddly' },
  { srcImg: "aquaria", id: 20, alt: 'Aquaria' },
  { srcImg: "sashaVelour", id: 21, alt: 'Sasha Velour' },
  { srcImg: "bobDragQueen", id: 22, alt: 'Bob the Drag Queen' },
  { srcImg: "violetChachki", id: 23, alt: 'Violet Chachki' },
  { srcImg: "biancaDelRio", id: 24, alt: 'Bianca Del Rio' },
  { srcImg: "jinkxMonsoon", id: 25, alt: 'Jinkx Monsoon' },
  { srcImg: "sharonNeedles", id: 26, alt: 'Sharon Needles' },
  { srcImg: "rajaGemini", id: 27, alt: 'Raja Gemini' },
  { srcImg: "tyraSanchez", id: 28, alt: 'Tyra Sanchez' },
  { srcImg: "bebeZahara", id: 29, alt: 'BeBe Zahara Benet' }

];
const queens = shuffle(cardImgs);

createCards(queens);


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
/** Create card deck */

function createCards(queens) {

  for (let i = 0; i < queens.length; i++) {
    const queenContainer = document.createElement('div');
    queenContainer.classList.add('queen-container');
    queenContainer.setAttribute('id', queens[i].id);

    const img = document.createElement('img');
    img.setAttribute('src', `./images/${queens[i].srcImg}.jpg`);
    img.setAttribute('alt', queens[i].alt);

    const cardFront = document.createElement('div');
    cardFront.classList.add('front');

    queenContainer.append(img, cardFront);
    gameBoard.appendChild(queenContainer);

  }
}

/** Flip a card face-up. */

function flipCard(card) {
  const children = card.children;
  card.insertBefore(children[1], children[0]);
}

/** Flip a card face-down. */

function unFlipCard(cards) {
  cards.map(card => {
    const children = card.children;
    card.insertBefore(children[1], children[0]);
  });
  clickedCards = [];
  pauseClick = false;
}


function handleCardClick(evt) {
  if (evt.target.classList.contains('front')) {
    if (!pauseClick) {
      const containerCard = evt.target.parentElement;
      const cardId = containerCard.getAttribute('id');
      if (clickedCards.find(card => card.getAttribute('id') === cardId)) {
        return;
      } else {
        clickedCards.push(containerCard);
        flipCard(containerCard);
        if (clickedCards.length === 2) {
          pauseClick = true;
          checkForMatch(clickedCards);
        }
      }
    }
  }

}


function checkForMatch(cards) {
  const largerIndex = Math.max(cards[0].getAttribute('id'), cards[1].getAttribute('id'));
  const smallerIndex = Math.min(cards[0].getAttribute('id'), cards[1].getAttribute('id'));
  if (largerIndex - cardImgs.length / 2 !== smallerIndex) {
    setTimeout(() => {
      unFlipCard(cards);
    }, 1000);
  } else {
    matchCount++;
    setTimeout(() => {
      cards.map(card => card.removeEventListener('click', handleCardClick));
      clickedCards = [];
      pauseClick = false;
      if (matchCount === 15) {
        updateStorage();
        alert("YOU'VE MATCHED THEM ALL!");
      }
    }, 600);
  }
  score.innerText = Number(score.innerText);
  score.innerText++;

}
function updateStorage() {
  const prevScore = localStorage.getItem('highScore');
  if (prevScore === null) {
    localStorage.setItem('highScore', score.innerText);
    bestScore.innerText = localStorage.getItem('highScore');
  }
  if (Number(score.innerText) < Number(prevScore)) {
    localStorage.setItem('highScore', score.innerText);
    bestScore.innerText = localStorage.getItem('highScore');

  }
}

gameBoard.addEventListener('click', handleCardClick);
newGame.addEventListener('click', () => {
  location.reload();
});
resetScores.addEventListener('click', () => {
  location.reload();
  localStorage.removeItem('highScore');
});