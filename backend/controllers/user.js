const User = require("../models/user.js");
const bcrypt = require("bcrypt");
const registerUser = async (req, res) => {
  const { name, password, email } = req.body;
  if (!name) return res.status(400).json({ msg: "Name is missing" });
  if (!email) return res.status(400).json({ msg: "Email is missing" });
  if (!password) return res.status(400).json({ msg: "Password is missing" });

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
  });
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();
  console.log(user);
  return res.json(user);
};
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ msg: "Email or password is not present !!" });
  try {
    const user = await User.findOne({ email, password });
    if (!user)
      return res.status(401).json({
        msg: "User not found !!",
      });
    return res.status(200).json({
      user,
      msg: "Login Successful !!",
    });
  } catch (e) {
    return res.status(400).json({
      msg: "An error occured",
      error:e
    });
  }
};

module.exports = {
  loginUser,
  registerUser,
};
