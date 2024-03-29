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
  const { id, description, content, title } = req.body;
  try {
    await Blog.updateOne(
      { _id: id },
      {
        description,
        content,
        title,
      },
      {
        runValidators: true,
      }
    );
    return res.json({ msg: "Updateded Successfully" });
  } catch (e) {
    return res.status(500).json({ msg: "Something went wrong" });
  }
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

const getBlog = async (req, res) => {
  const { id } = req.query;
  if (!id) return res.status(400).json({ msg: "id is missing" });
  try {
    const blog = await Blog.findOne({
      _id: id,
    });
    if (!blog) return res.status(404).json({ msg: "No Blog found " });
    return res.json(blog);
  } catch (e) {
    return res.status(500).json({ msg: "Something went wrong" });
  }
};

const deleteBlog = async (req, res) => {
  const { id } = req.query;
  if (!id) return res.status(400).json({ msg: "id is missing" });
  try {
    const blog = await Blog.findOne({
      _id: id,
    });
  } catch (e) {
    console.log(e);
    return res.status(404).json({ msg: "No blog found" });
  }
  try {
    await Blog.deleteOne({ _id: id });
    return res.json({
      msg: "Deleted Successfully",
    });
  } catch (e) {
    return res.status(500).json({ msg: "Something went wrong" });
  }
};

const searchBlogs = async (req, res) => {
  let { title } = req.query;
  if (!title) title = "";
  try {
    const blogList = await Blog.find({
      title: {
        $regex: title,
        $options: "i",
      },
    });
    res.json({
      blogs: blogList.slice(0, 10),
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
  getBlog,
  deleteBlog,
  searchBlogs,
};
