const CARD_SIZE = 5;
const STANDARD_DRAW_AMOUNT = 5;
const MAX_CARDS_IN_HAND = 10;
const CARD_ATTACK = {
  id: 0,
  display: 'ATK',
};
const CARD_DEFEND = {
  id: 1,
  display: 'DEF',
};
const DEFAULT_PLAYER_DECK = [
  CARD_ATTACK,
  CARD_ATTACK,
  CARD_ATTACK,
  CARD_ATTACK,
  CARD_ATTACK,
  CARD_DEFEND,
  CARD_DEFEND,
  CARD_DEFEND,
  CARD_DEFEND,
  CARD_DEFEND,
];

class Player {
  playerDeck = [
    ...DEFAULT_PLAYER_DECK
  ];

  getPlayerDeck() {
    return this.playerDeck;
  }

  setPlayerDeck(playerHand) {
    this.playerDeck = playerHand;
  }

  playerHand = [];

  getPlayerHand() {
    return this.playerHand;
  }

  setPlayerHand(playerHand) {
    this.playerHand = playerHand;
  }

  drawPile = [];

  getDrawPile() {
    return this.drawPile;
  }

  setDrawPile(drawPile) {
    this.drawPile = drawPile;
  }

  discardPile = [];

  getDiscardPile() {
    return this.drawPile;
  }

  setDiscardPile(drawPile) {
    this.drawPile = drawPile;
  }

  constructor() {
    this.play();
  }

  play() {
    // set the in play cards
    this.setDrawPile(this.shuffle(this.getPlayerDeck()));
    this.printScene();
  }

  printScene() {
    this.drawCards();
    this.renderPlayerHand();
  }

  renderPlayerHand() {
    let hand = this.getPlayerHand();
    if (hand.length === 0) return;
    let lines = [];
    for (let i = 0; i < CARD_SIZE; i++) {
      if (lines[i] == null) lines[i] = '';
      for (let j = 0; j < hand.length; j++) {
        if (i === 0 || i === CARD_SIZE - 1) {
          lines[i] += '========== ';
        } else if (i === 1) {
          lines[i] += `|   ${hand[j].display}  | `;
        } else {
          lines[i] += `|        | `;
        }
      }
    }
    lines.forEach(line => console.log(line))
  }

  drawCards() {
    let drawCount = 0;
    while (drawCount < STANDARD_DRAW_AMOUNT && this.getPlayerHand().length <= MAX_CARDS_IN_HAND) {
      // check for cards in the draw pile
      if (this.getDrawPile().length <= 0) {
        // move the discard pile to the draw pile
        this.moveDiscardPileToDrawPile();

        // check that the draw pile is not empty
        if (this.getDrawPile().length <= 0) {
          // no draw cards left, end
          break;
        }
      }

      // set the new player hand
      let [drawCard, ...remainingDrawCards] = this.getDrawPile();
      this.setDrawPile(remainingDrawCards);
      this.setPlayerHand([...this.getPlayerHand(), drawCard]);
      drawCount += 1;
    }
  }

  /**
   * using this: https://stackoverflow.com/a/2450976
   *
   * @param array
   * @returns {*}
   */
  shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }

  moveDiscardPileToDrawPile() {
    if (this.getDrawPile().length > 0) return;
    let dp = this.getDiscardPile();
    this.setDiscardPile([]);
    this.setDrawPile(this.shuffle(dp));
  }

}

module.exports = {
  Player,
};