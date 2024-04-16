// Schema imports
const User = require("../schema/user_schema");
const Savedblogs = require("../schema/saved_blogs");
const blog = require("../schema/blog_schema")




const saveBlog = async (req, res) => {
    try {
        const userData = req.decoded;
        console.log(userData);
        const blogId = req.query.blogId;

        // Find the user's wishlist entry or create a new one if it doesn't exist
        let user = await User.findById(userData.userId)
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Check if the user has already saved this blog
        const savedBlogs = await Savedblogs.findOne({user:userData.userId,blog:blogId})
        if (savedBlogs) {
            return res.status(400).json({ success: false, message: "Blog already saved by the user" });
        }

        // Check the user's status and the number of blogs they have saved
        const savedBlogsCount = await Savedblogs.countDocuments({user: userData.userId});
        if (user.status === 'normal' && savedBlogsCount >= 5) {
            return res.status(400).json({ success: false, message: "Take subscription to save more blogs" });
        }

        const addToSaved = new Savedblogs ({
            user:userData.userId,
            blog:blogId
        });
        await addToSaved.save();   
        // Increment the like count for the blog
        
        await blog.findByIdAndUpdate(blogId, { $inc: { likes: 1 } });

        res.status(200).json({
            success: true,
            message: "Blog added to saved section and like count incremented successfully!",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

//function for user to unsave blogs
const unsaveBlog = async (req, res) => {
    try {
        const userData = req.decoded;
        const blogId = req.query.blogId;

        // Find the user's saved blog entry
        const savedBlog = await Savedblogs.findOne({ user: userData.userId, blog: blogId });
        if (!savedBlog) {
            return res.status(404).json({ success: false, message: "Blog not found in user's saved section" });
        }

        // Delete the saved blog entry
        await Savedblogs.findByIdAndDelete(savedBlog._id);

        // Decrement the like count for the blog
        await blog.findByIdAndUpdate(blogId, { $inc: { likes: -1 } });

        res.status(200).json({
            success: true,
            message: "Blog removed from saved section and like count decremented successfully!",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

//function to fetch all the blogs  a user has saved
const getSavedBlogs = async (req, res) => {
    try {
        const userData = req.decoded;

        // Find the user's saved blog entry
        const savedBlogs = await Savedblogs.find({ user: userData.userId });
        if (!savedBlogs) {
            return res.status(404).json({ success: false, message: "No blogs saved" });
        }
        res.status(200).json(savedBlogs);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};


module.exports = {
    saveBlog,
    unsaveBlog,
    getSavedBlogs
};