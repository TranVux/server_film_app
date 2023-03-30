const UserModel = require("./AuthModel");
const bcrypt = require("bcryptjs");

const login = async (email, password) => {
  try {
    const user = await UserModel.findOne({ email: email });
    if (user) {
      const compare = bcrypt.compareSync(password, user.password);
      if (compare) {
        return user._doc;
      }
    }
  } catch (error) {
    console.log("LOGIN ERROR>>>>>: " + error);
    return null;
  }
  return null;
};

const register = async (username, email, password) => {
  try {
    const user = await UserModel.findOne({ email: email });
    console.log(user);
    if (!user) {
      const salt = bcrypt.genSaltSync(10);
      const hasPass = bcrypt.hashSync(password, salt);

      const user = await UserModel.create({
        user_name: username,
        email,
        password: hasPass,
      });
      return user._doc;
    }
  } catch (error) {
    console.log("register>>>>>>>Error: " + error);
    return null;
  }

  return null;
};

const changePassword = async (user_id, oldPass, newPassword) => {
  try {
    const user = await UserModel.findOne({ _id: user_id });
    const salt = bcrypt.genSaltSync(10);
    if (user) {
      const compare = bcrypt.compareSync(oldPass, user.password);
      if (compare) {
        const hasPass = bcrypt.hashSync(newPassword, salt);
        user.password = hasPass;
        await user.save();
        return true;
      }
    }
  } catch (error) {
    console.log("changePassword" + error);
  }
  return false;
};

module.exports = { login, register, changePassword };
