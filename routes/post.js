const express = require('express');
const {
    createPost,
    getAllPosts,
    likePost,
    unlikePost,
    fullPost,
    editPost,
    putComment
} = require('../controller/post');
const auth = require('../middleware/auth');

const router = new express.Router();

router.post('/create', auth, createPost);
router.post('/edit/:postId', auth, editPost);
router.get('/:postId', auth, fullPost);
router.post('/comment/:postId', auth, putComment);
router.post('/like/:postId', auth, likePost);
router.post('/unlike/:postId', auth, unlikePost);
router.get('/', getAllPosts);
module.exports = router;
