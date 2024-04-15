// external imports
const express = require('express');
const router = express.Router();

// internal imports
const BlogController = require("../controllers/blog_controller")
const { verifyToken} = require("../middleware/auth")
// middleware to upload image to cloudinary
const uploadImage = require("../controllers/blog_controller").uploadImage;



//unprotected routes 
router.get("/city",BlogController.getBlogByCity)
//route to get blog by blog id
router.get('/get_blog_by_id',BlogController.getBlogById)
//router to get all places of a blog 
router.get('/get_places_of_blog',BlogController.getAllPlacesOfBlog)

//protected routes 
router.use(verifyToken)
// Route to create a new blog
router.post('/create',uploadImage,BlogController.createBlog);
// Route to add a place to a blog
router.post('/:blogid/places/add',BlogController.addPlaceToBlog);
// Route to delete a the places 
router.delete('/deletePlace',BlogController.placeToDelete)
// route to get blog by author id
router.get('/get_blog_by_author_id',BlogController.getBlogByAuthorId)
//route to delete a blog
router.delete('/deleteBlog',BlogController.deleteBlogAndPlaces)
//route to modify a blog
router.put('/update_blog',BlogController.modifyBlogAndPlaces)

module.exports = router;