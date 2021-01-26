const Follow = require('../models/follow');
const Post = require('../models/post');
const User = require('../models/user');
const mongoose = require('mongoose');

// @desc      Dashboard
// @route     GET /api/v1/dashboard/:page
// @access    Private
exports.dashboard = async (req, res) => {
    try {
        const id = req.session.user_id;

        const page = req.params.page || 1;

        let following = await Follow.find({ follower: id });
        let posts;
        console.log(following);
        if (!following || following.length === 0) {
            posts = await Post.aggregate([{ $sort: { datetime: -1 } }]);
        } else {
            following = [...following];
            console.log(following);

            let allFollowing = [];

            for (const followee of following) {
                allFollowing.push(followee.followee);
            }

            allFollowing.push(mongoose.Types.ObjectId(id));

            console.log(allFollowing);

            posts = await Post.aggregate([
                { $match: { owner: { $in: allFollowing } } },
                { $sort: { datetime: -1 } }
            ]);
        }

        let totalPosts = posts.length;
        posts = posts.slice((parseInt(page) - 1) * 3, parseInt(page) * 3);
        console.log(posts);
        return res.json({ payload: { id, posts, totalPosts } });
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
            followee: user.id
        });
        if (isFollowing)
            return res.json({ error: false, data: 'Already following' });

        const follower = new Follow({
            follower: id,
            followee: user._id,
            followerUsername: req.session.username,
            followeeUsername: username
        });
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

        let a = await Follow.deleteMany({
            followerUsername: req.session.username,
            followeeUsername: username
        });
        console.log(a);
        let followers = await Follow.find({
            followeeUsername: username
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

// @desc      Followers
// @route     GET api/v1/followers/:id
// @access    Private
exports.myFollowers = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) throw new Error('Invalid request');

        const followers = await Follow.find({ followee: id });
        console.log(followers);
        res.json(followers);
    } catch (error) {
        console.log(error);
    }
};

// @desc      Following
// @route     GET api/v1/following/:id
// @access    Private
exports.myFollowees = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) throw new Error('Invalid request');

        const followers = await Follow.find({ follower: id });
        console.log(followers);
        res.json(followers);
    } catch (error) {
        console.log(error);
    }
};
