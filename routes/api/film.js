const express = require("express");
const router = express.Router();

const filmController = require("../../components/film/FilmController");
const likeController = require("../../components/like/LikeController");
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
router.post("/categories", async (req, res, next) => {
  try {
    const { list_categories } = req.body;
    console.log(list_categories);
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

router.get("/trending", async (req, res, next) => {
  try {
    const result = await filmController.getTrendingFilm();
    res.status(200).json({ data: result, error: false });
  } catch (error) {
    res.status(400).json({ error: true });
  }
});

router.get("/newest", async (req, res, next) => {
  try {
  } catch (error) {}
});

router.post("/in-array", async (req, res, next) => {
  try {
    const { list_film } = req.body;
    // console.log(list_film);
    const result = await filmController.getFilmInArray(list_film);
    res.status(200).json({ data: result, error: false });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: true });
  }
});

//increase amount like for film
router.post("/like/:filmId/:userId", async (req, res, next) => {
  const { filmId, userId } = req.params;
  console.log(filmId + " " + userId);
  try {
    const result = await likeController.toggleLike(userId, filmId);
    res.status(200).json({ data: result, error: false });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: true });
  }
});
module.exports = router;
