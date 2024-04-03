// Function to validate the comment
const validateComment = (comment) => {
    // Regular expression to match at least one alphabet character and numbers
    const regex = /^(?=.*[a-zA-Z])[a-zA-Z0-9\s]+$/;

    // Test the comment against the regular expression
    return regex.test(comment);
};

module.exports = validateComment;
