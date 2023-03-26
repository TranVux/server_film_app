const mongoose = require("mongoose");
const FilmSchema = mongoose.Schema;
const FilmModel = new FilmSchema({
  name: { type: String, default: "" },
  categories: [{ type: FilmSchema.Types.ObjectId, ref: "Category" }],
  trailer: { type: String },
  list_episode: [{ type: FilmSchema.Types.ObjectId, ref: "Episode" }],
  like: { type: Number, default: 0 },
  synopsis: { type: String, default: "" },
  total_episode: { type: Number, default: 0 },
  background_medium: { type: Object, default: {} },
  thumbnail: { type: Object, default: {} },
  score: { type: Number, default: 0.0 },
  _id_collection: { type: FilmSchema.Types.ObjectId, ref: "Collection" },
});

module.exports = mongoose.model("Film", FilmModel);
