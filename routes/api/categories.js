const express = require("express");
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    res.status(200).json({ data: "DATA HERE", error: false });
  } catch (error) {
    res.status(400).json({ error: true });
  }
});

module.exports = router;
