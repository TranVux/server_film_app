const mongoose = require("mongoose");
const CollectionSchema = mongoose.Schema;
const CollectionModel = new CollectionSchema({
  name: { type: String, default: "" },
  films: [{ type: CollectionSchema.Types.ObjectId, ref: "Film" }],
});

module.exports = mongoose.model("Collection", CollectionModel);
