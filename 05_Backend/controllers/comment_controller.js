// Internal imports
const Comment = require("../schema/comments_schema");
const Blog = require("../schema/blog_schema");
const validateComment = require("../validators/comment_validator")

// Add comment to blog
const addComment = async (req, res) => {
    try {
        const { blogId, comment } = req.body;
        const userId = req.decoded.userId; // Assuming userId is available in the decoded token

        // Check if the user has already commented on the blog
        // const existingComment = await Comment.findOne({ blog_id: blogId, "comments.user_id": userId });

        // Validate the comment
        if (!validateComment(comment)) {
            return res.status(400).json({
                success: false,
                message: "Invalid comment format. Only alphabets and numbers are allowed.",
            });
        }

        // Create a new comment
        const newComment = {
            user_id: userId,
            comment: comment
        };

        // Find the comment schema and push the new comment
        const blogComments = await Comment.findOneAndUpdate(
            { blog_id: blogId },
            { $push: { comments: newComment } },
            { new: true }
        );

        res.status(201).json({
            success: true,
            message: "Comment added successfully!",
            comment: newComment
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
        const userId = req.decoded.userId; // Assuming userId is available in the decoded token

        // Find the comment by commentId
        const comment = await Comment.findById(commentId)

        if (!comment) {
            return res.status(404).json({
                success: false,
                message: "Comment not found",
            });
        }

        // Retrieve the blog associated with the comment
        const blog = await Blog.findById(comment.blog_id);

        if (!blog) {
            return res.status(404).json({
                success: false,
                message: "Blog not found",
            });
        }

        // Check if the user is the owner of the blog or the one who commented
        const isOwnerOrCommenter = comment.comments.some(c => c._id.toString() === commentId && (c.user_id.toString() === userId || blog.user_id.toString() === userId));

        if (!isOwnerOrCommenter) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to delete this comment",
            });
        }

        // Remove the specific comment
        await Comment.findOneAndUpdate(
            { "comments._id": commentId },
            { $pull: { comments: { _id: commentId } } }
        );

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

module.exports = {
    addComment,
    deleteComment
};
