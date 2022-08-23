const Blog = require("../models/blog");

const createBlog = async (req, res) => {
  const user = req.user;
  const { description, content, title } = req.body;
  if (!description)
    return res.status(400).json({ msg: "Description is missing" });
  if (!content) return res.status(400).json({ msg: "Content is missing!" });
  if (!title) return res.status(400).json({ msg: "Title is missing!!" });
  try {
    const userID = user._id;
    const blog = await Blog.create({
      userID,
      description,
      content,
      title,
    });
    await blog.save();
    return res.json({ blog });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      msg: "Something went wrong",
      error: e,
    });
  }
};

const editBlog = async (req, res) => {
  const user = req.user;
};

const getMyBlogs = async (req, res) => {
  const user = req.user;
  try {
    const blogList = await Blog.find({
      userID: user._id,
    });
    res.json({
      blogs: blogList,
    });
  } catch (e) {
    res.status(500).json({
      msg: "Something went wrong",
    });
  }
};

module.exports = {
  createBlog,
  editBlog,
  getMyBlogs,
};
