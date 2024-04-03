// external imports
const express = require('express');
const router = express.Router();

// internal imports
const AdminController = require("../controllers/admin_controller")
const { verifyToken} = require("../middleware/auth")

//protected routes
router.use(verifyToken)

router.get('/pendingblogs', AdminController.getPendingBlogs);
// Route to approve a blog
router.put('/approve/:id', AdminController.approveBlog);
// Route to reject a blog
router.put('/reject/:id', AdminController.rejectBlog);

module.exports = router;