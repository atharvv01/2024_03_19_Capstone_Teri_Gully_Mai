const Blog = require('../schema/blog_schema');

const getPendingBlogs = async (req, res) => {
    try {
      const pendingBlogs = await Blog.find({ status: 'pending' });
      res.json(pendingBlogs);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

const approveBlog = async (req, res) => {
    try {
      const blog = await Blog.findById(req.params.id);
      if (blog.status === 'pending') {
        blog.status = 'approved';
        await blog.save();
        res.json({ message: 'Blog approved successfully' });
      } else {
        res.status(400).json({ message: 'Blog is not in pending status' });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  const rejectBlog = async (req, res) => {
    try {
      const blog = await Blog.findById(req.params.id);
      if (blog.status === 'pending') {
        blog.status = 'rejected';
        await blog.save();
        res.json({ message: 'Blog rejected successfully' });
      } else {
        res.status(400).json({ message: 'Blog is not in pending status' });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };



module.exports = {
    getPendingBlogs,
    approveBlog,
    rejectBlog
  };