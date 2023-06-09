const { default: mongoose } = require("mongoose");
const AuthModel = require("./AuthModel");
const UserModel = require("./AuthModel");
const bcrypt = require("bcryptjs");

const login = async (email, password, extraData, type) => {
  switch (type) {
    case "social":
      try {
        //handle login
        const user = await UserModel.findOne({ email });
        if (!user) {
          // register for user
          console.log(extraData);
          const result = await UserModel.create({
            ...extraData,
            email,
            password: "",
            social_id: extraData._id,
            _id: new mongoose.Types.ObjectId(),
          });

          console.log("Create user success fully");
          return result._doc;
          // const result = await UserModel.create({});
        } else {
          console.log(extraData._id);

          user.social_id = extraData._id;
          await user.save();

          return user._doc;
        }
      } catch (error) {
        console.log("LOGIN ERROR>>>>>: " + error);
        return null;
      }
      break;
    default:
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
      break;
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
    } else {
      return { message: `Existed an user with email: ${user.email}` };
    }
  } catch (error) {
    console.log("register>>>>>>>Error: " + error);
    return null;
  }
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
    const result = await AuthModel.findById(user_id).select("collections");
    return result;
  } catch (error) {
    console.log("getCollection: " + error);
  }
  return [];
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

const addToggleFilmCollection = async (user_id, film_id) => {
  try {
    const user = await UserModel.findById(user_id);
    if (user) {
      if (user.collections.includes(film_id)) {
        return await UserModel.findOneAndUpdate(
          { _id: user_id },
          {
            $pull: { collections: film_id },
          },
          { returnDocument: "after" }
        );
      } else {
        return await UserModel.findOneAndUpdate(
          { _id: user_id },
          {
            $push: { collections: film_id },
          },
          { returnDocument: "after" }
        );
      }
    }
    return {};
  } catch (error) {
    console.log("addToggleFilmCollection: " + error);
    return {};
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
  getCollection,
  countUser,
  login,
  addToggleFilmCollection,
  addFilmCollection,
  register,
  changePassword,
  updateImage,
};
