var express = require("express");
var router = express.Router();

//http://localhost:3000/admin/film
router.get("/", async function (req, res, next) {
  res.render("film/list", { title: "List Film" });
});

//http://localhost:3000/admin/film/new
router.get("/new", async function (req, res, next) {
  res.render("film/new", { title: "New Film" });
});

//http://localhost:3000/admin/film/:id/detail
router.get("/:id/detail", async function (req, res, next) {
  res.render("film/detail", { title: "Detail Film" });
});

//http://localhost:3000/admin/film/:id/update
router.get("/:id/update", async function (req, res, next) {
  res.render("film/update", { title: "Update Film" });
});

module.exports = router;
