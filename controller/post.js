const User = require('../models/user');
const Post = require('../models/post');
const HttpError = require('http-errors');
const Follower = require('../models/follow');
const errorHandler = require('../utils/errorHandler');

// @desc      Make post
// @route     POST /api/v1/post/create
// @access    Private
exports.createPost = async (req, res) => {
    try {
        const { title, body } = req.body;
        const owner = req.session.user_id;
        if (!title || !body) throw new HttpError(400, 'Please fill all fields');

        const post = new Post({ title, body, owner });
        await post.save();

        const posts = await Post.aggregate([{ $sort: { datetime: -1 } }]);
        // const posts = User.aggregate([{$match:{_id:owner}}, $lookup:{
        //       from:Post.collection.name,
        //       localField:'_id',
        //       foreignField:'owner'
        // }])
        res.status(201).json({ error: false, payload: { _id: owner, posts } });
    } catch (error) {
        console.log(error);
        res.status(error.statusCode || 500).json({
            error: true,
            errorMessage: error.message
        });
    }
};

// @desc      Get all post
// @route     GET /api/v1/post
// @access    Public

exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        res.json({ posts });
    } catch (error) {
        errorHandler(res, error);
    }
};

// @desc      Like post
// @route     POST /api/v1/post/like/:postId
// @access    Private

exports.likePost = async (req, res) => {
    try {
        const id = req.session.user_id;
        const { postId } = req.params;

        await Post.updateOne({ _id: postId }, { $push: { likes: id } });

        res.redirect('/api/v1/dashboard');
        // console.log(posts);
        res.json({ error: false, payload: { posts } });
    } catch (error) {
        res.json({ error: true });
    }
};

// @desc      Unline post
// @route     POST /api/v1/post/unlike/:postId
// @access    Private

exports.unlikePost = async (req, res) => {
    try {
        const id = req.session.user_id;
        const { postId } = req.params;
        await Post.updateOne({ _id: postId }, { $pull: { likes: id } });
        res.redirect('/api/v1/dashboard');
    } catch (error) {
        console.log(error);
        res.json({ error: true });
    }
};
