const {getUserInput} = require("../utils");
const CARD_SIZE = 5;
const STANDARD_DRAW_AMOUNT = 5;
const MAX_CARDS_IN_HAND = 10;
const CARD_TYPE_ATTACK = 1;
const CARD_TYPE_DEFEND = 2;
const CARD_ATTACK = {
  id: 0,
  display: 'ATK',
  type: CARD_TYPE_ATTACK,
  amount: 6,
  cost: 1,
};
const CARD_DEFEND = {
  id: 1,
  display: 'DEF',
  type: CARD_TYPE_DEFEND,
  amount: 5,
  cost: 1,
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
  // fight options
  END_TURN = 0;
  PLAY_CARD = 1;

  health = 70;

  getHealth() {
    return this.health;
  }

  setHealth(health) {
    this.health = health;
  }

  block = 0;

  getBlock() {
    return this.block;
  }

  setBlock(block) {
    this.block = block;
  }

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

  maxEnergy = 3;

  getMaxEnergy() {
    return this.maxEnergy;
  }

  setMaxEnergy(maxEnergy) {
    this.maxEnergy = maxEnergy;
  }

  energy = 0;

  getEnergy() {
    return this.energy;
  }

  setEnergy(energy) {
    this.energy = energy;
  }

  constructor() {
    // set the in play cards
    this.setDrawPile(this.shuffle(this.getDeck()));
  }

  beginTurn() {
    this.setEnergy(this.getMaxEnergy());
    this.setBlock(0);
    this.drawCards();
    this.printScene();
  }

  endTurn() {
    this.discardHand();
  }

  printScene() {
    this.renderHand();
    this.printEnergyRemaining();
  }

  printEnergyRemaining() {
    console.log(`energy remaining: ${this.getEnergy()}`);
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

  renderPlayer() {
    let s = "\n" +
      "================\n" +
      `| health: ${this.getHealth()} |\n` +
      `| block: ${this.getBlock()} |\n` +
      "================\n"
    ;
    console.log(s);
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

  async getOptions() {
    const query = "" +
      "select:\n" +
      `[${this.END_TURN}] end turn\n` +
      `[${this.PLAY_CARD}] play a card\n` +
      `=> `
    ;
    return getUserInput(query);
  }

  async selectCardToPlay() {
    let r = "select:\n";
    this.getHand().forEach((card, index) => {
      r += `[${index}] ${card.display}\n`;
    });
    return getUserInput(r);
  }

  async playCard(index, opposition) {
    // check that the card can be played
    let card = this.getHand()[index];
    if (card == null) {
      console.log("invalid choice");
      return false;
    }

    if (this.getEnergy() < card.cost) {
      // player cannot play this card
      console.log("not enough energy!");
      return false;
    }

    switch (card.type) {
      case CARD_TYPE_ATTACK:
        let enemy = null;
        let enemyToAttack = null;
        // attempt to retrieve a target
        while (true) {
          opposition.renderEnemies();
          enemyToAttack = parseInt(await getUserInput("select an enemy: "));
          try {
            enemy = opposition.getEnemies()[enemyToAttack]
          } catch (e) {
          }
          // keep looping until a valid enemy has been selected
          if (enemy == null) {
            console.log("please select a valid enemy");
          } else {
            break;
          }
        }
        // target has been selected
        opposition.receiveDamage(enemyToAttack, card.amount);
        break;
      case CARD_TYPE_DEFEND:
        this.setBlock(this.getBlock() + card.amount);
        break;
      default:
        break;
    }

    // remove the cost to play the card
    this.setEnergy(this.getEnergy() - card.cost);

    // send the card to the discard pile
    this.setHand([
      ...this.getHand().slice(0, index),
      ...this.getHand().slice(index + 1),
    ]);
    this.setDiscardPile([...this.getDiscardPile(), card]);
    return true;
  }

}

module.exports = {
  Player,
};