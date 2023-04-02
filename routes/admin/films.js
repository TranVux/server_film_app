var express = require("express");
var router = express.Router();
const uploadImage = require("../../middlewares/cloundinaryUploadImage");

const Authentication = require("../../middlewares/Authentication");
const filmController = require("../../components/film/FilmController");
const categoryController = require("../../components/categories/CategoriesController");
const collectionController = require("../../components/collections/CollectionController");

// add middle ware after complete this function
//http://localhost:3000/admin/film?limit=10&page=1
router.get("/", [Authentication.auth], async function (req, res, next) {
  try {
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
  } catch (error) {
    next(error);
  }
  // res.json({ title: "List Film", filmList: result });
});

//http://localhost:3000/admin/film/new
router.get("/new", [Authentication.auth], async function (req, res, next) {
  try {
    const result = await categoryController.getAllCategories();
    const collections = await collectionController.getAllCollection();
    res.render("film/new", {
      title: "New Film",
      error: true,
      categories: result,
      collections: collections,
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
    Authentication.auth,
    uploadImage.fields([
      { name: "thumbnail", maxCount: 1 },
      { name: "background_medium", maxCount: 1 },
    ]),
  ],
  async function (req, res, next) {
    try {
      const {
        filmName,
        list_category,
        trailer,
        total_episode,
        synopsis,
        _id_collection,
      } = req.body;
      const { files } = req;
      if (files) {
        console.log(files);
        const result = await filmController.addFilm(
          filmName,
          trailer,
          total_episode,
          JSON.parse(list_category),
          synopsis,
          _id_collection,
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
    try {
      const { id } = req.params;
      const film = await filmController.getFilmById(id);
      const categories = await categoryController.getAllCategories();
      const collections = await collectionController.getAllCollection();
      for (let i = 0; i < collections.length; i++) {
        if (collections[i]._id.toString() === film._id_collection.toString()) {
          collections[i].isSelected = true;
        } else {
          collections[i].isSelected = false;
        }
      }
      if (film) {
        // console.log(film);
        res.render("film/detail", {
          title: "Detail Film",
          film,
          categories: categories,
          collections: collections,
          error: false,
        });
        // res.json(film);
      } else {
        res.render("film/detail", {
          title: "Detail Film",
          film,
          categories: categories,
          collections: collections,
          error: true,
        });
        // res.json(film);
      }
    } catch (error) {
      console.log("DETAIL FILM ROUTE ERROR!: ") + error;
    }
  }
);

//http://localhost:3000/admin/film/:id/update
router.post(
  "/:id/update",
  [
    Authentication.auth,
    uploadImage.fields([
      { name: "thumbnail", maxCount: 1 },
      { name: "background_medium", maxCount: 1 },
    ]),
  ],
  async function (req, res, next) {
    try {
      const {
        filmName,
        list_category,
        previous_list_category,
        trailer,
        total_episode,
        synopsis,
        _id_collection,
        previous_id_collection,
      } = req.body;
      const { id } = req.params;
      const { files } = req;
      // console.log("ID>>>>>>>>>>>>>>>>>>>: " + id);
      // console.log("PreviousID>>>>>>>>>>>>>>>>>>>: " + previous_id_collection);
      // console.log("PreviousID>>>>>>>>>>>>>>>>>>>: " + previous_list_category);
      // console.log("PreviousID>>>>>>>>>>>>>>>>>>>: " + list_category);
      // console.log("FILE>>>>>>>>>>>>>>>>>>>: ");
      // console.log(files);
      const result = await filmController.updateFilmById(
        id,
        filmName,
        trailer,
        total_episode,
        JSON.parse(list_category),
        JSON.parse(previous_list_category),
        synopsis,
        _id_collection,
        previous_id_collection,
        files
      );
      if (result) {
        console.log("LOG: UPDATE FILM SUCCESS!: ");
        res.json({
          result: result,
          urlRedirect: "/admin/film?limit=10&page=1",
          error: false,
        });
      } else {
        console.log("LOG: UPDATE FILM FAILURE!");
        res.json({
          result: result,
          urlRedirect: "/",
          error: true,
        });
      }
    } catch (error) {
      console.log("LOG: UPDATE FILM FAILURE!");
      console.log(error);
      res.json({
        result: null,
        urlRedirect: "/",
        error: true,
      });
    }
  }
);

//http://localhost:3000/admin/film/delete
router.post("/delete", [Authentication.auth], async (req, res, next) => {
  const { _id, _id_collection } = req.body;
  try {
    const detailFilm = await filmController.getFilmById(_id);
    const result = filmController.deleteFilm(
      _id,
      _id_collection,
      detailFilm.list_category
    );
    res.status(200).json({ result, error: false });
  } catch (error) {
    res.status(400).json({ result: null, error: true });
    next(error);
  }
});

module.exports = router;
