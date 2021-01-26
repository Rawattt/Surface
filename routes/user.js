const express = require('express');
const {
    dashboard,
    follow,
    getProfile,
    unfollow,
    myFollowers
} = require('../controller/user');
const auth = require('../middleware/auth');
const router = new express.Router();

router.get('/dashboard/:page', auth, dashboard);
router.get('/dashboard', auth, dashboard);
router.get('/followers/:id', auth, myFollowers);
router.post('/follow/:username', auth, follow);
router.post('/unfollow/:username', auth, unfollow);
router.get('/profile/:id', getProfile);

module.exports = router;
