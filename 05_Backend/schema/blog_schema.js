const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ["explore", "things_to_do", "where_to_eat"],
    required: true,
  },
  published: {
    type: Boolean,
    default: false,
  },
  views: {
    type: Number,
    default: 0,
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
  trending: {
    type: Boolean,
    default: false,
  },
  promoted: {
    type: Boolean,
    default: false,
  },
  saves: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Save",
    },
  ],
  flags: {
    type: Number,
    default: 0,
  },
  segments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Segment",
    },
  ],
  coverPhoto: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
