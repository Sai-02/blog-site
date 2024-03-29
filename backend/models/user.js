// Model for user

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  password: String,
  email: String,
  salt: String,
});

const User = mongoose.model("User", userSchema);
module.exports = User;
