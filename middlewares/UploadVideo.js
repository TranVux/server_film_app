const multer = require("multer");

const storageVideo = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/videos/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + "-" + file.originalname);
  },
});

module.exports = multer({ storage: storageVideo });
