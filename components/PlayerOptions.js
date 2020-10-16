const {getUserInput} = require("../utils");

class PlayerOptions {
  quit = 0;
  fight = 1;
  endTurn = 2;

  async getOptions() {
    const query = "" +
      "select:\n" +
      `[${this.quit}] quit\n` +
      `[${this.fight}] fight\n` +
      `[${this.endTurn}] end turn\n` +
      `=> `
    ;
    return getUserInput(query);
  }
}

module.exports = {
  PlayerOptions,
};