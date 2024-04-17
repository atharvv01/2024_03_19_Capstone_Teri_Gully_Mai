// Internal dependencies
const User = require("../schema/user_schema");
const SavedBlog = require("../schema/saved_blogs");
const Blog = require('../schema/blog_schema');
const Place = require('../schema/place_schema');
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const storage = require("../utils/cloudinary");
const mongoose = require('mongoose');

// Require dotenv
require('dotenv').config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

//uploading the image to the multer
const upload = multer({ storage: storage });

// Add a middleware for handling file upload
const uploadImage = upload.single("thumbnail");


/**
 * Controller to create a new blog.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const createBlog = async (req, res) => {
  
  try {

    const userData = req.decoded; // Decoded user information from the token


    // console.log("this is image path"+req.file);

    // const image = req.file.path;
    
    const { title, description, thumbnail, city, isCommentsEnabled, type } = req.body;
    const newBlog = new Blog({
      title,
      description,
      city,
      thumbnail,
      likes : 0,
      views : 0,
      isCommentsEnabled,
      type,
      author: userData.userId
    });
    
    // Save the new blog
    const savedBlog = await newBlog.save();

    // Check if places are provided in the request body
    if (req.body.places && req.body.places.length > 0) {
      // Create an array to store references to the newly created places
      const createdPlaces = [];

      // Iterate through each place provided in the request
      for (const placeData of req.body.places) {
        // Create a new place instance using data from the request
        const newPlace = new Place({
          placeName: placeData.placeName,
          img: placeData.img,
          googleMapLink: placeData.googleMapLink,
          description: placeData.description,
          price: placeData.price,
          ratings: placeData.ratings
        });

        // Save the new place
        const savedPlace = await newPlace.save();

        // Push the ID of the saved place to the array
        createdPlaces.push(savedPlace._id);
      }

      // Update the newly created blog with references to the created places
      savedBlog.places = createdPlaces;
      await savedBlog.save();
    }
    
    return res.status(201).json(savedBlog);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

/**
 * Controller to add a place to a blog.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const addPlaceToBlog = async (req, res) => {
  try {
    const userData = req.decoded; // Decoded user information from the token
    const placeData = req.body.placeData; // Accessing the placeData array
    console.log(placeData);

    const blogId = req.params.blogid; // Convert string to ObjectId
    // Ensure the user is authenticated
    if (!userData) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Iterate over each object in the placeData array
    for (const place of placeData) {
      // Create a new place instance using the Place schema
      const newPlace = new Place({
        placeName: place.placeName,
        img: place.images,
        googleMapLink: place.googleMapLink,
        description: place.description,
        price: place.price,
        mustTry: place.MustTry,
        officalLink: place.officalLink
      });

      console.log("newplace", newPlace);
      // Save the new place
      const savedPlace = await newPlace.save();

      console.log(blogId);
      // Update the blog with the new place
      const blogToUpdate = await Blog.findById(blogId);
      if (!blogToUpdate) {
        return res.status(404).json({ error: "Blog not found" });
      }

      // Push the new place ID into the places array of the blog
      blogToUpdate.places.push(savedPlace._id);
      // Save the updated blog
      const updatedBlog = await blogToUpdate.save();
    }

    res.status(201).json({ message: "Places added to blog successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


/**
 * Controller to delete a place while creating a blog.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const placeToDelete = async (req, res) => {
  try {
    const placeId = req.query.placeId;

    // Delete the place by ID
    console.log(placeId + " is deleted");
    await Place.findByIdAndDelete(placeId);

    // Update blog documents to remove the deleted place ID from the `places` array
    await Blog.updateMany({}, { $pull: { places: placeId } });

    res.status(200).json({ message: 'Place deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Controller to fetch blog details by city including places.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const getBlogByCity = async (req, res) => {
  try {
    const city = req.query.city;
    // Find blogs with the specified city
    const blogs = await Blog.find({ city });
    if (!blogs) {
      return res.status(404).json({ success: false, message: "Blog not found" });
    }
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Controller to fetch blog details by author ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const getBlogByAuthorId = async (req, res) => {
  try {
    const authorId = req.query.authorId;
    // Find the blog with the specified ID
    const blog = await Blog.find({ author: authorId });
    if (!blog) {
      return res.status(404).json({ success: false, message: "Blog not found" });
    }
    res.status(200).json(blog);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

/**
 * Controller to fetch blog details by ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const getBlogById = async (req, res) => {
  try {
    const blogId = req.query.blogId;
    // Find the blog with the specified ID
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ success: false, message: "Blog not found" });
    }
    res.status(200).json(blog);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

/**
 * Controller to delete the blog along with associated places.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const deleteBlogAndPlaces = async (req, res) => {
  try {
    const userdata = req.decoded
    const blogId = req.query.blogId;

    //Check if the user is authorized to delete the blog (e.g., user is the author of the blog)
    const blog = await Blog.findOne({ _id: blogId, author: userdata.userId });
    if (!blog) {
      return res.status(403).json({ success: false, message: "You are not authorized to delete this blog" });
    }

    // Delete the blog
    const deletedBlog = await Blog.findByIdAndDelete(blogId);

    // If the blog is not found, return an error
    if (!deletedBlog) {
      return res.status(404).json({ error: 'Blog not found' });
    }

    // Delete all places associated with the blog
    await Place.deleteMany({ _id: { $in: deletedBlog.places } });

    // Remove the blog from the list of saved blogs for all users
    await SavedBlog.updateMany({}, { $pull: { savedBlogs: blogId } });

    res.status(200).json({ message: 'Blog, associated places, and saved references deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

/**
 * Controller to modify the blog and associated places.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const modifyBlogAndPlaces = async (req, res) => {
  try {
    const userdata = req.decoded;
    const blogId = req.query.blogId; // Assuming the blog ID is provided in the request parameters
    const { 
      title, 
      description, 
      city, 
      thumbnail, 
      places, 
      likes, 
      views, 
      comments, 
      isCommentsEnabled, 
      status, 
      isTrending, 
      isPromoted, 
      saves, 
      flags, 
      type // Additional fields to modify
    } = req.body; // Assuming the updated blog and places details are provided in the request body

    // Validate input data if necessary

    // Check if the user is authorized to modify the blog (e.g., user is the author of the blog)
    const blog = await Blog.findOne({ _id: blogId, author: userdata.userId });
    if (!blog) {
      return res.status(403).json({ success: false, message: "You are not authorized to modify this blog" });
    }

    // Update blog details
    if (title) blog.title = title;
    if (description) blog.description = description;
    if (city) blog.city = city;
    if (thumbnail) blog.thumbnail = thumbnail;
    if (places) blog.places = places;
    if (likes) blog.likes = likes;
    if (views) blog.views = views;
    if (comments) blog.comments = comments;
    if (isCommentsEnabled !== undefined) blog.isCommentsEnabled = isCommentsEnabled;
    if (status) blog.status = status;
    if (isTrending !== undefined) blog.isTrending = isTrending;
    if (isPromoted !== undefined) blog.isPromoted = isPromoted;
    if (saves) blog.saves = saves;
    if (flags) blog.flags = flags;
    if (type) blog.type = type;
    
    await blog.save();

    res.status(200).json({ success: true, message: "Blog and places updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

/**
 * Route to get all places of a blog by ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const getAllPlacesOfBlog = async (req, res) => {
  try {
    const blogId = req.query.blogId;
    // console.log(blogId);
    // Find the blog by ID and populate the 'places' field
    const blog = await Blog.findById(blogId).populate('places');
    // console.log(blog);
    // console.log("hello");
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }

    // Extract places from the blog and send them as response
    const places = blog.places;
    res.json(places);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Export the controller functions
module.exports = {
  createBlog,
  addPlaceToBlog,
  getBlogByCity,
  getBlogByAuthorId,
  getBlogById,
  placeToDelete,
  deleteBlogAndPlaces,
  modifyBlogAndPlaces,
  getAllPlacesOfBlog,
  uploadImage
};
