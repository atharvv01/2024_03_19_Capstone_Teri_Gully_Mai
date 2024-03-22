const cloudinary = require("cloudinary").v2;

// Configure Cloudinary (make sure to configure it in your main app file as well)
cloudinary.config({
  cloud_name: "dxcexecib",
  api_key: "125962931778154",
  api_secret: "5hrTNGW05UBkSvZhWjlATweLq74",
});

//function for uploading image to the cloud
const uploadImage = async (req, res) => {
    try {
      // Check if image file is included in the request
      if (!req.file) {
        return res.status(400).json({ error: 'Image file is required' });
      }
  
      // Upload image to Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);
  
      // Return response with uploaded image details
      res.status(200).json({ imageUrl: result.secure_url, publicId: result.public_id });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  module.exports = {
    uploadImage
  };