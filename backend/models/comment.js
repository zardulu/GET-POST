const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    parentPostID: { type: Schema.Types.ObjectId, ref: 'Post', required: true }, // Parent post reference
    content: { type: String, required: true}, 
    date: { type: Date, default: Date.now},

});

const Comment = mongoose.model('Comment', commentSchema, 'comments');

module.exports = Comment;