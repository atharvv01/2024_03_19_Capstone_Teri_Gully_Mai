const { config, uploader } = require('cloudinary');
const cloudinary = require('cloudinary').v2;

// Your existing configuration and functions
// Configure cloudinary
const cloudinaryConfig = (req, res, next) => {
  config({
    cloud_name: "dxcexecib",
    api_key: "125962931778154",
    api_secret: "5hrTNGW05UBkSvZhWjlATweLq74",
  });
  next();
};

// Upload function
const upload = (filePath, options) => {
  return uploader.upload(filePath, options); // Use `uploader` directly since it's destructured from the required `cloudinary`
};

module.exports = { cloudinaryConfig, uploader, upload };