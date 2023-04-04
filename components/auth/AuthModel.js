const mongoose = require("mongoose");

const UserSchema = mongoose.Schema;

const UserModel = new UserSchema({
  user_name: { type: String, default: "", unique: true, require: true },
  password: { type: String, require: true },
  email: { type: String, default: "" },
  image: { type: Object, default: {} },
  bookmarks: [{ type: Object, default: {} }],
  collections: [{ type: UserSchema.Types.ObjectId, ref: "Collection" }],
  role: { type: Number, default: 0 },
  //user: 1, admin: 10
});

module.exports = mongoose.model("User", UserModel);
