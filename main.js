const {GameOptions} = require("./components/GameOptions");
const {Player} = require("./components/Player");
const {Opposition} = require("./components/Opposition");

// let stdin = process.stdin;

// // without this, we would only get streams once enter is pressed
// stdin.setRawMode(true);
// // no binary
// stdin.setEncoding('utf8');
// // on any data into stdin
// stdin.on('data', function (key) {
//   // handle escape key
//   if (key === '\u001b') {
//     pMenu.open();
//     // process.exit()
//   }
// });


async function Main() {

  console.clear();

  let gameOptions = new GameOptions();
  // let pMenu = new PauseMenu();
  let player = new Player();
  let opposition = new Opposition();

  while (true) {
    console.clear();
    opposition.nextTurnSetup();
    opposition.printScene();
    player.renderPlayer();

    // the player can quit, fight or end their turn
    let options = parseInt(await gameOptions.getOptions());
    switch (options) {
      case gameOptions.QUIT:
        process.exit();  // end the game
        break;
      case gameOptions.FIGHT:
        // player has chosen to fight
        player.beginTurn();

        // player much choose what to do
        let choice = parseInt(await player.getOptions());
        switch (choice) {
          case player.END_TURN:
            // do nothing, skip to end of turn code
            break;
          case player.PLAY_CARD:
            let cardIndex = parseInt(await player.selectCardToPlay());
            await player.playCard(cardIndex, opposition);
            break;
          default:
            break;
        }

        // end the turn
        player.endTurn();
        break;
      case gameOptions.END_PLAYER_TURN:
        player.endTurn();
        break;
      default:
        break;
    }

    // player turn is over once this point is reached
    if (opposition.getEnemies().length <= 0) {
      // no enemies left, progress to next stage
      opposition.setStage(opposition.getStage() + 1);
      // TODO: notification to the player + reward screen
    } else {
      opposition.beginTurn(player);
    }
    opposition.endTurn();

    if (player.getHealth() <= 0) {
      console.log('GAME OVER');
      process.exit();
    }

  }

}

Main();