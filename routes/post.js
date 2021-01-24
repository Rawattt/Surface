const express = require('express');
const {
    createPost,
    getAllPosts,
    likePost,
    unlikePost
} = require('../controller/post');
const auth = require('../middleware/auth');

const router = new express.Router();

router.post('/create', auth, createPost);
router.post('/like/:postId', auth, likePost);
router.post('/unlike/:postId', auth, unlikePost);
router.get('/', getAllPosts);
module.exports = router;
