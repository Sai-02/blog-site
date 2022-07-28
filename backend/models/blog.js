const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: String,
  description: String,
  content: String,
  userID: String,
});

module.export = mongoose.model("Blog", blogSchema);
