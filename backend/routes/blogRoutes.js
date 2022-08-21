const express = require("express");
const router = express.Router();
const { createBlog, editBlog } = require("../controllers/blog");
const { authenticateUser } = require("../controllers/helpers");
router.use("/", authenticateUser);
router.post("/create", createBlog);
router.post("/edit", editBlog);

module.exports = router;
