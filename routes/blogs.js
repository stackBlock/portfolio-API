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
  updateBlog,
  getBlogsByUser,
} = require("../controllers/blogs");

router.get("/", getBlogs);

router.get("/published", getPBlogs);

router.get("/draft", getDBlogs);

router.get("/me", checkJwt, checkRole("admin"), getBlogsByUser);

router.get("/:id", getBlogsById);

router.get("/slug/:slug", getBlogsBySlug);

router.post("/", checkJwt, checkRole("admin"), createBlog);

router.patch("/:id", checkJwt, checkRole("admin"), updateBlog);

router.delete("/:id", checkJwt, checkRole("admin"), deleteBlog);

module.exports = router;
