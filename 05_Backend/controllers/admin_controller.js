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
            // Set the type field based on your requirements
            blog.type = 'Explore top Tourist attractions'; // Or whichever value is appropriate
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

// Controller function to get blogs with flags greater than 5
const getFlaggedBlogs = async (req, res) => {
  try {
    // Find blogs with flags greater than 5
    const flaggedBlogs = await Blog.find({ flags: { $gt: 5 } }).exec();

    // Check if there are any flagged blogs
    if (flaggedBlogs.length === 0) {
      return res.status(404).json({ message: 'No flagged blogs found' });
    }

    // Return the flagged blogs
    res.status(200).json(flaggedBlogs);
  } catch (error) {
    console.error('Error retrieving flagged blogs:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Controller function to reset flags of a specific blog
const resetBlogFlags = async (req, res) => {
  const { id } = req.params;

  try {
    // Find the blog by ID and update its flags field to 0
    const updatedBlog = await Blog.findByIdAndUpdate(id, { $set: { flags: 0 } }, { new: true });

    // Check if the blog was found and updated
    if (!updatedBlog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    // Return the updated blog
    res.status(200).json(updatedBlog);
  } catch (error) {
    console.error('Error resetting blog flags:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Controller function to delete a specific blog
const deleteBlog = async (req, res) => {
  const { id } = req.params;

  try {
    // Find the blog by ID and delete it
    const deletedBlog = await Blog.findByIdAndDelete(id);

    // Check if the blog was found and deleted
    if (!deletedBlog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    // Return a success message
    res.status(200).json({ message: 'Blog deleted successfully' });
  } catch (error) {
    console.error('Error deleting blog:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


module.exports = {
    getPendingBlogs,
    approveBlog,
    rejectBlog,
    getFlaggedBlogs,
    resetBlogFlags,
    deleteBlog
  };