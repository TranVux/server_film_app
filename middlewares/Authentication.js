const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.cookies.access_token;

  const url = req.originalUrl.toLowerCase();
  console.log(url);
  try {
    if (!token) {
      if (url.includes("login")) {
        next();
      } else {
        res.redirect("/login");
      }
    } else {
      jwt.verify(token, "secret", function (err, decoded) {
        if (err) {
          if (url.includes("login")) {
            next();
          } else {
            res.redirect("/login");
          }
        } else {
          if (url.includes("login")) {
            res.redirect("/");
          } else {
            next();
          }
        }
      });
    }
  } catch (error) {
    console.log("Authentication Error: " + error);
  }
};

module.exports = { auth };
