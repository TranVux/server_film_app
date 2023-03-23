var express = require("express");
var router = express.Router();
const uploadImage = require("../../middlewares/cloundinaryUploadImage");

const Authentication = require("../../middlewares/Authentication");
const filmController = require("../../components/film/FilmController");
const categoryController = require("../../components/categories/CategoriesController");

// add middle ware after complete this function
//http://localhost:3000/admin/film?limit=10&page=1
router.get("/", [Authentication.auth], async function (req, res, next) {
  const { limit, page } = req.query;
  const result = await filmController.getFilm(limit, page);
  if (result.totalPage) {
    let totalPage = [];
    for (let i = 1; i <= result.totalPage; i++) {
      totalPage.push({
        index: i,
        isCurrent: Number(i) === Number(page),
      });
    }

    result.totalPage = totalPage;
  }
  res.render("film/list", { title: "List Film", filmList: result });
  // res.json({ title: "List Film", filmList: result });
});

//http://localhost:3000/admin/film/new
router.get("/new", [Authentication.auth], async function (req, res, next) {
  try {
    const result = await categoryController.getAllCategories();
    res.render("film/new", {
      title: "New Film",
      error: true,
      categories: result,
    });
  } catch (error) {
    console.log(error);
  }
});

//http://localhost:3000/admin/film/new
// add data film
router.post(
  "/new",
  [
    uploadImage.fields([
      { name: "thumbnail", maxCount: 1 },
      { name: "backgroundMedium", maxCount: 1 },
    ]),
  ],
  async function (req, res, next) {
    try {
      const { filmName, categories, trailer, totalEpisode, description } =
        req.body;
      const { files } = req;
      if (files) {
        const result = await filmController.addFilm(
          filmName,
          trailer,
          totalEpisode,
          JSON.parse(categories),
          description,
          files
        );
        if (result) {
          console.log("LOG: ADD FILM SUCCESS!: ");
          // res.redirect("/admin/film?limit=10&page=1");
          res.json({
            result: result,
            urlRedirect: "/admin/film?limit=10&page=1",
            error: false,
          });
        } else {
          console.log("LOG: ADD FILM FAILURE!");
          res.json({
            result: result,
            urlRedirect: "/",
            error: true,
          });
        }
      }
    } catch (error) {
      console.log("LOG: ADD FILM FAILURE!");
      console.log(error);
      res.json({
        result: result,
        urlRedirect: "/",
        error: true,
      });
    }
  }
);

//http://localhost:3000/admin/film/:id/detail
router.get(
  "/:id/detail",
  [Authentication.auth],
  async function (req, res, next) {
    res.render("film/detail", { title: "Detail Film" });
  }
);

//http://localhost:3000/admin/film/:id/update
router.get(
  "/:id/update",
  [Authentication.auth],
  async function (req, res, next) {
    res.render("film/update", { title: "Update Film" });
  }
);

module.exports = router;
