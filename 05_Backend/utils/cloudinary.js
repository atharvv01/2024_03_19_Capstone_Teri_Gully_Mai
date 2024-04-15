const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Configure Cloudinary (make sure to configure it in your main app file as well)
cloudinary.config({
  cloud_name: "dxcexecib",
  api_key: "125962931778154",
  api_secret: "5hrTNGW05UBkSvZhWjlATweLq74",
});

// here we created a storage space in cloudinary.
// where we've defined folder name and its allowed format.
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'TeriGullyMai',
    allowedFormats : ["png", "jpg", "jpeg"]
  },
});

module.exports = {cloudinary,storage};