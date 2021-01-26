const HttpError = require('http-errors');
const errorHandler = require('../utils/errorHandler');
const User = require('../models/user');
const Post = require('../models/post');
const Follow = require('../models/follow');

// @desc      Register user
// @route     POST /api/v1/auth/signup
// @access    Public
exports.userSignup = async (req, res) => {
    try {
        const { name, email, username, password } = req.body;

        if (!name || !email || !password || !username)
            throw new HttpError(400, 'Please fill all the fields');

        //     Check if username already exists
        let checkUsername = await User.findOne({ username });
        if (checkUsername) {
            throw new HttpError(
                400,
                'Username is taken. Please try a different username'
            );
        }

        //     Check if email is already registered
        let checkEmail = await User.findOne({ email });
        if (checkEmail) {
            throw new HttpError(400, 'Email already exists');
        }

        //     Create user
        const user = new User({
            name,
            email,
            username,
            password
        });

        await user.save();

        const user_data = user.toJSON();
        req.session.user_id = user._id;
        req.session.username = username;
        res.status(201).json({ error: false, payload: user_data });
    } catch (error) {
        console.log(error);
        res.json({ error: true, errorMessage: error.message });
    }
};

// @desc      Sign in user
// @route     POST /api/v1/auth/signin
// @access    Public
exports.userSignin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password)
            throw new HttpError(400, 'Please fill all the fields');

        const user = await User.verifyCredentials(email, password);

        req.session.user_id = user._id;
        req.session.username = user.username;

        const user_data = user.toJSON();

        // const posts = await Post.find();

        res.status(200).json({
            error: false,
            payload: { ...user_data }
        });
    } catch (error) {
        if (error.statusCode)
            return res.json({ error: true, errorMessage: error.message });
        res.json({ error: true, errorMessage: 'something went wrong' });
        // console.log(error.message);
        // errorHandler(res, error);
    }
};

// @desc      Sign out user
// @route     POST /api/v1/auth/signout
// @access    Private
exports.userSignout = async (req, res) => {
    try {
        req.session.destroy((err) => {
            if (err) throw new HttpError(err.message);
            res.clearCookie(process.env.NAME);

            res.status(200).json({ error: false });
        });
    } catch (error) {
        console.log(error);
        res.json({ error: true });
    }
};
