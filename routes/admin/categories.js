var express = require("express");
var router = express.Router();

const categoriesController = require("../../components/categories/CategoriesController");
const Authentication = require("../../middlewares/Authentication");

//http://localhost:3000/admin/episode
router.get("/", [Authentication.auth], async function (req, res, next) {
  try {
    const categories = await categoriesController.getAllCategories();
    res.render("categories/list", { title: "List categories", categories });
  } catch (error) {
    next(error);
  }
});

//http://localhost:3000/admin/categories/new
router.post("/new", [Authentication.auth], async function (req, res, next) {
  try {
    const { name } = req.body;
    const result = await categoriesController.addCategory(name);
    res.status(200).json({ result });
  } catch (error) {
    res.status(400).json({ result });
  }
});

//http://localhost:3000/admin/categories/:id/delete
router.get(
  "/:id/delete",
  [Authentication.auth],
  async function (req, res, next) {
    try {
      const { id } = req.params;
      const result = await categoriesController.deleteCategory(id);
      res.status(200).json({ result });
    } catch (error) {
      console.log(error);
      res.status(400).json({ result });
    }
  }
);

//http://localhost:3000/admin/categories/:id/update
router.post(
  "/:id/update",
  [Authentication.auth],
  async function (req, res, next) {
    try {
      const { id } = req.params;
      const { name } = req.body;
      const result = await categoriesController.updateCategory(id, name);
      res.status(200).json({ result });
    } catch (error) {
      console.log(error);
      res.status(400).json({ result });
    }
  }
);

module.exports = router;
