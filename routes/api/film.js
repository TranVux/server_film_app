const express = require("express");
const router = express.Router();

const categoriesController = require("../../components/categories/CategoriesController");
const filmController = require("../../components/film/FilmController");
//get category has films-amount more than 0
router.get("/", async (req, res, next) => {
  try {
    const { _limit } = req.params;
    const result = await filmController.getRandomFilm(_limit);
    return res.status(200).json({ data: result, error: false });
  } catch (error) {
    return res.status(400).json({ error: true });
  }
});

//get all category
router.get("/all", async (req, res, next) => {
  try {
    return res.status(200).json({ data: result, error: false });
  } catch (error) {
    return res.status(400).json({ error: true });
  }
});

//http://localhost:3000/api/film/category
//get film by categories
router.get("/categories", async (req, res, next) => {
  try {
    const { list_categories } = req.body;
    const result = await filmController.getFilmByCategories(list_categories);
    return res.status(200).json({ data: result, error: false });
  } catch (error) {
    return res.status(400).json({ error: true });
  }
});

//http://localhost:3000/api/film/search
router.get("/search", async (req, res, next) => {
  try {
    const { key } = req.query;
    const result = await filmController.search(key);
    return res.status(200).json({ data: result, error: false });
  } catch (error) {
    return res.status(400).json({ error: true });
  }
});

//http://localhost:3000/api/film/:id/detail
router.get("/:_id/detail", async (req, res, next) => {
  try {
    const { _id } = req.params;
    const result = await filmController.getFilmById(_id);
    return res.status(200).json({ data: result, error: false });
  } catch (error) {
    return res.status(400).json({ error: true });
  }
});

module.exports = router;
