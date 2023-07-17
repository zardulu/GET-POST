const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    content: { type: String, required: true},
    parent: { Schema.types.ObjectId, ref: 'Comment', default:null },
    children: [{ Schema.types.ObjectId, ref: 'Comment' }],
    date: { type: Date, default: Date.now},

});

const Comment = mongoose.model('Comment', postSchema);

module.exports = Comment;