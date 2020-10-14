const {PlayerOptions} = require("./components/PlayerOptions");
const {Deck} = require("./components/Deck");
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
  let pOpts = new PlayerOptions();
  let pMenu = new PauseMenu();
  // let player = new Player();

  while (true) {
    let choice = await pOpts.getOptions();
    if (parseInt(choice) === pOpts.quit) process.exit();
    // break
  }


}

Main();