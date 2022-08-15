const express = require("express");
const router = express.Router();
const { createBlog } = require("../controllers/blog");
const { authenticateUser } = require("../controllers/helpers");
router.use("/", authenticateUser);
router.post("/create", createBlog);

module.exports = router;
