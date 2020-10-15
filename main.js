const {PlayerOptions} = require("./components/PlayerOptions");
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

  let stage = 0;

  let pOpts = new PlayerOptions();
  // let pMenu = new PauseMenu();
  let player = new Player();
  let opp = new Opposition();

  while (true) {
    console.clear();
    opp.printScene();
    player.beginTurn();

    let options = parseInt(await pOpts.getOptions());
    switch (options) {
      case pOpts.playCard:
        let cardIndex = parseInt(await player.selectCardToPlay());
        console.log({cardIndex})
        let card = await player.playCard(cardIndex);
        console.log({card})
        break;
      case pOpts.quit:
        process.exit();
        break;
      default:
        break;
    }

    player.endTurn();
  }


}

Main();