var express = require("express");
var router = express.Router();
const AuthController = require("../components/auth/AuthController");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Dashboard" });
});

//get login page
router.get("/login", function (req, res, next) {
  res.render("auth/login", { title: "Login" });
});

//handle login
router.post("/login", async function (req, res, next) {
  try {
    const { email, password } = req.body;
    // console.log(email + " " + password);
    const user = await AuthController.login(email, password);
    if (user) {
      res.redirect("/");
    } else {
      res.redirect("/login");
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
