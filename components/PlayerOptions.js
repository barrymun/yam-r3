const {getUserInput} = require("../utils");

class PlayerOptions {
  playCard = 1;
  quit = 2;

  async getOptions() {
    const query = "" +
      "select:\n" +
      `[${this.playCard}] choose a card\n` +
      `[${this.quit}] quit\n`
    ;
    return getUserInput(query);
  }
}

module.exports = {
  PlayerOptions,
};