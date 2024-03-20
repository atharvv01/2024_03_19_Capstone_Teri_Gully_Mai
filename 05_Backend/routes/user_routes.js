// external imports
const express = require('express');
const router = express.Router();

// internal imports
const UserController = require("../controllers/user_controller")
const { verifyToken} = require("../middleware/auth");

// unprotected routes
router.post('/signup', UserController.signup);
router.post('/login', UserController.login);
router.post('/forget_password',UserController.forget_password)
router.post('/reset_password',UserController.reset_password)

//protected routes
router.use(verifyToken)
router.post('/save_blog',UserController.saveBlog)
router.post('/unsave_blog',UserController.unsaveBlog)
router.get('/saved_blogs_by_user',UserController.getSavedBlogs)

module.exports=router; 