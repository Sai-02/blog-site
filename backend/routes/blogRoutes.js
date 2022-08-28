const express = require("express");
const router = express.Router();
const {
  createBlog,
  editBlog,
  getMyBlogs,
  getBlog,
} = require("../controllers/blog");
const { authenticateUser } = require("../controllers/helpers");
router.use("/", authenticateUser);
router.post("/create", createBlog);
router.post("/edit", editBlog);
router.get("/myblogs", getMyBlogs);
router.get("/blog", getBlog);

module.exports = router;
