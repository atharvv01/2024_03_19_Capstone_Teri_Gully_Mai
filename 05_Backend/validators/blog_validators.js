// Define a word count validator function
function wordCountValidator(minCount, maxCount) {
    return function(value) {
      const wordCount = value.split(/\s+/).length;
      return wordCount >= minCount && wordCount <= maxCount;
    };
  }

module.exports = { wordCountValidator };