const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const { session } = req;
  const url = req.originalUrl.toLowerCase();
  if (!session) {
    if (url.includes("login")) {
      next();
    } else {
      res.redirect("/login");
    }
  } else {
    const { token } = session;
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
  }
  // next();
};

module.exports = { auth };
