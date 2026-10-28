const Blog = require("../models/Blog");

const ID_PATTERN = /^[0-9a-fA-F]{24}$/;
const isValidId = (id) => ID_PATTERN.test(id);

// Fields a client is allowed to set
const FIELDS = ["title", "description", "content", "author", "image"];

const pickFields = (body = {}) => {
  const data = {};
  FIELDS.forEach((field) => {
    if (body[field] !== undefined) data[field] = body[field];
  });
  return data;
};

const escapeRegex = (text) => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// GET /api/blogs            -> all blogs
// GET /api/blogs?search=abc -> blogs whose title contains "abc" (bonus)
const getBlogs = async (req, res) => {
  try {
    const search =
      typeof req.query.search === "string" ? req.query.search.trim() : "";

    const filter = search
      ? { title: { $regex: escapeRegex(search), $options: "i" } }
      : {};

    const blogs = await Blog.find(filter).sort({ createdAt: -1 });
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/blogs/:id
const getBlogById = async (req, res) => {
  if (!isValidId(req.params.id)) {
    return res.status(400).json({ message: "Invalid blog ID" });
  }

  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST /api/blogs
const createBlog = async (req, res) => {
  try {
    const data = pickFields(req.body);
    const { title, description, content, author } = data;

    const isBlank = (value) => typeof value !== "string" || !value.trim();

    if (isBlank(title) || isBlank(description) || isBlank(content) || isBlank(author)) {
      return res.status(400).json({
        message: "Title, description, content, and author are required",
      });
    }

    const blog = await Blog.create(data);

    res.status(201).json({
      message: "Blog created successfully",
      blog,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ message: error.message });
    }

    res.status(500).json({ message: error.message });
  }
};

// PUT /api/blogs/:id
const updateBlog = async (req, res) => {
  if (!isValidId(req.params.id)) {
    return res.status(400).json({ message: "Invalid blog ID" });
  }

  try {
    const data = pickFields(req.body);

    if (Object.keys(data).length === 0) {
      return res.status(400).json({ message: "No valid fields provided to update" });
    }

    const blog = await Blog.findByIdAndUpdate(req.params.id, data, {
      new: true,
      runValidators: true,
    });

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json({
      message: "Blog updated successfully",
      blog,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ message: error.message });
    }

    res.status(500).json({ message: error.message });
  }
};

// DELETE /api/blogs/:id
const deleteBlog = async (req, res) => {
  if (!isValidId(req.params.id)) {
    return res.status(400).json({ message: "Invalid blog ID" });
  }

  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
};
