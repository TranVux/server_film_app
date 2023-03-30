const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Category = new Schema({
  name: { type: String, default: "" },
  film_amount: { type: Number, default: 0, min: 0 },
});

module.exports = mongoose.model("Category", Category);
