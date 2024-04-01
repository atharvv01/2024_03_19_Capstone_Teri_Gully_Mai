/**
 * New features added schema 
 */


const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 30
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: /^\S+@\S+\.\S+$/
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  role: {
    type: String,
    default: 'user', // By default, the role is set to "user"
  },
  profile_pic: {
    type: String, // URL of the user's profile picture
    require: true
  },
  points: {
    type: Number,
    default: 0, // Number of points a particular user has
  },
  status: {
    type: String,
    enum: ['premium', 'normal'], // Whether the user is a premium user or normal user
    default: 'normal', // By default, the status is set to "normal"
  },
  token: {
    type: String,
    default: '', // Token for authentication (if needed)
  },
  timestamp: {
    type: Date,
    default: Date.now, // Timestamp of when the user account was created
  }
});

module.exports = mongoose.model('User', userSchema);

















/**
 * Intial schema
 * @author Atharva
 */

// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//   username: {
//     type: String,
//     required: true,
//     unique: true,
//     trim: true,
//     minlength: 3,
//     maxlength: 30
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//     trim: true,
//     lowercase: true,
//     match: /^\S+@\S+\.\S+$/
//   },
//   password: {
//     type: String,
//     required: true,
//     minlength: 6,
//   },
//   token:{
//     type:String,
//     default:''
//   }
// });


// module.exports = mongoose.model('User', userSchema);
