// external imports
const express = require('express');
const router = express.Router();

const SavesController = require("../controllers/saves_controller")
const { verifyToken} = require("../middleware/auth");


//protected routes
router.use(verifyToken)
router.post('/save_blog',SavesController.saveBlog)
router.post('/unsave_blog',SavesController.unsaveBlog)
router.get('/saved_blogs_by_user',SavesController.getSavedBlogs)


module.exports=router; 