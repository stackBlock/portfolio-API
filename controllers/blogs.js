const mongoose = require("mongoose");
const Blog = mongoose.model("Blog");

exports.getBlogs = async (req, res) => {
  const blogs = await Blog.find({})
  return res.json({blogs});
};

exports.getPBlogs = async (req, res) => {
  const blogs = await Blog.find({status: 'published'}).sort({createdAt: -1});
  return res.json({blogs});
};

exports.getDBlogs = async (req, res) => {
  const blogs = await Blog.find({status: 'draft'}).sort({createdAt: -1});
  return res.json({blogs});
};

exports.getBlogsById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    return res.json(blog);
  } catch (error) {
    return res.json({ message: "No file available..." });
  }
};


exports.getBlogsBySlug = async (req, res) => {
  try {
    const blog = await Blog.findOne({slug: req.params.slug});
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
    return res.status(422).send(error.message);
  }
};


// exports.updatePortfolio = async (req, res)  => {
//   const {body, params: {id}} = req;

//   try {
//     const updatedPortfolio = await Portfolio.findOneAndUpdate({_id: id}, body, {new: true, runValidators: true} );
//     return res.json(updatedPortfolio);
//   } catch (error) {
//     return res.status(422).send(error.message);
//   }

// }

exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findOneAndRemove({_id: req.params.id});
    return res.json({message: `Your Blog with id: ${portfolio.id} has been removed`})
  } catch (error) {
    return res.json({ message: "No Blogs found with that id..." });
  }
}