const express = require('express');
const { dashboard, follow, getProfile } = require('../controller/user');
const auth = require('../middleware/auth');
const router = new express.Router();

router.get('/dashboard', auth, dashboard);
router.post('/follow/:username', auth, follow);
router.get('/profile/:username', getProfile);

module.exports = router;
