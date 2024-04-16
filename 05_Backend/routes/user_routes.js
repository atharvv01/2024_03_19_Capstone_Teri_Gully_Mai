// external imports
const express = require('express');
const router = express.Router();
const { cloudinaryConfig } = require('../utils/cloudinary');

// internal imports
const UserController = require("../controllers/user_controller")
// const { verifyToken} = require("../middleware/auth");
// const multer = require('../middleware/multer');

const { multerUploads, dataUri } = require('../middleware/multer'); // Make sure the path is correct

// unprotected routes
router.post('/signup', UserController.signup);
router.post('/login', UserController.login);
router.post('/forget_password',UserController.forget_password)
router.post('/reset_password',UserController.reset_password)
router.post("/random_saves",UserController.saveRandomBlogsForRandomUser)
router.get("/getUserDetails",UserController.getUserDetails)
router.post("/upload",multerUploads,UserController.uploadImg)



module.exports = router;

