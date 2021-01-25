const Follow = require('../models/follow');
const Post = require('../models/post');
const User = require('../models/user');
const mongoose = require('mongoose');

// @desc      Dashboard
// @route     GET /api/v1/dashboard
// @access    Private
exports.dashboard = async (req, res) => {
    try {
        const id = req.session.user_id;

        let following = await Follow.find({ follower: id });
        console.log(following);
        if (!following || following.length == 0) {
            const posts = await Post.aggregate([{ $sort: { datetime: -1 } }]);
            return res.json({ error: false, payload: { id, posts } });
        }

        following = [...following, id];
        console.log(following);

        let allFollowing = [];

        for (const followee of following) {
            allFollowing.push(followee.followee);
        }

        let posts = await Post.aggregate([
            { $match: { owner: { $in: allFollowing } } },
            { $sort: { datetime: -1 } }
        ]);
        return res.json({ payload: { id, posts } });
    } catch (error) {
        res.json({ error: true, errorMessage: error.message });
    }
};

// @desc      Follow  a user
// @route     POST /api/v1/follow/:username
// @access    Private
exports.follow = async (req, res) => {
    try {
        const { username } = req.params;
        const id = req.session.user_id;

        if (!username)
            return res.json({
                error: true,
                errorMessage: 'User does not exist'
            });

        const user = await User.findOne({ username });

        if (!user)
            return res.json({
                error: true,
                errorMessage: 'User does not exist'
            });

        let isFollowing = await Follow.findOne({
            follower: id,
            followee: user._id
        });
        if (isFollowing)
            return res.json({ error: false, data: 'Already following' });

        const follower = new Follow({ follower: id, followee: user._id });
        await follower.save();
        let followers = await Follow.find({
            followee: user._id
        }).countDocuments();
        return res.json({ error: false, followers });
    } catch (error) {
        console.log(error);
        res.json({ error: true, errorMessage: error.message });
    }
};

// @desc      Unfollow  a user
// @route     POST /api/v1/unfollow/:username
// @access    Private
exports.unfollow = async (req, res) => {
    try {
        console.log(req.params);
        const { username } = req.params;
        const id = req.session.user_id;
        if (!username)
            return res.json({
                error: true,
                errorMessage: 'User does not exist'
            });

        const user = await User.findOne({ username });

        if (!user)
            return res.json({
                error: true,
                errorMessage: 'User does not exist'
            });

        await Follow.deleteMany({ follower: id });
        let followers = await Follow.find({
            followee: user._id
        }).countDocuments();
        return res.json({ error: false, followers });
    } catch (error) {
        console.log(error);
        res.json({ error: true, errorMessage: error.message });
    }
};

// @desc      View profile
// @route     GET api/v1/profile/:id
// @access    Private
exports.getProfile = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id);
        console.log(req.session.user_id);

        const profile = await User.findById(id);

        if (!profile)
            return res.json({
                error: true,
                errorMessage: 'Profile does not exist'
            });

        const posts = await Post.find({ owner: id });

        const following = await Follow.find({
            follower: profile._id
        }).countDocuments();
        const followers = await Follow.find({
            followee: profile._id
        }).countDocuments();

        let tmp = await Follow.findOne({
            follower: req.session.user_id,
            followee: id
        });

        let isFollowing = tmp ? true : false;

        res.json({
            error: false,
            payload: {
                name: profile.name,
                username: profile.username,
                posts,
                following,
                followers,
                isFollowing
            }
        });
    } catch (error) {
        console.log(error);
        res.json({ error: true, errorMessage: error.message });
    }
};

// @desc      My profile
// @route     GET api/v1/profile/me
// @access    Private
exports.getMyProfile = async (req, res) => {
    try {
        const id = req.session.user_id;

        const profile = await User.findById(id);

        if (!profile)
            return res.json({
                error: true,
                errorMessage: 'Profile does not exist'
            });

        const posts = await Post.find({ owner: id });

        const following = await Follow.find({
            follower: profile._id
        }).countDocuments();
        const followers = await Follow.find({
            followee: profile._id
        }).countDocuments();

        res.json({
            error: false,
            payload: {
                name: profile.name,
                username: profile.username,
                posts,
                following,
                followers
            }
        });
    } catch (error) {
        console.log(error);
        res.json({ error: true, errorMessage: error.message });
    }
};
