// External imports
const express = require('express');
const router = express.Router();

// Internal imports
const CommentController = require("../controllers/comment_controller");
const { verifyToken } = require("../middleware/auth");

// Protected routes
router.use(verifyToken);
router.post('/add_comment', CommentController.addComment);// Add comment to blog
router.delete('/delete_comment/:commentId', CommentController.deleteComment);// Delete specific comment

module.exports = router;
