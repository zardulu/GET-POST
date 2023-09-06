const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    
    title: { type: String, required: true },
    content: { type: String, required: true },
    date: { type: Date, default: Date.now },
    serialNumber: { type: Number, required: true },

    
});

const Post = mongoose.model('Post', postSchema,'posts');

module.exports = Post;