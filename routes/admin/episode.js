var express = require("express");
var router = express.Router();
const Authentication = require("../../middlewares/Authentication");

//http://localhost:3000/admin/episode
router.get("/", [Authentication.auth], async function (req, res, next) {
  res.render("episode/list", { title: "List Episode" });
});

//http://localhost:3000/admin/episode/new
router.get("/new", [Authentication.auth], async function (req, res, next) {
  res.render("episode/new", { title: "New Episode" });
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
