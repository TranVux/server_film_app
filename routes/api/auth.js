const express = require("express");
const router = express.Router();
const AuthController = require("../../components/auth/AuthController");

router.get("/login", async function (req, res, next) {
  try {
    const { email, password } = req.body;
    const user = await AuthController.login(email, password);
    if (user) {
      const { password, ...data } = user;
      return res.json({ data, error: false });
    } else {
      return res.json({ error: true });
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
