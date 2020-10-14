class PauseMenu {
  isOpen = false;

  getIsOpen() {
    return this.isOpen;
  }

  setIsOpen(isOpen) {
    this.isOpen = isOpen;
  }

  constructor(props) {
  }

  open() {
    this.setIsOpen(true);
    console.clear();
    let s = "" +
      "====================\n" +
      "|                  |\n" +
      "| 1) continue      |\n" +
      "| 2) quit          |\n" +
      "|                  |\n" +
      "====================\n"
    ;
    console.log(s);
  }

  close() {
    this.setIsOpen(false);
    console.clear();
  }

}

module.exports = {
  PauseMenu,
};