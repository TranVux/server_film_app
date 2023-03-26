require("dotenv").config();
var mongoose = require("mongoose");

async function connect() {
  try {
    await mongoose.connect(process.env.DATABASE);
    console.log("Connect to database successfully!");
  } catch (error) {
    console.log("Connect to database failure!!: " + error);
  }
}

module.exports = { connect };
