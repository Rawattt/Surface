const User = require('../models/user');
const Post = require('../models/post');
const Comment = require('../models/comment');
const HttpError = require('http-errors');
const Follower = require('../models/follow');
const errorHandler = require('../utils/errorHandler');
const qs = require('query-string');

// @desc      Make post
// @route     POST /api/v1/post/create
// @access    Private
exports.createPost = async (req, res) => {
    try {
        const { title, body } = req.body;
        const owner = req.session.user_id;
        const username = req.session.username;
        if (!title || !body) throw new HttpError(400, 'Please fill all fields');

        const post = new Post({ title, body, owner, username });
        await post.save();

        res.redirect('/api/v1/dashboard');
    } catch (error) {
        console.log(error);
        res.status(error.statusCode || 500).json({
            error: true,
            errorMessage: error.message
        });
    }
};

// @desc      Edit post
// @route     POST /api/v1/post/edit/:postId
// @access    Private
exports.editPost = async (req, res) => {
    try {
        const { postId } = req.params;
        const { title, body } = req.body;

        if (!postId || !title || !body)
            throw new Error('Please fill all fields');

        if (!title || !body) throw new HttpError(400, 'Please fill all fields');

        const post = await Post.findByIdAndUpdate(
            postId,
            {
                $set: { title, body }
            },
            { new: true }
        );
        res.json({ post });
    } catch (error) {
        console.log(error);
        res.status(error.statusCode || 500).json({
            error: true,
            errorMessage: error.message
        });
    }
};

// @desc      Get all post
// @route     GET /api/v1/post?page
// @access    Public

exports.getAllPosts = async (req, res) => {
    try {
        let page = parseInt(req.query.page);
        let n = Number.isInteger(page) ? page : 1;
        let posts = await Post.aggregate([{ $sort: { datetime: -1 } }]);
        let totalPosts = posts.length;
        posts = posts.slice((n - 1) * 3, n * 3);
        res.json({ posts, totalPosts });
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

// @desc      Unlike post
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

// @desc      Get single post
// @route     GET /api/v1/post/:postId
// @access    Private
exports.fullPost = async (req, res) => {
    try {
        const { postId } = req.params;

        if (!postId) throw new Error('Invalid request');

        const post = await Post.findById(postId);
        if (!post) throw new Error('Post does not exist');

        const comments = await Comment.find({ post: postId });

        res.status(200).json({ error: false, payload: { post, comments } });
    } catch (error) {
        res.json({ error: true, errorMessage: error.message });
    }
};
// @desc      Add comment
// @route     POST /api/v1/post/comment/:postId
// @access    Private
exports.putComment = async (req, res) => {
    try {
        const { postId } = req.params;
        const id = req.session.user_id;
        const { body } = req.body;
        const username = req.session.username;
        console.log(body);
        res.json({});

        if (!body) throw new Error('Please fill all fields');

        if (!postId) throw new Error('Invalid request');

        let post = await Post.findById(postId);
        if (!post) throw new Error('Post does not exist');

        let comment = new Comment({
            from: id,
            fromUsername: username,
            post: postId,
            body
        });
        await comment.save();

        let comments = await Comment.find({ post: postId });
        console.log(comments);
        return res.status(201).json({ error: false, comments: comments });
    } catch (error) {
        console.log(error);
        return res.json({ error: true, errorMessage: error.message });
    }
};
