// external imports
const express = require('express');
const router = express.Router();

// internal imports
const BlogController = require("../controllers/blog_controller")
const { verifyToken} = require("../middleware/auth")

//unprotected routes 
router.get("/city",BlogController.getBlogByCity)


//protected routes 
router.use(verifyToken)
// Route to create a new blog
router.post('/create',BlogController.createBlog);
// Route to add a place to a blog
router.post('/:blogId/places/add',BlogController.addPlaceToBlog);
// Route to delete a the places 
router.delete('/deletePlace',BlogController.placeToDelete)
// route to get blog by id
router.get('/get_blog_by_id',BlogController.getBlogById)

module.exports = router;