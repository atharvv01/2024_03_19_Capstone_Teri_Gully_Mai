/**
 * New features added schema 
 */ 

// Importing wordCountValidator from a separate file
const { wordCountValidator } = require('../validators/blog_validators'); // Adjust the path as per your project structure




// Define schema for blog 
const mongoose = require('mongoose');
const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    validate: {
      validator: wordCountValidator(5, 15),
      message: props => `${props.value} must have between 5 and 15 words`
    }
  },
  description: {
    type: String,
    required: true, // Description of the blog post
    
  },
  // City associated with the blog post
  city:
  {
    type: String,
    required: true
  },

  // URL of the blog post's thumbnail image
  thumbnail:
  {
    type: String,
    required: true
  },

  // Referencing the Place model for places mentioned in the blog
  places: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Place'
  }],

  // Reference to the user who authored the blog post
  author:
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },

  // Number of likes received by the blog post
  likes: {
    type: Number,
    default: 0
  },

  // Timestamp of when the blog post was created
  timestamp: {
    type: Date,
    default: Date.now
  },

  // Number of views received by the blog post
  views: {
    type: Number,
    default: 0
  },

  // Array of comments posted on the blog post
  comments: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comments'
  },

  // Flag indicating whether comments are enabled for the blog post
  isCommentsEnabled: {
    type: Boolean,
    default: true
  },

  // Approval status of the blog post
  status: {
    type: String,
    enum: ['approved', 'pending', 'rejected'],
    default: 'pending'
  },

  // Flag indicating whether the blog post is trending
  isTrending: {
    type: Boolean,
    default: false
  },

  // Flag indicating whether the blog post is promoted
  isPromoted: {
    type: Boolean,
    default: false
  },

  // Array of references to users who saved the blog post
  saves: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SavedBlog'
  }],

  // Number of flags received by the blog post
  flags: {
    type: Number,
    default: 0
  }, 
  type: {
    type: String,
    enum: ['Explore top Tourist attractions', 'Where to eat', 'Things to do'],
    required: true
  }
});

module.exports = mongoose.model('Blog', blogSchema);














