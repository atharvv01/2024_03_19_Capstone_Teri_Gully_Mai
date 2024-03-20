const mongoose = require('mongoose');
const { wordCountValidator } = require('../validators/schema_validators');

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
    required: true,
    // validate: {
    //   validator: wordCountValidator(50, 250),
    //   message: props => `${props.value} must have between 50 and 250 words`
    // }
  },
  city: {
    type: String,
    required: true
  },
  thumbnail: {
    type: String,
    required: true
  },
  places: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Place' }], // Referencing the Place model
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  likes: {
    type: Number,
    default: 0
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

blogSchema.pre('find', function(next) {
  this.populate('places'); // Automatically populate the 'places' field
  next();
});


module.exports = mongoose.model('Blog', blogSchema);
