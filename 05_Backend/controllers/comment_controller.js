// Internal imports
const Comments = require("../schema/comments_schema");
const Blog = require("../schema/blog_schema");
const validateComment = require("../validators/comment_validator");

// Add comment to blog
const addComment = async (req, res) => {
  try {
    const { blogId, comment } = req.body;
    const userId = req.decoded.userId; // Assuming userId is available in the decoded token

    // Check if the user has already commented on the blog
    let blogComments = await Comments.findOne({ blog_id: blogId });

    if (!blogComments) {
      // If no comments exist for the blog, create a new comment document
      blogComments = new Comments({ blog_id: blogId, comments: [] });
    }

    // Check if the user has already commented on the blog
    const existingComment = blogComments.comments.find(
      (c) => c.user_id.toString() === userId
    );

    if (existingComment) {
      return res.status(400).json({
        success: false,
        message: "You have already commented on this blog.",
      });
    }

    // Validate the comment
    if (!validateComment(comment)) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid comment format. Only alphabets and numbers are allowed.",
      });
    }

    // Create a new comment
    const newComment = {
      user_id: userId,
      comment: comment,
    };

    // Push the new comment to the comments array
    blogComments.comments.push(newComment);

    // Save the updated comments document
    await blogComments.save();

    res.status(201).json({
      success: true,
      message: "Comment added successfully!",
      comment: newComment,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Delete specific comment
const deleteComment = async (req, res) => {
  try {
    const commentId = req.params.commentId;
    // const commentAuthor = req.body.commentAuthor
    const userId = req.decoded.userId; // Assuming userId is available in the decoded token
    // Find the comment by commentId
    const comment = await Comments.findById(commentId);

    if (!comment) {
      return res.status(404).json({
        success: false,
        message: "Comment not found",
      });
    }

    // Retrieve the blog associated with the comment
    const blogId = comment.blog_id.toString();
    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    // Check if the user is the owner of the blog or the one who commented
    const isOwner = blog.author.toString() === userId;
    const isCommenter = comment.comments.some(
      (c) => c.user_id.toString() === userId.toString()
    );

    if (!isOwner && !isCommenter) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to delete this comment",
      });
    }

    console.log(comment);

    // Filter out the comment to be removed
    comment.comments = comment.comments.filter(
      (c) => c.user_id.toString() !== blog.author.toString()
    );

    console.log(comment);

    // Save the updated comments document
    await comment.save();

    res.status(200).json({
      success: true,
      message: "Comment deleted successfully!",
    });

    res.status(200).json({
      success: true,
      message: "Comment deleted successfully!",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Change approve status of specific comment
const changeApproveComment = async (req, res) => {
  try {
    const commentId = req.params.commentId;
    const userId = req.decoded.userId; // Assuming userId is available in the decoded token
    console.log(commentId,userId);
    // Find the comment by commentId
    const comment = await Comments.findById(commentId);

    if (!comment) {
      return res.status(404).json({
        success: false,
        message: "Comment not found",
      });
    }

    // Retrieve the blog associated with the comment
    const blogId = comment.blog_id.toString();
    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    // Check if the user is the owner of the blog
    if (blog.author.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message:
          "You are not authorized to change the approval status of comments for this blog",
      });
    }

    // Toggle the is_approved field of the comment
    comment.is_approved = !comment.is_approved;

    // Save the updated comment
    await comment.save();

    res.status(200).json({
      success: true,
      message: "Approval status of the comment changed successfully!",
      t,
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
  addComment,
  deleteComment,
  changeApproveComment,
};
