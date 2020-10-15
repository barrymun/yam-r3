const {getUserInput} = require("../utils");
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
  deck = [
    ...DEFAULT_PLAYER_DECK
  ];

  getDeck() {
    return this.deck;
  }

  setDeck(playerHand) {
    this.deck = playerHand;
  }

  hand = [];

  getHand() {
    return this.hand;
  }

  setHand(playerHand) {
    this.hand = playerHand;
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
    return this.discardPile;
  }

  setDiscardPile(discardPile) {
    this.discardPile = discardPile;
  }

  constructor() {
    // set the in play cards
    this.setDrawPile(this.shuffle(this.getDeck()));
  }

  beginTurn() {
    this.drawCards();
    this.printScene();
  }

  endTurn() {
    this.discardHand();
  }

  printScene() {
    this.renderHand();
  }

  renderHand() {
    let hand = this.getHand();
    if (hand.length === 0) return;
    let lines = [];
    for (let i = 0; i < CARD_SIZE; i++) {
      if (lines[i] == null) lines[i] = '';
      for (let j = 0; j < hand.length; j++) {
        if (i === 0 || i === CARD_SIZE - 1) {
          lines[i] += '========== ';
        } else if (i === 1) {
          lines[i] += `|  ${j}     | `;
        } else if (i === 2) {
          lines[i] += `|  ${hand[j].display}   | `;
        } else {
          lines[i] += `|        | `;
        }
      }
    }
    lines.forEach(line => console.log(line));
  }

  drawCards() {
    let drawCount = 0;
    while (drawCount < STANDARD_DRAW_AMOUNT && this.getHand().length <= MAX_CARDS_IN_HAND) {
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
      this.setHand([...this.getHand(), drawCard]);
      drawCount += 1;
    }
  }

  discardHand() {
    let forDiscard = this.getHand();
    this.setHand([]);
    this.setDiscardPile([...this.getDiscardPile(), ...forDiscard]);
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

  async selectCardToPlay() {
    let r = "select:\n";
    this.getHand().forEach((card, index) => {
      r += `[${index}] ${card.display}\n`;
    });
    return getUserInput(r);
  }

  async playCard(index) {
    let card = this.getHand()[index];
    let r = "select an enemy: ";
    return await getUserInput(r);
  }

}

module.exports = {
  Player,
};