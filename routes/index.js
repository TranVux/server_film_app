var express = require("express");
var router = express.Router();
var jwt = require("jsonwebtoken");

const AuthController = require("../components/auth/AuthController");
const Authentication = require("../middlewares/Authentication");

/* GET home page. */
router.get("/", [Authentication.auth], function (req, res, next) {
  res.render("index", { title: "Dashboard" });
});

//get login page
router.get("/login", [Authentication.auth], function (req, res, next) {
  res.render("auth/login", { title: "Login" });
});

//handle login
router.post("/login", [Authentication.auth], async function (req, res, next) {
  try {
    const { email, password } = req.body;
    // console.log(email + " " + password);
    const user = await AuthController.login(email, password);
    if (user) {
      const token = jwt.sign({ id: user.id }, "secret");
      res
        .cookie("access_token", token, {
          httpOnly: true,
          secure: "production",
        })
        .redirect("/");
    } else {
      res.redirect("/login");
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/logout", [Authentication.auth], async function (req, res, next) {
  try {
    res.clearCookie("access_token").redirect("/login");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
