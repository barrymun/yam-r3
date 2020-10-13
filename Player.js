const CARD_SIZE = 5;
const CARD_ATTACK = 0;
const CARD_DEFEND = 1;
const CARD_TYPES = {
  CARD_ATTACK: 'ATK',
  CARD_DEFEND: 'DEF',
};

class Player {
  printScene() {
    let lines = this.drawCards();
    lines.forEach(line => console.log(line))
  }

  getPlayerHand() {}

  drawCards() {
    let n=3
    let lines = [];
    for (let i = 0; i < CARD_SIZE; i++) {
      if (lines[i] == null) lines[i] = '';
      for (let j = 0; j < n; j++) {
        if (i === 0 || i === CARD_SIZE - 1) {
          lines[i] += '========== ';
        } else {
          lines[i] += '|        | ';
        }
      }
    }
    return lines;
  }
}

module.exports = {
  Player,
};