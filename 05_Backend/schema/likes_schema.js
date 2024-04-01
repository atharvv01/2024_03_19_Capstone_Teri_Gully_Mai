const mongoose = require("mongoose");

const LikedBlogSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  blog: { type: mongoose.Schema.Types.ObjectId, ref: "Blog", required: true },
});

module.exports = mongoose.model("LikedBlog", LikedBlogSchema);
