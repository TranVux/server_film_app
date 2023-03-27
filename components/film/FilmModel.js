const mongoose = require("mongoose");
const FilmSchema = mongoose.Schema;
const FilmModel = new FilmSchema({
  name: { type: String, default: "" },
  trailer: { type: String },
  like: { type: Number, default: 0 },
  total_episode: { type: Number, default: 0 },
  score: { type: Number, default: 0.0 },
  list_category: [
    { type: FilmSchema.Types.ObjectId, ref: "Category", default: [] },
  ],
  list_episode: [
    { type: FilmSchema.Types.ObjectId, ref: "Episode", default: [] },
  ],
  synopsis: { type: String, default: "" },
  background_medium: { type: Object, default: {} },
  thumbnail: { type: Object, default: {} },
  _id_collection: {
    type: FilmSchema.Types.ObjectId,
    ref: "Collection",
    default: "",
  },
});

module.exports = mongoose.model("Film", FilmModel);
