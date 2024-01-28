"use strict";

/** Memory game: find matching pairs of cards and flip both of them. */

const FOUND_MATCH_WAIT_MSECS = 1000;
let clickedCards = [];

const cardImgs = [
  "https://www.usmagazine.com/wp-content/uploads/2023/10/%E2%80%98RuPauls-Drag-Race-Is-Just-the-Beginning-for-Sasha-Colby-Im-%E2%80%98Pretty-Much-in-My-Mogul-Era1.jpg?crop=0px%2C0px%2C1509px%2C853px&resize=1200%2C675&quality=86&strip=all",
  "https://hips.hearstapps.com/hmg-prod/images/willow-pill-rupauls-drag-race-1638518778.jpg?crop=0.375xw:0.231xh;0.332xw,0.138xh&resize=1200:*",
  "https://m.media-amazon.com/images/M/MV5BZDUzYzhiYzEtYTUzYy00ZThiLTg1YWUtZTYyOWY2ZjhmZDJkXkEyXkFqcGdeQXVyOTAyMDgxODQ@._V1_.jpg",
  "https://i.pinimg.com/originals/ac/cc/3f/accc3f553e279689ac862b6780df2fec.jpg",
  "https://wp-cpr.s3.amazonaws.com/uploads/2019/06/yyvie_oddly.jpg",
  "https://i.pinimg.com/originals/b5/84/b6/b584b6c0d9671e53c6bea438e45191bb.jpg",
  "https://images.squarespace-cdn.com/content/v1/5eab3b70b84f3f08987b9979/1616439083470-PVIWQR1ZEDUQNN0H283C/Sasha.Headshot.2020.JPG",
  "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/0/0d/BobFullS8.jpg/revision/latest?cb=20200126221529",
  "https://pridesource.com/archive/uploads/2021/07/Violet-Chachki-Press-Photo-Credit-Franz-Szony-819x1024.jpg",
  "https://variety.com/wp-content/uploads/2022/12/BDR2_MattCrockett_75459_RT-1.png",
  "https://www.billboard.com/wp-content/uploads/media/Jinkx-Jose-Alberto-Guzman-Colon-2017-billboard-1548.jpg?w=942&h=623&crop=1",
  "https://socialitelife.com/wp-content/uploads/2019/03/sharonneedlespgh_1546456040.jpg",
  "https://pyxis.nymag.com/v1/imgs/754/3ce/c5dd521bf056c7d222948eec612a3c2cba-raja-chat-room-silo.png",
  "https://www.pride.com/media-library/tyra-sanchez.jpg?id=35379206&width=980&quality=85",
  "https://d1afn08pcmkzle.cloudfront.net/bebe-2.jpeg",
  "https://www.usmagazine.com/wp-content/uploads/2023/10/%E2%80%98RuPauls-Drag-Race-Is-Just-the-Beginning-for-Sasha-Colby-Im-%E2%80%98Pretty-Much-in-My-Mogul-Era1.jpg?crop=0px%2C0px%2C1509px%2C853px&resize=1200%2C675&quality=86&strip=all",
  "https://hips.hearstapps.com/hmg-prod/images/willow-pill-rupauls-drag-race-1638518778.jpg?crop=0.375xw:0.231xh;0.332xw,0.138xh&resize=1200:*",
  "https://m.media-amazon.com/images/M/MV5BZDUzYzhiYzEtYTUzYy00ZThiLTg1YWUtZTYyOWY2ZjhmZDJkXkEyXkFqcGdeQXVyOTAyMDgxODQ@._V1_.jpg",
  "https://i.pinimg.com/originals/ac/cc/3f/accc3f553e279689ac862b6780df2fec.jpg",
  "https://wp-cpr.s3.amazonaws.com/uploads/2019/06/yyvie_oddly.jpg",
  "https://i.pinimg.com/originals/b5/84/b6/b584b6c0d9671e53c6bea438e45191bb.jpg",
  "https://images.squarespace-cdn.com/content/v1/5eab3b70b84f3f08987b9979/1616439083470-PVIWQR1ZEDUQNN0H283C/Sasha.Headshot.2020.JPG",
  "https://static.wikia.nocookie.net/logosrupaulsdragrace/images/0/0d/BobFullS8.jpg/revision/latest?cb=20200126221529",
  "https://pridesource.com/archive/uploads/2021/07/Violet-Chachki-Press-Photo-Credit-Franz-Szony-819x1024.jpg",
  "https://variety.com/wp-content/uploads/2022/12/BDR2_MattCrockett_75459_RT-1.png",
  "https://www.billboard.com/wp-content/uploads/media/Jinkx-Jose-Alberto-Guzman-Colon-2017-billboard-1548.jpg?w=942&h=623&crop=1",
  "https://socialitelife.com/wp-content/uploads/2019/03/sharonneedlespgh_1546456040.jpg",
  "https://pyxis.nymag.com/v1/imgs/754/3ce/c5dd521bf056c7d222948eec612a3c2cba-raja-chat-room-silo.png",
  "https://www.pride.com/media-library/tyra-sanchez.jpg?id=35379206&width=980&quality=85",
  "https://d1afn08pcmkzle.cloudfront.net/bebe-2.jpeg",

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
  const gameBoard = document.getElementById("game");

  for (let i = 0; i < queens.length; i++) {
    const queenContainer = document.createElement('div');
    queenContainer.classList.add('queen-container');
    queenContainer.setAttribute('id', i);

    const img = document.createElement('img');
    img.setAttribute('src', queens[i]);
    img.setAttribute('alt', 'dragQueen winner');

    queenContainer.appendChild(img);
    gameBoard.appendChild(queenContainer);

    queenContainer.addEventListener('click', handleCardClick);
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
    }, FOUND_MATCH_WAIT_MSECS);
  } else {
    cards.map(card => card.removeEventListener('click', handleCardClick));
    clickedCards = [];
  }

}
