const HttpError = require('http-errors');
const errorHandler = require('../utils/errorHandler');

// @desc       Protection for the private route of normal user
// @redidrect  Home page
module.exports = async (req, res, next) => {
    try {
        if (!req.session.user_id) return res.json({ error: true });
        next();
    } catch (error) {
        errorHandler(res, error);
    }
};
