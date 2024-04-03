const mongoose = require('mongoose');

// Define schema for comments
const commentsSchema = new mongoose.Schema({
  blog_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Blog', 
    required: true 
  }, // Reference to the blog ID for which the comments are posted
  comments: [{
    user_id: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User', 
      required: true 
    }, // Reference to the user who posted the comment
    comment: { 
      type: String, 
      required: true 
    }, // Content of the comment
    is_approved: { 
      type: Boolean, 
      default: false 
    }, // Flag indicating whether the author of the blog has approved the comment
    timestamp: { 
      type: Date, 
      default: Date.now 
    }, // Timestamp of when the comment was posted
  }]
});

module.exports = mongoose.model('Comments', commentsSchema);
