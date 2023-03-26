const mongoose = require("mongoose");
const EpisodeSchema = mongoose.Schema;
const EpisodeModel = new EpisodeSchema({
  name: { type: String, default: "" },
  id_video: { type: String, default: "" },
  thumbnail: { type: String, default: "" },
  _id_film: { type: EpisodeSchema.Types.ObjectId, ref: "Film" },
});

module.exports = mongoose.model("Episode", EpisodeModel);
