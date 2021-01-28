const mongoose = require('mongoose');
// User schema
const postSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title cannot be empty'],
        maxlength: [20, 'Title cannot be more than 20 characters']
    },
    body: {
        type: String,
        required: [true, 'Post body cannot be empty'],
        maxlength: [100, 'Post body cannot be more than 30 characters']
    },
    imageUrl: {
        type: String
    },
    datetime: {
        type: Date,
        default: new Date()
    },
    owner: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    username: {
        type: String,
        required: true,
        ref: 'User'
    },
    likes: {
        type: Array,
        default: []
    }
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;
