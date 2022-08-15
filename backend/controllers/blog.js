const Blog = require("../models/blog");

const createBlog = async (req, res) => {
  const user = req.user;
  return res.json({ user });
};

module.exports = {
  createBlog,
};
