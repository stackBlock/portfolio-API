const mongoose = require("mongoose");
const uniqueSlug = require("unique-slug");
const Blog = mongoose.model("Blog");
var slugify = require("slugify");

exports.getBlogs = async (req, res) => {
  const blogs = await Blog.find({status: 'published'}).sort({createdAt: -1});
  return res.json( blogs );
};

exports.getPortfolios = async (req, res) => {
  const portfolios = await Portfolio.find({});
  return res.json(portfolios);
};

exports.getPBlogs = async (req, res) => {
  const blogs = await Blog.find({ status: "published" }).sort({
    createdAt: -1,
  });
  return res.json({ blogs });
};

exports.getDBlogs = async (req, res) => {
  const blogs = await Blog.find({ status: "draft" }).sort({ createdAt: -1 });
  return res.json({ blogs });
};

exports.getBlogsById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    return res.json(blog);
  } catch (error) {
    return res.json({ message: "No file available...getById" });
  }
};

exports.getBlogsByUser = async (req, res) => {
  const userId = req.user.sub;
  const blogs = await Blog.find({ userId });
  return res.json(blogs);
};

exports.getBlogsBySlug = async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug });
    return res.json(blog);
  } catch (error) {
    return res.json({ message: "No file available..." });
  }
};

exports.createBlog = async (req, res) => {
  const blogData = req.body;
  // ToDo: extract from req
  const userId = req.user.sub;
  //const userId = "google-oauth2|117001720419944847142";
  const blog = new Blog(blogData);
  blog.userId = userId;

  try {
    const newBlog = await blog.save();
    return res.json(newBlog);
  } catch (e) {
    return res.status(422).send(e.message);
  }
};

const _saveBlog = async (blog) => {
  try {
    const createdBlog = await blog.save();
    return createdBlog;
  } catch (e) {
    if (e.code === 11000 && e.keyPattern && e.keyPattern.slug) {
      blog.slug += `-${uniqueSlug()}`;
      return _saveBlog(blog);
    }

    throw e;
  }
};

exports.updateBlog = async (req, res) => {
  const {
    body,
    params: { id },
  } = req;

  Blog.findById(id, async (err, blog) => {
    if (err) {
      return res.status(422).send(err.message);
    }

    if (body.status && body.status === "published" && !blog.slug) {
      blog.slug = slugify(blog.title, {
        replacement: "-",
        lower: true,
      });
    }

    blog.set(body);
    blog.updateAt = new Date();

    try {
      const updatedBlog = await _saveBlog(blog);
      return res.json(updatedBlog);
    } catch (err) {
      return res.status(422).send(err.message);
    }
  });
};

exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findOneAndRemove({ _id: req.params.id });
    return res.json({
      message: `Your Blog with id: ${portfolio.id} has been removed`,
    });
  } catch (error) {
    return res.json({ message: "No Blogs found with that id..." });
  }
};
