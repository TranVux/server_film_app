const AuthModel = require("./AuthModel");
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

const getCollection = async (user_id) => {
  try {
    const result = await AuthModel.findById(user_id)
      .select("collections")
      .populate("collections");
    // if (!result) {
    //   return [];
    // }
    return result;
  } catch (error) {
    console.log("getCollection: " + error);
  }
};

const addFilmCollection = async (user_id, film_id) => {
  try {
    const whereQuery = `!this.collections.some(_id => _id === ${film_id})`;
    const result = await AuthModel.updateOne(
      {
        _id: user_id,
      },
      {
        $addToSet: { collections: film_id },
      }
    );
    if (result.matchedCount > 0) {
      if (result.modifiedCount > 0) return true;
      else return false;
    }
  } catch (error) {
    console.log("addItemCollection: " + error);
  }
};

const countUser = async () => {
  try {
    return await UserModel.find().countDocuments().exec();
  } catch (error) {
    console.log("countUser: " + error);
  }
};

const updateImage = async (user_id, image) => {
  try {
    const result = await AuthModel.findOneAndUpdate(
      { _id: user_id },
      {
        $set: {
          image: {
            name: image.filename,
            path: image.path,
          },
        },
      },
      { returnDocument: "after" }
    );
    return result;
  } catch (error) {
    console.log("updateImage: " + error);
  }
};

module.exports = {
  login,
  register,
  changePassword,
  getCollection,
  addFilmCollection,
  countUser,
  updateImage,
};
