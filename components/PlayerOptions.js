const readline = require('readline');

class PlayerOptions {
  play = 1;
  quit = 2;

  async getOptions() {
    console.clear();

    const query = "" +
      "select:\n" +
      `[${this.play}] choose a card\n` +
      `[${this.quit}] quit\n`
    ;

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    return new Promise(resolve => rl.question(query, ans => {
      rl.close();
      resolve(ans);
    }))
  }
}

module.exports = {
  PlayerOptions,
};