const express = require("express");
const router = express.Router();
const { checkJwt, checkRole } = require("../controllers/auth");
const {
  getBlogs,
  getPBlogs,
  getDBlogs,
  getBlogsById,
  getBlogsBySlug,
  deleteBlog,
  createBlog,
} = require("../controllers/blogs");

router.get("/", getBlogs);

router.get("/published", getPBlogs);

router.get("/draft", getDBlogs);

router.get("/:id", getBlogsById);

router.get("/slug/:slug", getBlogsBySlug);

router.post("/", checkJwt, checkRole('admin'), createBlog);

router.delete("/:id", deleteBlog);

module.exports = router;
