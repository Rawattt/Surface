const express = require('express');
const {
    dashboard,
    follow,
    getProfile,
    unfollow
} = require('../controller/user');
const auth = require('../middleware/auth');
const router = new express.Router();

router.get('/dashboard', auth, dashboard);
router.post('/follow/:username', auth, follow);
router.post('/unfollow/:username', auth, unfollow);
router.get('/profile/:id', getProfile);

module.exports = router;
