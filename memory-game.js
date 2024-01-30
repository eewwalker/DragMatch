"use strict";

/** Memory game: find matching pairs of cards and flip both of them. */
const resetBtn = document.getElementById('reset-game');
const gameBoard = document.getElementById("game");
let score = document.getElementById('score');
let bestScore = document.getElementById('best-score');
score.innerText = 0;
bestScore.innerText = 0;
let clickedCards = [];
let pauseClick = false;

const cardImgs = [
  { srcImg: "https://www.usmagazine.com/wp-content/uploads/2023/10/%E2%80%98RuPauls-Drag-Race-Is-Just-the-Beginning-for-Sasha-Colby-Im-%E2%80%98Pretty-Much-in-My-Mogul-Era1.jpg?crop=0px%2C0px%2C1509px%2C853px&resize=1200%2C675&quality=86&strip=all", id: 0, alt: 'Sasha Colby' },
  { srcImg: "https://hips.hearstapps.com/hmg-prod/images/willow-pill-rupauls-drag-race-1638518778.jpg?crop=0.375xw:0.231xh;0.332xw,0.138xh&resize=1200:*", id: 1, alt: 'Willow Pill' },
  { srcImg: "https://m.media-amazon.com/images/M/MV5BZDUzYzhiYzEtYTUzYy00ZThiLTg1YWUtZTYyOWY2ZjhmZDJkXkEyXkFqcGdeQXVyOTAyMDgxODQ@._V1_.jpg", id: 2, alt: 'Symone' },
  { srcImg: "https://i.pinimg.com/originals/ac/cc/3f/accc3f553e279689ac862b6780df2fec.jpg", id: 3, alt: 'Jaida Essence Hall' },
  { srcImg: "https://wp-cpr.s3.amazonaws.com/uploads/2019/06/yyvie_oddly.jpg", id: 4, alt: 'Yyvie Oddly' },
  { srcImg: "https://i.pinimg.com/originals/b5/84/b6/b584b6c0d9671e53c6bea438e45191bb.jpg", id: 5, alt: 'Aquaria' },
  { srcImg: "https://images.squarespace-cdn.com/content/v1/5eab3b70b84f3f08987b9979/1616439083470-PVIWQR1ZEDUQNN0H283C/Sasha.Headshot.2020.JPG", id: 6, alt: 'Sasha Velour' },
  { srcImg: "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/0/0d/BobFullS8.jpg/revision/latest?cb=20200126221529", id: 7, alt: 'Bob the Drag Queen' },
  { srcImg: "https://pridesource.com/archive/uploads/2021/07/Violet-Chachki-Press-Photo-Credit-Franz-Szony-819x1024.jpg", id: 8, alt: 'Violet Chachki' },
  { srcImg: "https://variety.com/wp-content/uploads/2022/12/BDR2_MattCrockett_75459_RT-1.png", id: 9, alt: 'Bianca Del Rio' },
  { srcImg: "https://www.billboard.com/wp-content/uploads/media/Jinkx-Jose-Alberto-Guzman-Colon-2017-billboard-1548.jpg?w=942&h=623&crop=1", id: 10, alt: 'Jinkx Monsoon' },
  { srcImg: "https://socialitelife.com/wp-content/uploads/2019/03/sharonneedlespgh_1546456040.jpg", id: 11, alt: 'Sharon Needles' },
  { srcImg: "https://pyxis.nymag.com/v1/imgs/754/3ce/c5dd521bf056c7d222948eec612a3c2cba-raja-chat-room-silo.png", id: 12, alt: 'Raja Gemini' },
  { srcImg: "https://www.pride.com/media-library/tyra-sanchez.jpg?id=35379206&width=980&quality=85", id: 13, alt: 'Tyra Sanchez' },
  { srcImg: "https://d1afn08pcmkzle.cloudfront.net/bebe-2.jpeg", id: 14, alt: 'BeBe Zahara Benet' },
  { srcImg: "https://www.usmagazine.com/wp-content/uploads/2023/10/%E2%80%98RuPauls-Drag-Race-Is-Just-the-Beginning-for-Sasha-Colby-Im-%E2%80%98Pretty-Much-in-My-Mogul-Era1.jpg?crop=0px%2C0px%2C1509px%2C853px&resize=1200%2C675&quality=86&strip=all", id: 15, alt: 'Sasha Colby' },
  { srcImg: "https://hips.hearstapps.com/hmg-prod/images/willow-pill-rupauls-drag-race-1638518778.jpg?crop=0.375xw:0.231xh;0.332xw,0.138xh&resize=1200:*", id: 16, alt: 'Willow Pill' },
  { srcImg: "https://m.media-amazon.com/images/M/MV5BZDUzYzhiYzEtYTUzYy00ZThiLTg1YWUtZTYyOWY2ZjhmZDJkXkEyXkFqcGdeQXVyOTAyMDgxODQ@._V1_.jpg", id: 17, alt: 'Symone' },
  { srcImg: "https://i.pinimg.com/originals/ac/cc/3f/accc3f553e279689ac862b6780df2fec.jpg", id: 18, alt: 'Jaida Essence Hall' },
  { srcImg: "https://wp-cpr.s3.amazonaws.com/uploads/2019/06/yyvie_oddly.jpg", id: 19, alt: 'Yyvie Oddly' },
  { srcImg: "https://i.pinimg.com/originals/b5/84/b6/b584b6c0d9671e53c6bea438e45191bb.jpg", id: 20, alt: 'Aquaria' },
  { srcImg: "https://images.squarespace-cdn.com/content/v1/5eab3b70b84f3f08987b9979/1616439083470-PVIWQR1ZEDUQNN0H283C/Sasha.Headshot.2020.JPG", id: 21, alt: 'Sasha Velour' },
  { srcImg: "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/0/0d/BobFullS8.jpg/revision/latest?cb=20200126221529", id: 22, alt: 'Bob the Drag Queen' },
  { srcImg: "https://pridesource.com/archive/uploads/2021/07/Violet-Chachki-Press-Photo-Credit-Franz-Szony-819x1024.jpg", id: 23, alt: 'Violet Chachki' },
  { srcImg: "https://variety.com/wp-content/uploads/2022/12/BDR2_MattCrockett_75459_RT-1.png", id: 24, alt: 'Bianca Del Rio' },
  { srcImg: "https://www.billboard.com/wp-content/uploads/media/Jinkx-Jose-Alberto-Guzman-Colon-2017-billboard-1548.jpg?w=942&h=623&crop=1", id: 25, alt: 'Jinkx Monsoon' },
  { srcImg: "https://socialitelife.com/wp-content/uploads/2019/03/sharonneedlespgh_1546456040.jpg", id: 26, alt: 'Sharon Needles' },
  { srcImg: "https://pyxis.nymag.com/v1/imgs/754/3ce/c5dd521bf056c7d222948eec612a3c2cba-raja-chat-room-silo.png", id: 27, alt: 'Raja Gemini' },
  { srcImg: "https://www.pride.com/media-library/tyra-sanchez.jpg?id=35379206&width=980&quality=85", id: 28, alt: 'Tyra Sanchez' },
  { srcImg: "https://d1afn08pcmkzle.cloudfront.net/bebe-2.jpeg", id: 29, alt: 'BeBe Zahara Benet' }

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
    img.setAttribute('src', queens[i].srcImg);
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
    setTimeout(() => {
      cards.map(card => card.removeEventListener('click', handleCardClick));
      clickedCards = [];
      pauseClick = false;
    }, 800);

  }
  score.innerText = Number(score.innerText);
  score.innerText++;

}

gameBoard.addEventListener('click', handleCardClick);
resetBtn.addEventListener('click', () => {
  location.reload();
});