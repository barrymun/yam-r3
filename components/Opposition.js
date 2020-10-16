const {getRandomInt} = require("../utils");

const MOVESET_TYPE_DAMAGE = 1;
const MOVESET_TYPE_BLOCK = 2;
const MOVESET_DESCRIPTION = {
  [MOVESET_TYPE_DAMAGE]: 'damage',
  [MOVESET_TYPE_BLOCK]: 'block',
};
const BANDIT = {
  health: 12,
  block: 0,
  moveset: [
    {
      type: MOVESET_TYPE_DAMAGE,
      amount: 5,
    },
    {
      type: MOVESET_TYPE_BLOCK,
      amount: 2,
    },
  ],
};
const STARTING_ENEMIES = [
  BANDIT,
];
const ENEMY_SIZE = 7;

class Opposition {
  stage = 0;

  getStage() {
    return this.stage;
  }

  setStage(stage) {
    this.stage = stage;
  }

  enemies = [];

  getEnemies() {
    return this.enemies;
  }

  setEnemies(enemies) {
    this.enemies = enemies;
  }

  nextTurnMoveset = [];

  getNextTurnMoveset() {
    return this.nextTurnMoveset;
  }

  setNextTurnMoveset(nextTurnMoveset) {
    this.nextTurnMoveset = nextTurnMoveset;
  }

  constructor() {
    this.setEnemies(STARTING_ENEMIES);
  }

  printScene() {
    this.renderEnemies();
  }

  renderEnemies() {
    let enemies = this.getEnemies();
    if (enemies.length === 0) return;
    let lines = [];
    for (let i = 0; i < ENEMY_SIZE; i++) {
      if (lines[i] == null) lines[i] = '';
      for (let j = 0; j < enemies.length; j++) {
        if (i === 0 || i === ENEMY_SIZE - 1) {
          lines[i] += '========== ';
        } else if (i === 1) {
          lines[i] += `|  ${j}     | `;
        } else if (i === 2) {
          lines[i] += `|  health: ${enemies[j].health}    | `;
        } else if (i === 3) {
          lines[i] += `|  block: ${enemies[j].block}    | `;
        } else if (i === 4) {
          lines[i] += `|  ${MOVESET_DESCRIPTION[this.getNextTurnMoveset()[j].type.toString()]} for ${this.getNextTurnMoveset()[j].amount}    | `;
        } else {
          lines[i] += `|        | `;
        }
      }
    }
    lines.forEach(line => console.log(line));
  }

  nextTurnSetup() {
    this.getEnemies().forEach((enemy, index) => {
      // determine the moves that each enemy will perform when the player turn ends
      let moveIndex = getRandomInt(0, enemy.moveset.length - 1);
      let move = enemy.moveset[moveIndex];
      this.setNextTurnMoveset([
        ...this.getNextTurnMoveset().slice(0, index),
        move,
        ...this.getEnemies().slice(index + 1),
      ])
    });
  }

  beginTurn(player) {

    this.getEnemies().forEach((enemy, index) => {
      // reset the block for all enemies
      this.setEnemies([
        ...this.getEnemies().slice(0, index),
        {
          ...enemy,
          block: 0,
        },
        ...this.getEnemies().slice(index + 1),
      ]);
    });

    // determine the move that each enemy will complete
    this.getEnemies().forEach((enemy, index) => {
      let move = this.getNextTurnMoveset()[index];
      switch (move.type) {
        case MOVESET_TYPE_DAMAGE:
          let damage = move.amount;

          if (damage <= player.block) {
            player.setBlock(player.getBlock() - damage);
          } else {
            let healthDamage = damage - player.getBlock();
            player.setBlock(0);
            if (healthDamage < player.getHealth()) {
              player.setHealth(player.getHealth() - healthDamage);
            } else {
              // game will end
              player.setHealth(0);
            }
          }

          break;
        case MOVESET_TYPE_BLOCK:
          this.setEnemies([
            ...this.getEnemies().slice(0, index),
            {
              ...enemy,
              block: enemy.block + move.amount,
            },
            ...this.getEnemies().slice(index + 1),
          ]);
          break;
        default:
          break;
      }
    });
  }

  endTurn() {
  }

}

module.exports = {
  Opposition,
};