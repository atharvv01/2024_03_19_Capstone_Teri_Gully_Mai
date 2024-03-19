// Validator function for checking minimum and maximum word count
const wordCountValidator = (minWords, maxWords) => {
    return function(value) {
      const words = value.split(' ');
      return words.length >= minWords && words.length <= maxWords;
    };
  };
  
  module.exports = {
    wordCountValidator
  };