const express = require("express");
const router = express.Router();
const AuthController = require("../../components/auth/AuthController");
const uploadImage = require("../../middlewares/cloundinaryUploadImage");
const mailTemplate = require("../../public/assets/mailTemplate");

router.post("/login", async function (req, res, next) {
  try {
    const { email, password, ...extraData } = req.body;
    const { type } = req.query;
    const user = await AuthController.login(email, password, extraData, type);
    if (user) {
      const { password, role, ...data } = user;
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

    if (!result.message) {
      const { password, role, ...data } = result;
      //send mail to user
      AuthController.sendMail(
        email,
        "Thư báo lập tài khoản thành công!",
        mailTemplate
      );
      return res.status(200).json({ data, error: false });
    }
    return res.status(200).json({ ...result, error: true });
  } catch (error) {
    return res.status(400).json({ data: {}, error: true });
  }
});

//change password of user by id
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

//get user collection by id
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

// add a film to pool collection of user
router.post("/collections/add", [], async (req, res, next) => {
  try {
    const { user_id, film_id } = req.body;
    const result = await AuthController.addFilmCollection(user_id, film_id);
    res.status(200).json({ success: result, error: false });
  } catch (error) {
    res.status(400).json({ error: true });
  }
});

//toggle a collection into pool collection of user
router.post("/collections/add/toggle", [], async (req, res, next) => {
  try {
    const { user_id, film_id } = req.body;
    const result = await AuthController.addToggleFilmCollection(
      user_id,
      film_id
    );
    const { collections } = result;
    res.status(200).json({
      data: {
        collections: collections,
      },
      error: false,
    });
  } catch (error) {
    res.status(400).json({ error: true });
  }
});

// upload image avatar for user
router.post(
  "/update_image",
  [uploadImage.single("image")],
  async (req, res, next) => {
    try {
      const file = req.file;
      const { user_id } = req.body;

      console.log(file);
      console.log(user_id);
      if (file) {
        console.log(file);
        const result = await AuthController.updateImage(user_id, file);
        const { password, role, ...data } = result._doc;
        res.status(200).json({ data: { ...data }, error: false });
      } else {
        res
          .status(200)
          .json({ data: null, error: true, message: "file not exist!" });
      }
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: true });
    }
  }
);

// send email for user after sign up successfully
router.post("/send_mail", async (req, res, next) => {
  try {
    const { email, subject } = req.body;
    console.log(email + " " + subject);
    const result = await AuthController.sendMail(email, subject, mailTemplate);
    res.status(200).json({ result, error: false });
  } catch (error) {
    console.log("Send mail: " + error);
    res.status(400).json({ error: true });
  }
});

module.exports = router;
