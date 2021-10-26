const express = require("express");
const router = express.Router();
const menuItem = require("../menu/menuItem");
const Store = require("../store");
const menuStore = new Store();

// 메뉴 불러오기
router.get("/category/:category/menu", async (req, res) => {
  const { category } = req.params;

  if (!menuStore.isValid({ res, category })) {
    return;
  }

  try {
    const menuList = menuStore.getMenuListByCategory(category);
    res.status(200).json(menuList);
  } catch (e) {
    res.status(500).json({
      message: "메뉴 리스트를 가져오는데 에러가 발생했습니다.",
      error: e,
    });
  }
});

// 메뉴 추가
router.post("/category/:category/menu", async (req, res) => {
  const { category } = req.params;
  const { name } = req.body;

  if (!menuStore.isValid({ res, category, name })) {
    return;
  }

  if (menuStore.isDuplicatedMenu(category, name)) {
    res.status(400).json({ message: "이미 등록되어 있는 메뉴입니다." });
    return;
  }

  try {
    const newMenuItem = new menuItem(name);
    menuStore.createMenuItem(category, newMenuItem);
    res.status(200).json(newMenuItem);
  } catch (e) {
    res.status(500).json({
      message: "새로운 메뉴를 추가하는데 에러가 발생했습니다.",
      error: e,
    });
  }
});

// 메뉴 이름 수정
router.put("/category/:category/menu/:menuId", async (req, res) => {
  const { category, menuId } = req.params;
  const { name } = req.body;

  if (!menuStore.isValid({ res, category, menuId, name })) {
    return;
  }

  try {
    menuStore.updateMenuItem(category, menuId, name);
    const updatedMenu = menuStore.getByMenuId(category, menuId);
    res.status(200).json(updatedMenu);
  } catch (e) {
    res.status(500).json({
      message: "메뉴를 수정하는데 에러가 발생했습니다.",
      error: e,
    });
  }
});

// 메뉴 솔드 아웃
router.put("/category/:category/menu/:menuId/soldout", async (req, res) => {
  const { category, menuId } = req.params;
  const { name } = req.body;

  if (!menuStore.isValid({ res, category, menuId, name })) {
    return;
  }

  try {
    menuStore.toggleSoldOutMenuItem(category, menuId);
    const updatedMenu = menuStore.getByMenuId(category, menuId);
    res.status(200).json(updatedMenu);
  } catch (e) {
    res.status(500).json({
      message: "메뉴를 품절 상태로 변경 하는데 에러가 발생했습니다.",
      error: e,
    });
  }
});

// 메뉴 삭제
router.delete("/category/:category/menu/:menuId", async (req, res) => {
  const { category, menuId } = req.params;
  const { name } = req.body;
  if (!menuStore.isValid({ res, category, menuId, name })) {
    return;
  }
  try {
    menuStore.deleteMenuItem(category, menuId);
    res.sendStatus(200);
  } catch (e) {
    res.status(500).json({
      message: "메뉴를 삭제하는데 에러가 발생했습니다.",
      error: e,
    });
  }
});

module.exports = router;
