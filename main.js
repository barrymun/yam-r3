const {PlayerOptions} = require("./components/PlayerOptions");
const {Player} = require("./components/Player");
const {PauseMenu} = require("./components/PauseMenu");

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

  let pOpts = new PlayerOptions();
  let pMenu = new PauseMenu();
  let player = new Player();
  player.play();

  while (true) {
    console.clear();
    player.beginTurn();
    let choice = await pOpts.getOptions();

    switch (parseInt(choice)) {
      case pOpts.play:
        console.log('PLAY');
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