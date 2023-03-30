const express = require("express");
const router = express.Router();

const categoriesController = require("../../components/categories/CategoriesController");

//get category has films-amount more than 0
router.get("/", async (req, res, next) => {
  try {
    const result = await categoriesController.getCategoriesHasFilm();
    res.status(200).json({ data: result, error: false });
  } catch (error) {
    res.status(400).json({ error: true });
  }
});

//get all category
router.get("/all", async (req, res, next) => {
  try {
    const result = await categoriesController.getAllCategories();
    res.status(200).json({ data: result, error: false });
  } catch (error) {
    res.status(400).json({ error: true });
  }
});

module.exports = router;
