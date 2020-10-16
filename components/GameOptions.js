const {getUserInput} = require("../utils");

class GameOptions {
  QUIT = 0;
  FIGHT = 1;
  END_PLAYER_TURN = 2;

  async getOptions() {
    const query = "" +
      "select:\n" +
      `[${this.QUIT}] quit\n` +
      `[${this.FIGHT}] fight\n` +
      `[${this.END_PLAYER_TURN}] end turn\n` +
      `=> `
    ;
    return getUserInput(query);
  }
}

module.exports = {
  GameOptions,
};