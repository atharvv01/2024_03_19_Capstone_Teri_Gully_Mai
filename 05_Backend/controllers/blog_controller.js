const Blog = require('../schema/blog_schema'); 
const Place = require('../schema/place_schema');
const { verifyToken } = require("../middleware/auth");

// Controller to create a new blog
const createBlog = async (req, res) => {
  try {

    const userData = req.decoded; // Decoded user information from the token

    const { title, description, city, thumbnail } = req.body;
    const newBlog = new Blog({
      title,
      description,
      city,
      thumbnail,
      author:userData.userId
    });
    const savedBlog = await newBlog.save();
    res.status(201).json(savedBlog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller to add a place to a blog
const addPlaceToBlog = async (req, res) => {
  try {
    const { placeName, img, googleMapLink, description, price, timings, where, ratings } = req.body;
    const blogId = req.query.blogId;
    const newPlace = new Place({
      placeName,
      img,
      googleMapLink,
      description,
      price,
      timings,
      where,
      ratings
    });
    const savedPlace = await newPlace.save();
    await Blog.findByIdAndUpdate(blogId, { $push: { places: savedPlace._id } });
    res.status(201).json(savedPlace);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// controller to delete a place while creating a blog
const placeToDelete =  async (req, res) => {
    try {
        const placeId = req.query.placeId;
        
        // Delete the place by ID
        console.log(placeId + " is deleted");
        await Place.findByIdAndDelete(placeId);
        
        // Update blog documents to remove the deleted place ID from the `places` array
        await Blog.updateMany({ $pull: { places: placeId } });
    
        res.status(200).json({ message: 'Place deleted successfully' });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
  };
  
// Controller to fetch blog details by city ..here it also fetchs places inside to the blog
const getBlogByCity = async (req, res) => {
    try {
        const city = req.query.city;
        // Find blogs with the specified city
        const blogs = await Blog.find({ city });
        res.status(200).json(blogs);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
  };

// Controller to fetch blog details by ID
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

// Export the controller functions
module.exports = {
  createBlog,
  addPlaceToBlog,
  getBlogByCity,
  getBlogById,
  placeToDelete
};