const mongoose = require("mongoose");
const FilmSchema = mongoose.Schema;

const FilmModel = new FilmSchema({
  name: { type: String, default: "" },
  trailer: { type: String },
  like: { type: FilmSchema.Types.ObjectId, ref: "Like" },
  total_episode: { type: Number, default: 0 },
  score: { type: Number, default: 0.0 },
  list_category: [
    {
      _id: FilmSchema.Types.ObjectId,
      name: String,
    },
  ],
  views: { type: Number, default: 0 },
  list_episode: [{ type: Object, default: undefined }],
  synopsis: { type: String, default: "" },
  background_medium: { type: Object, default: {} },
  thumbnail: { type: Object, default: {} },
  _id_collection: {
    type: FilmSchema.Types.ObjectId,
    ref: "Collection",
    default: "",
  },
  createdDate: { type: Date, default: new Date().getTime() },
});

module.exports = mongoose.model("Film", FilmModel);
