var express = require("express");
var router = express.Router();

//http://localhost:3000/admin/episode
router.get("/", async function (req, res, next) {
  res.render("episode/list", { title: "List Episode" });
});

//http://localhost:3000/admin/episode/new
router.get("/new", async function (req, res, next) {
  res.render("episode/new", { title: "New Episode" });
});

//http://localhost:3000/admin/episode/:id/detail
router.get("/:id/detail", async function (req, res, next) {
  res.render("episode/detail", { title: "Detail Episode" });
});

//http://localhost:3000/admin/episode/:id/update
router.get("/:id/update", async function (req, res, next) {
  res.render("episode/update", { title: "Update Episode" });
});

module.exports = router;
