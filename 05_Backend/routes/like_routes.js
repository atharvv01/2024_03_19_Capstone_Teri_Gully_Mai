// external imports
const express = require('express');
const router = express.Router();

// internal imports
const LikeController = require("../controllers/like_controller")
const { verifyToken } = require("../middleware/auth");

// protected routes
router.use(verifyToken);
router.post('/like_blog', LikeController.likeBlog); // Add like blog route   
router.delete('/unlike_blog', LikeController.unlikeBlog); // Add unlike blog route

module.exports = router;
