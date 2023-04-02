var express = require("express");
var router = express.Router();
const Authentication = require("../../middlewares/Authentication");
const filmController = require("../../components/film/FilmController");

//http://localhost:3000/admin/episode
router.get("/", [Authentication.auth], async function (req, res, next) {
  try {
    const films = await filmController.getFilm();
    res.render("episode/list", { title: "List Episode", films: films.data });
  } catch (error) {
    next(error);
  }
});

router.post("/:id_film/list", [Authentication.auth], async (req, res, next) => {
  try {
    const { id_film } = req.params;
    const result = await filmController.getEpisodeByFilmId(id_film);
    return res.status(200).json({ data: result, error: false });
  } catch (error) {
    next(error);
    return res.status(400).json({ error: true });
  }
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
    console.log(episodeName + "  " + video_id + "  " + id_film + "  " + index);
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

//http://localhost:3000/admin/episode/:id_film/:id_episode/update
router.get(
  "/:id_film/:id_episode/update",
  [Authentication.auth],
  async function (req, res, next) {
    try {
      const { id_film, id_episode } = req.params;
      const filmResult = await filmController.getDetailEpisode(
        id_film,
        id_episode
      );
      const allFilm = await filmController.getFilm();
      const { list_episode, _id } = filmResult;
      let tempEpisode;
      // get episode by id
      list_episode.forEach((element, index) => {
        if (element._id.toString() === id_episode.toString()) {
          tempEpisode = element;
          list_episode[index].selected = true;
          return;
        }
      });

      res.render("episode/update", {
        title: "Update Episode",
        episode: tempEpisode,
        list_episode,
        film_id: _id,
        films: allFilm.data,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/:id_film/:id_episode/update",
  [Authentication.auth],
  async function (req, res, next) {
    try {
      const { id_film, id_episode } = req.params;
      const { name, video_id, index } = req.body;
      const result = await filmController.updateEpisode(
        id_film,
        id_episode,
        name,
        video_id,
        index
      );
      if (result) {
        return res.status(200).json({ success: true, error: false });
      }
      return res.status(200).json({ success: false, error: false });
    } catch (error) {
      return res.status(400).json({ error: true });
    }
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

//http://localhost:3000/admin/episode/:id_film/:id_episode/delete
router.post(
  "/:id_film/:id_episode/delete",
  [Authentication.auth],
  async (req, res, next) => {
    try {
      const { id_film, id_episode } = req.params;
      const result = await filmController.deleteEpisode(id_film, id_episode);
      res.status(200).json({ result: result, error: false });
    } catch (error) {
      res.status(400).json({ error: true });
    }
  }
);
module.exports = router;
