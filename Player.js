const CARD_SIZE = 5;
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

  constructor() {
    this.printScene();
  }

  printScene() {
    this.renderPlayerDeck();
  }

  renderPlayerDeck() {
    let ph = this.getPlayerDeck();
    let lines = [];
    for (let i = 0; i < CARD_SIZE; i++) {
      if (lines[i] == null) lines[i] = '';
      for (let j = 0; j < ph.length; j++) {
        if (i === 0 || i === CARD_SIZE - 1) {
          lines[i] += '========== ';
        } else if (i === 1) {
          lines[i] += `|   ${ph[j].display}  | `;
        } else {
          lines[i] += `|        | `;
        }
      }
    }
    lines.forEach(line => console.log(line))
  }
}

module.exports = {
  Player,
};