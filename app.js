var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

//database config
const db = require("./configs/db");
db.connect();
//end database config

var indexRouter = require("./routes/index");
const apiAuthRouter = require("./routes/api/auth");
const adminEpisodeRouter = require("./routes/admin/episode");
const adminFilmRouter = require("./routes/admin/films");
const categoriesRouter = require("./routes/admin/categories");
const collectionsRouter = require("./routes/admin/collections");
const apiCategoriesRouter = require("./routes/api/categories");
const apiFilmRouter = require("./routes/api/film");

var app = express();

//setup cookie parser
app.use(cookieParser());

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// setup router
app.use("/", indexRouter);
app.use("/admin/episode", adminEpisodeRouter);
app.use("/admin/film", adminFilmRouter);
app.use("/admin/categories", categoriesRouter);
app.use("/admin/collections", collectionsRouter);

app.use("/api/auth", apiAuthRouter);
app.use("/api/categories", apiCategoriesRouter);
app.use("/api/film", apiFilmRouter);
//

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error", { title: "Error" });
});

module.exports = app;
