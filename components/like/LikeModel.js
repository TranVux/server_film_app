const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const LikeModel = new Schema({
  film_id: { type: Schema.Types.ObjectId },
  liked: [{ type: Schema.Types.ObjectId }],
});

module.exports = mongoose.model("Like", LikeModel);
