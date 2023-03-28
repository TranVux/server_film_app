var express = require("express");
var router = express.Router();
const Authentication = require("../../middlewares/Authentication");
const filmController = require("../../components/film/FilmController");
const UploadImage = require("../../middlewares/UploadImage");

//http://localhost:3000/admin/episode
router.get("/", [Authentication.auth], async function (req, res, next) {
  res.render("episode/list", { title: "List Episode" });
});

//http://localhost:3000/admin/episode/new
router.get("/new", [Authentication.auth], async function (req, res, next) {
  try {
    const films = await filmController.getFilm();
    res.render("episode/new", { title: "New Episode", films: films.data });
  } catch (error) {
    next(error);
  }
});

//http://localhost:3000/admin/episode/new
router.post("/new", [Authentication.auth], async function (req, res, next) {
  try {
    const { episodeName, video_id, id_film, index } = req.body;
    const result = await filmController.addEpisode(
      id_film,
      episodeName,
      index,
      video_id
    );
    if (result) {
      return res
        .status(200)
        .json({ result, urlRedirect: "/admin/episode/", error: false });
    }
    return res.status(200).json({ result, error: true });
  } catch (error) {
    next(error);
    return res.status(400).json({ result, error: true });
  }
});

//http://localhost:3000/admin/episode/:id/detail
router.get(
  "/:id/detail",
  [Authentication.auth],
  async function (req, res, next) {
    res.render("episode/detail", { title: "Detail Episode" });
  }
);

//http://localhost:3000/admin/episode/:id/update
router.get(
  "/:id/update",
  [Authentication.auth],
  async function (req, res, next) {
    res.render("episode/update", { title: "Update Episode" });
  }
);

module.exports = router;
