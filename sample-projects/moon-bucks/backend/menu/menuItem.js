const { nanoid } = require('nanoid');

function menuItem(name) {
  this.menuId = nanoid();
  this.name = name;
  this.isSoldOut = false;
}

module.exports = menuItem;
