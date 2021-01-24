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
        if (!following || following.length == 0) {
            const posts = await Post.aggregate([{ $sort: { datetime: -1 } }]);
            res.json({ error: false, payload: { id, posts } });
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
        res.json({ payload: { id, posts } });

        // for (const follo of tmp) {
        //     followee.push(follow.followee);
        // }

        // let posts = await Post.aggregate([{ $match: { owner } }]);

        // let posts = await Follow.aggregate([
        //     { $match: { follower: mongoose.Types.ObjectId(id) } },
        //     {
        //         $lookup: {
        //             from: Post.collection.name,
        //             localField: 'followee',
        //             foreignField: 'owner',
        //             as: 'posts'
        //         }
        //     },
        //     {
        //         $replaceRoot: {
        //             newRoot: {
        //                 $mergeObjects: [
        //                     { $arrayElemAt: ['$posts', 0] },
        //                     '$$ROOT'
        //                 ]
        //             }
        //         }
        //     },
        //     { $project: { posts: 0 } }
        //     // { $unwind: { path: '$posts' } },
        //     // { $sort: { 'posts.datatime': 1 } }
        // ]);
        // console.log(posts);

        // if (posts.length == 0)
        //     posts = await Post.aggregate([{ $sort: { datetime: -1 } }]);

        //
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
        res.json({ errors: false });
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

        await Follow.deleteMany({ follower: req.session.user_id });
    } catch (error) {
        console.log(error);
        res.json({ error: true, errorMessage: error.message });
    }
};

// @desc      View profile
// @route     GET api/v1/profile/:username
// @access    Private
exports.getProfile = async (req, res) => {
    try {
        const { username } = req.params;
        const profile = await User.findOne({ username });
        if (!profile)
            return res.json({
                error: true,
                errorMessage: 'Profile does not exist'
            });

        const posts = await Post.find({ owner: profile._id });

        const following = await Follow.find({
            follower: profile._id
        }).countDocuments();
        const followers = await Follow.find({
            followee: profile._id
        }).countDocuments();

        // let follow = await Follow.findOne({
        //     follower: req.session.user_id,
        //     followee: username
        // });

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
    } catch (error) {}
};
