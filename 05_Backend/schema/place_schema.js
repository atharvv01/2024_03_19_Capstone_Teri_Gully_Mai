const { string } = require('joi');
const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
  placeName: {
    type: String,
    required: true,
    unique : true
  },
  img: [String],
  googleMapLink: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: Number,
  mustTry: String
});

module.exports = mongoose.model('Place', placeSchema);


















// const mongoose = require('mongoose');

// const placeSchema = new mongoose.Schema({
//   placeName: {
//     type: String,
//     required: true
//   },
//   img: [String],
//   googleMapLink: {
//     type: String,
//     required: true
//   },
//   description: {
//     type: String,
//     required: true
//   },
//   price: Number,
//   timings: String,
//   where: String,
//   ratings: Number
//   // Add more properties as needed
// });

// module.exports = mongoose.model('Place', placeSchema);
