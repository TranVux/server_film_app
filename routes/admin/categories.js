var express = require("express");
var router = express.Router();

const categoriesController = require("../../components/categories/CategoriesController");

//http://localhost:3000/admin/episode
router.get("/", async function (req, res, next) {
  try {
    const categories = await categoriesController.getAllCategories();
    res.render("categories/list", { title: "List categories", categories });
  } catch (error) {
    next(error);
  }
});

//http://localhost:3000/admin/categories/new
router.post("/new", async function (req, res, next) {
  try {
    const { name } = req.body;
    const result = await categoriesController.addCategory(name);
    res.json({ result });
  } catch (error) {
    res.json({ result });
  }
});

//http://localhost:3000/admin/categories/:id/delete
router.get("/:id/delete", async function (req, res, next) {
  try {
    const { id } = req.params;
    const result = await categoriesController.deleteCategory(id);
    res.json({ result });
  } catch (error) {
    console.log(error);
    res.json({ result });
  }
});

//http://localhost:3000/admin/categories/:id/detail
router.get("/:id/detail", async function (req, res, next) {
  res.render("categories/detail", { title: "Detail categories" });
});

//http://localhost:3000/admin/categories/:id/update
router.post("/:id/update", async function (req, res, next) {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const result = await categoriesController.updateCategory(id, name);
    res.json({ result });
  } catch (error) {
    console.log(error);
    res.json({ result });
  }
});

module.exports = router;
