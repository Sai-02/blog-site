const User = require("../models/user.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const registerUser = async (req, res) => {
  const { name, password, email } = req.body;
  if (!name) return res.status(400).json({ msg: "Name is missing" });
  if (!email) return res.status(400).json({ msg: "Email is missing" });
  if (!password) return res.status(400).json({ msg: "Password is missing" });
  try {
    let mailExists = false;
    await User.findOne({ email: email })
      .then((mail) => {
        if (mail) mailExists = true;
      })
      .catch((e) => {
        console.log(e);
      });
    if (mailExists) {
      return res.status(409).json({ msg: "User email already exists" });
    }
    const user = await User.create({
      name: name,
      password: password,
      email: email,
      salt: "",
    });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    user.salt = salt;
    await user.save();
    const accessToken = jwt.sign(user.toJSON(), process.env.TOKEN_KEY);
    return res.json({ accessToken });
  } catch (e) {
    console.log(e);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};
const loginUser = async (req, res) => {
  let { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ msg: "Email or password is not present !!" });
  try {
    const user = await User.findOne({ email });
    const salt = user.salt;
    const hashPassword = await bcrypt.hash(password, salt);
    if (!user)
      return res.status(401).json({
        msg: "User not found !!",
      });
    if (user.password !== hashPassword)
      return res.status(403).json({ msg: "Password is incorrect" });
    const accessToken = jwt.sign(user.toJSON(), process.env.TOKEN_KEY);
    return res.json({ accessToken });
  } catch (e) {
    console.log(e);
    return res.status(400).json({
      msg: "An error occured",
      error: e,
    });
  }
};

module.exports = {
  loginUser,
  registerUser,
};
