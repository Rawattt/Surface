const express = require('express');
const { userSignup, userSignin, userSignout } = require('../controller/auth');
const auth = require('../middleware/auth');

const router = new express.Router();

router.post('/signup', userSignup);
router.post('/signin', userSignin);
router.post('/signout', auth, userSignout);

module.exports = router;
