const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: String,
  description: String,
  content: String,
  userID: String,
});

const Blog = mongoose.model("Blog", blogSchema);
module.exports = Blog;
