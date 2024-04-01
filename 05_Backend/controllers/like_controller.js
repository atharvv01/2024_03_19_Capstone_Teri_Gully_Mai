// schemaa imports
const User = require("../schema/user_schema");
const LikedBlog = require("../schema/likes_schema");
const Blog = require("../schema/blog_schema")

//function for user to like a blog
const likeBlog = async (req, res) => {
  try {
    const userData = req.decoded;
    const blogId = req.body.blogId;
    
    // Find the user
    const user = await User.findById(userData.userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    
    // Check if the blog is already liked by the user
    const likedBlog = await LikedBlog.findOne({
      user: userData.userId,
      blog: blogId,
    });
    
    if (likedBlog) {
      return res
        .status(400)
        .json({ success: false, message: "Blog already liked by the user" });
    }

    // Create a new liked blog entry
    const newLikedBlog = new LikedBlog({
      user: userData.userId,
      blog: blogId,
    });
    await newLikedBlog.save();

    // Increment the like count for the blog
    await Blog.findByIdAndUpdate(blogId, { $inc: { likes: 1 } });

    res.status(200).json({
      success: true,
      message: "Blog liked successfully!",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Function for user to unlike a blog
const unlikeBlog = async (req, res) => {
  try {
    const userData = req.decoded;
    const blogId = req.body.blogId;

    // Find the liked blog entry
    const likedBlog = await LikedBlog.findOne({
      user: userData.userId,
      blog: blogId,
    });
    if (!likedBlog) {
      return res
        .status(404)
        .json({
          success: false,
          message: "Blog not found in user's liked section",
        });
    }

    // Delete the liked blog entry
    await LikedBlog.findByIdAndDelete(likedBlog._id);

    // Decrement the like count for the blog
    await Blog.findByIdAndUpdate(blogId, { $inc: { likes: -1 } });

    res.status(200).json({
      success: true,
      message: "Blog unliked successfully!",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
module.exports = {
  likeBlog,
  unlikeBlog,
};
