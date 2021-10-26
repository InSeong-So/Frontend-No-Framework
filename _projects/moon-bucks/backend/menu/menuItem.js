const { nanoid } = require("nanoid");

function menuItem(name) {
  this.id = nanoid();
  this.name = name;
  this.isSoldOut = false;
}

module.exports = menuItem;
