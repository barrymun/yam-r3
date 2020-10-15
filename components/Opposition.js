const MOVESET_TYPE_DAMAGE = 1;
const MOVESET_TYPE_BLOCK = 2;
const BANDIT = {
  health: 12,
  block: 0,
  moveset: [
    {
      type: MOVESET_TYPE_DAMAGE,
      amount: 10,
    },
  ],
};
const STARTING_ENEMIES = [
  BANDIT,
];
const ENEMY_SIZE = 5;

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

  constructor(props) {
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
          lines[i] += `|  ${enemies[j].health}    | `;
        } else {
          lines[i] += `|        | `;
        }
      }
    }
    lines.forEach(line => console.log(line));
  }

}

module.exports = {
  Opposition,
};