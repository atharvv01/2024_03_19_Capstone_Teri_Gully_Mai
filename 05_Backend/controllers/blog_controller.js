//internal dependencies 
const User = require("../schema/user_schema")
const SavedBlog = require("../schema/saved_blogs")
const Blog = require('../schema/blog_schema');
const Place = require('../schema/place_schema');

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
      author: userData.userId
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
    const { placeName, imageUrl, googleMapLink, description, price, timings, where, ratings } = req.body;
    const blogId = req.query.blogId;

    let img;
    if (imageUrl) {
      // If imageURL is provided, upload the image to Cloudinary
      const result = await cloudinary.uploader.upload(imageUrl);
      img = result.secure_url; // Use the Cloudinary URL for the image
    } else {
      // If imageURL is not provided, use the img parameter from the request body
      img = req.body.img;
    }

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

    // Update the blog with the new place
    await Blog.findByIdAndUpdate(blogId, { $push: { places: savedPlace._id } });

    res.status(201).json(savedPlace);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// controller to delete a place while creating a blog
const placeToDelete = async (req, res) => {
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
    if (!blogs) {
      return res.status(404).json({ success: false, message: "Blog not found" });
    }
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller to fetch blog details by ID
const getBlogByAuthorId = async (req, res) => {
  try {
    const authorId = req.query.authorId;
    // Find the blog with the specified ID
    const blog = await Blog.find({ author: authorId});
    if (!blog) {
      return res.status(404).json({ success: false, message: "Blog not found" });
    }
    res.status(200).json(blog);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
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

// Controller to delete the blog 
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

// Controller to modify the blog and places in it
const modifyBlogAndPlaces = async (req, res) => {
  try {
    const userdata = req.decoded
    const blogId = req.query.blogId; // Assuming the blog ID is provided in the request parameters
    const { title, description, city, thumbnail, places } = req.body; // Assuming the updated blog and places details are provided in the request body

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
await blog.save();

// // Update places within the blog
// for (const place of places) {
//   const { placeId, placeName, description, img, googleMapLink, price, timings, where, ratings } = place;
//   const existingPlace = await Place.findOne({ _id: placeId, blog: blogId });
//   if (existingPlace) {
//     // Update existing place
//     if (placeName) existingPlace.placeName = placeName;
//     if (description) existingPlace.description = description;
//     if (img) existingPlace.img = img;
//     if (googleMapLink) existingPlace.googleMapLink = googleMapLink;
//     if (price) existingPlace.price = price;
//     if (timings) existingPlace.timings = timings;
//     if (where) existingPlace.where = where;
//     if (ratings) existingPlace.ratings = ratings;
//     await existingPlace.save();
//   } else {
//     // Create new place if not found
//     const newPlace = new Place({
//       placeName,
//       description,
//       img,
//       googleMapLink,
//       price,
//       timings,
//       where,
//       ratings,
//       blog: blogId
//     });
//     await newPlace.save();
//   }
// }
    res.status(200).json({ success: true, message: "Blog and places updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Route to get all places of a blog by ID
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
  getAllPlacesOfBlog
};