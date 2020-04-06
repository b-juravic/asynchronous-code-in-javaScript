const shuffleAndDrawCard = "https://deckofcardsapi.com/api/deck/new/draw/";
const base_url = "https://deckofcardsapi.com/api/deck/"
const newShuffledDeck = "https://deckofcardsapi.com/api/deck/new/shuffle/"
let deckId;

// PART 1
async function drawSingleCard() {
  let response = await axios.get(shuffleAndDrawCard);
  let cardValue = response.data.cards[0].value;
  let cardSuit = response.data.cards[0].suit;
  $("body").append(`<p>${cardValue} of ${cardSuit}</p>`)
}

// drawSingleCard();

// PART 2
async function twoCardsSameDeck() {
  let firstResp = await axios.get(shuffleAndDrawCard);
  let cardValue1 = firstResp.data.cards[0].value;
  let cardSuit1 = firstResp.data.cards[0].suit;

  let cardDeckId = firstResp.data.deck_id;

  let secondResp = await axios.get(`${base_url}${cardDeckId}/draw`)
  let cardValue2 = secondResp.data.cards[0].value;
  let cardSuit2 = secondResp.data.cards[0].suit;

  console.log(`card and suit 1: ${cardValue1} of ${cardSuit1}, card and suit 2: ${cardValue2} of ${cardSuit2}`);
}

// twoCardsSameDeck();

// PART 3

async function getShuffledDeck() {
  let response = await axios.get(newShuffledDeck);

  let deckId = response.data.deck_id;

  return deckId;
}

async function drawCard() {
  let card = await axios.get(`${base_url}${deckId}/draw`);
  let cardValue = card.data.cards[0].value;
  let cardSuit = card.data.cards[0].suit;

  $("#card-container").append(`<p>${cardValue} of ${cardSuit}</p>`)
  console.log(card.data.remaining);
}

$(async function() {
  deckId = await getShuffledDeck();

  $("button").on("click", drawCard);
})

