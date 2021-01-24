const mongoose = require('mongoose');

const followerSchema = mongoose.Schema({
    follower: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    followee: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

const Follow = mongoose.model('Follow', followerSchema);
module.exports = Follow;
