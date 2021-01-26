const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    from: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    fromUsername: { type: String, required: true },
    post: {
        type: mongoose.Types.ObjectId,
        ref: 'Post',
        required: true
    },
    body: {
        type: String,
        required: [true, 'Please enter the comment']
    },
    datetime: {
        type: Date,
        default: new Date()
    }
});

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;
