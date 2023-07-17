const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: { type: String, required: true},
    content: { type: String, required: false},
    date: { type: Date, default: Date.now},

});

const Post = mongoose.model('Post', postSchema, 'posts');

module.exports = Post;