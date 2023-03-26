const mongoose = require("mongoose");
const UserSchema = mongoose.Schema;
const UserModel = new UserSchema({
  user_name: { type: String, default: "" },
  email: { type: String, default: "" },
  image: { type: Object, default: {} },
  bookmarks: [{ type: UserSchema.Types.ObjectId, ref: "Episode" }],
  collections: [{ type: UserSchema.Types.ObjectId, ref: "Collection" }],
});

module.exports = mongoose.model("User", UserModel);
