// external imports
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const config = require("../config/config")
const nodemailer = require("nodemailer")
const randomstring = require("randomstring");

// internal imports
const SECRET_KEY = process.env.SECRET_KEY;
const { validateInputs } = require("../validators/user_validations");

// Schema imports
const User = require("../schema/user_schema");
const Place = require("../schema/place_schema");
const Savedblogs = require("../schema/saved_blogs");
const blog = require("../schema/blog_schema")


const signup = async (req, res) => {
    try {
        const userData = req.body;

        // Validate user data
        const validationError = validateInputs(userData);
        if (validationError) {
            return res.status(400).json({
                success: false,
                message: validationError,
            });
        }

        // Check if the user already exists with the provided email
        const existingUser = await User.findOne({ email: userData.email });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "An account already exists with the provided email.",
            });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        userData.password = hashedPassword;

        // Create a new user
        const newUser = new User(userData);
        const savedUser = await newUser.save();

        res.status(201).json({
            success: true,
            message: "User signed up successfully!",
            user: savedUser,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

const login = async (req, res) => {
    try {
        const userData = req.body;
        const username = userData.username;
        const password = userData.password;

        // validate  inputs
        const validationError = validateInputs(userData);
        if (validationError) {
            return res.status(400).json({
                success: false,
                message: validationError,
            });
        }

        // Find the user by username
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        // Compare the provided password with the hashed password in the database
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: "Invalid password",
            });
        }

        // If the password is valid, generate a JWT token
        const token = jwt.sign(
            { userId: user._id, username: user.username },
            SECRET_KEY,
            { expiresIn: process.env.TOKEN_EXPIRY }
        );

        res.status(200).json({
            success: true,
            message: "Login successful!",
            token,
            user: {
                username: user.username,
                full_name: user.full_name,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

//function for user to save blogs
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
        const savedBlogs = await Savedblogs.findOne({user:userData.userId,blog:blogId})
        if (savedBlogs) {
            return res.status(400).json({ success: false, message: "Blog already saved by the user" });
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


// Function to initiate the password reset process
const forget_password = async (req, res) => {
    try {
        // Extracting the email from the request body
        const email = req.body.email;

        // Finding user data based on the provided email
        const userData = await User.findOne({ email: email }, { username: 1, email: 1 });

        // If user data is found
        if (userData) {
            // Generating a random string
            const randomString = randomstring.generate();

            // Updating the user's record with the generated token
            const data = await User.updateOne(
                { email: email },
                { $set: { token: randomString } }
            );



            // Sending the reset password email
            sendResetPasswordMail(userData.username, userData.email, randomString);

            // Sending a success response
            res.status(200).send({ success: true, msg: "Check mail and reset password!" });
        } else {
            // Sending a success response if email does not exist
            res.status(200).send({ success: true, msg: "Email does not exist" });
        }
    } catch (error) {
        // Handling errors and sending an error response if an exception occurs
        res.status(400).send({ success: false, msg: error.message });
    }
};

// Function for sending a reset password email
const sendResetPasswordMail = async (name, email, token) => {
    try {
        // Creating a transporter for sending emails using Gmail SMTP
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            requireTLS: true,
            auth: {
                user: config.emailUser,  // Your Gmail username
                pass: config.emailPassword,  // Your Gmail password
            },
        });

        // Mail options for the reset password email
        const mailOptions = {
            from: config.emailUser,  // Sender's email address
            to: email,  // Recipient's email address
            subject: "For reset password",  // Email subject
            // Email body in HTML format
            html: `
          <p>Hi ${name},</p>
          <p>Please click the link below to reset your password:</p>
          <a href=http://localhost:4200/resetpassword?token=${token}>Reset password</a>
        `
        };

        // Sending the email
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                // Log an error if sending the email fails
                console.log(error);
            } else {
                // Log a success message if the email is sent successfully
                console.log("Mail Has been sent:-", info.response);
            }
        });
    } catch (error) {
        // Handling errors and sending an error response if an exception occurs
        res.status(400).send({ success: false, msg: error.message });
    }
};

const reset_password = async (req, res) => {
    try {
        // Extracting the token from the query parameters
        const token = req.query.token;
        console.log(token);


        // Finding user data based on the provided token
        const tokenData = await User.findOne({ token: token });
        console.log(tokenData);

        // If token data is found and it's not expired
        if (tokenData && !isTokenExpired(tokenData.tokenTimestamp)) {
            // Extracting the new password from the request body  
            const password = req.body.password;

            // Hashing the new password using bcrypt
            const newPass = await bcrypt.hash(password, 10);

            // Updating the user's record with the new password and clearing the token
            const userdata = await User.findByIdAndUpdate(
                { _id: tokenData._id },
                { $set: { password: newPass, token: "" } },
                { new: true }
            );

            // Sending a success response with the updated user data
            res.status(200).send({
                success: true,
                msg: "Password reset successfully",
                data: userdata,
            });
        } else {
            // Sending a success response if the link has expired or the token is invalid
            res.status(200).send({ success: true, msg: "Link Expired or Invalid Token!" });
        }
    } catch (error) {
        // Handling errors and sending an error response if an exception occurs
        res.status(400).send({ success: false, msg: error.message });
    }
};

// Function to check if the token is expired
const isTokenExpired = (timestamp) => {
    const expirationTime = 86400000;
    const currentTime = new Date().getTime();
    return (currentTime - timestamp) > expirationTime;
};


module.exports = {
    signup,
    login,
    forget_password,
    reset_password,
    saveBlog,
    unsaveBlog,
    getSavedBlogs
};