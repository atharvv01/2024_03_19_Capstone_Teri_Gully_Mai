// external imports
const express = require('express');
const router = express.Router();

// internal imports
const AdminController = require("../controllers/admin_controller")
const { verifyToken} = require("../middleware/auth")

//protected routes
router.use(verifyToken)


//Routes for the blogs which are waithing for approval from admin
router.get('/pendingblogs', AdminController.getPendingBlogs);
// Route to approve a blog
router.put('/approve/:id', AdminController.approveBlog);
// Route to reject a blog
router.put('/reject/:id', AdminController.rejectBlog);


//Routes for the blogs having flagged value more than 5
router.get('/flagged-blogs', AdminController.getFlaggedBlogs);
// Define route to update flags of a specific blog
router.put('/reset-flags/:id', AdminController.resetBlogFlags);
// Define route to delete a specific blog
router.delete('/delete-blogs/:id', AdminController.deleteBlog);

module.exports = router;