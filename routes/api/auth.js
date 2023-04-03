const express = require("express");
const router = express.Router();
const AuthController = require("../../components/auth/AuthController");

router.post("/login", async function (req, res, next) {
  try {
    const { email, password } = req.body;
    const user = await AuthController.login(email, password);
    if (user) {
      const { password, ...data } = user;
      return res.status(200).json({ data, error: false });
    }
    return res.status(200).json({ error: true });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: true });
  }
});

router.post("/register", [], async function (req, res, next) {
  try {
    const { username, password, email } = req.body;
    console.log(username + " " + password + " " + email);
    const result = await AuthController.register(username, email, password);
    console.log(result);

    if (result) {
      const { password, ...data } = result;
      return res.status(200).json({ data, error: false });
    }
    return res.status(200).json({ error: true });
  } catch (error) {
    return res.status(400).json({ error: true });
  }
});

router.post("/change_password", [], async function (req, res, next) {
  try {
    const { user_id, oldPassword, newPassword } = req.body;
    console.log(user_id + " " + oldPassword + " " + newPassword);
    const result = await AuthController.changePassword(
      user_id,
      oldPassword,
      newPassword
    );
    if (result) {
      return res.status(200).json({ result, error: false });
    } else {
      return res.status(200).json({ result, error: false });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: true });
  }
});

router.get("/collections/:user_id", [], async (req, res, next) => {
  try {
    const { user_id } = req.params;
    // console.log(user_id);
    const collection = await AuthController.getCollection(user_id);
    res.status(200).json({ data: collection, error: false });
  } catch (error) {
    res.status(400).json({ error: true });
  }
});

router.post("/collections/add", [], async (req, res, next) => {
  try {
    const { user_id, film_id } = req.body;
    const result = await AuthController.addFilmCollection(user_id, film_id);
    res.status(200).json({ success: result, error: false });
  } catch (error) {
    res.status(400).json({ error: true });
  }
});

module.exports = router;
