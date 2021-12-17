const { nanoid } = require('nanoid');

const validator = {
  isNumber(value) {
    return value && !isNaN(value);
  },
  isEmptyStr(value) {
    return value === '' || value === undefined || value === null;
  },
  isArray(value) {
    return Array.isArray(value);
  },
};

function Store() {
  this.id = nanoid();
  this.menuBoard = {
    espresso: [],
    frappuccino: [],
    blended: [],
    teavana: [],
    desert: [],
  };
  this.isValid = ({ res, category = null, menuId = null, name = null }) => {
    if (
      !validator.isArray(this.menuBoard[category]) &&
      !!this.menuBoard[category]
    ) {
      res.status(404).json({ message: '존재하지 않는 카테고리 입니다.' });
      return;
    }
    if (menuId && !this.isExistMenuItem(category, menuId)) {
      res.status(404).json({ message: '존재하지 않는 메뉴 입니다.' });
      return;
    }
    if (name && !this.isValidMenuName(name)) {
      res
        .status(400)
        .json({ message: '메뉴 이름은 최소 2글자 이상이어야 합니다.' });
      return;
    }

    return true;
  };
  this.isValidMenuName = name => {
    return typeof name === 'string' && name.length > 1;
  };

  this.createMenuItem = (category, menuItem) => {
    this.menuBoard[category].push(menuItem);
  };
  this.toggleSoldOutMenuItem = (category, menuId) => {
    const index = this.menuBoard[category].findIndex(
      item => item.menuId === menuId,
    );
    if (this.menuBoard[category][index]) {
      this.menuBoard[category][index].isSoldOut =
        !this.menuBoard[category][index].isSoldOut;
    }
  };
  this.updateMenuItem = (category, menuId, name) => {
    this.menuBoard[category].find(item => item.menuId === menuId).name = name;
  };
  this.getMenuListByCategory = category => {
    return this.menuBoard[category];
  };
  this.getByMenuId = (category, menuId) => {
    return this.menuBoard[category].find(item => item.menuId === menuId);
  };
  this.isDuplicatedMenu = (category, name) => {
    return !!this.menuBoard[category].find(item => item.name === name);
  };
  this.isExistMenuItem = (category, menuId) => {
    return !!this.menuBoard[category].find(
      menuItem => menuItem.menuId === menuId,
    );
  };
  this.deleteMenuItem = (category, menuId) => {
    const menuItemIndex = this.menuBoard[category].findIndex(
      menu => menu.id === menuId,
    );
    this.menuBoard[category].splice(menuItemIndex, 1);
    console.log(this.menuBoard[category]);
  };
}

module.exports = Store;
