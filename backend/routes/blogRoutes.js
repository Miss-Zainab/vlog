const express = require("express");
const router = express.Router();

const {
  getBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
} = require("../controllers/blogController");

// GET all blogs
router.get("/", getBlogs);

// GET one blog
router.get("/:id", getBlogById);

// CREATE a blog
router.post("/", createBlog);

// UPDATE a blog
router.put("/:id", updateBlog);

// DELETE a blog
router.delete("/:id", deleteBlog);

module.exports = router;
