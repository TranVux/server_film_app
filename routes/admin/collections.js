const express = require("express");
const router = express.Router();
const Authentication = require("../../middlewares/Authentication");
const collectionsController = require("../../components/collections/CollectionController");
//http:localhost:3000/admin/collections/new
router.post("/new", [Authentication.auth], async (req, res, next) => {
  try {
    const { name } = req.body;
    if (name) {
      const result = collectionsController.addCollection(name);
      if (result) {
        res.status(200).json({ error: false, message: "success" });
      } else {
        res.status(200).json({ error: true, message: "failure" });
      }
    } else {
      res.status(200).json({ error: true });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: true });
  }
});

module.exports = router;
