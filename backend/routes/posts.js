const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const Post = require('../models/post');
const Comment = require('../models/comment');


router.get('/posts', async function(req, res, next) {

  // Handles the API request
  try {
  const postList = await Post.find().sort({ date: -1 }); // Sort by newest
  console.log(postList);
  res.json(postList);
  } catch(error) {
    res.status(500).json({ error: error.message })
    console.log(error.message);
  }
});

// Fetches posts by ID
router.get('/posts/:id', async function(req, res, next) {
  
  const id = req.params.id; // Assigns :id value to id

  // Handles the API request
  try {
  const postById = await Post.findById(id); 
  console.log(postById);
  res.json(postById);
  } catch(error) {
    res.status(500).json({ error: error.message })
    console.log(error.message);
  }
});

// Fetches comments by post ID
router.get('/posts/:id/comments', async function(req, res, next) {
  
  const id = req.params.id;

  try {
  const parentPostID = new ObjectId(id); // Converts
  const commentById = await Comment.find({ parentPostID }).sort({ date: -1 }); 
  console.log(commentById);
  res.json(commentById);
  } catch(error) {
    res.status(500).json({ error: error.message })
    console.log(error.message);
  }
});

// Create a new post
router.post('/posts', async (req, res, next) => {
  try {
    const { title, content } = req.body;
    const post = new Post({ title, content });
    const newPost = await post.save();
    return res.status(201).json(newPost);
  } catch (err) {
    return res.status(500).json({ error: 'An error occurred while creating the post' });
  }
});

// Create a new comment
router.post('/posts/:id/comments', async (req, res, next) => {
  try {
    const id = req.params.id;
    const parentPostID   = new ObjectId(id);
    const { content } = req.body;
    const comment = new Comment({ parentPostID, content });
    const newComment = await comment.save();
    return res.status(201).json(newComment);
  } catch (err) {
    return res.status(500).json({ error: 'An error occurred while creating the post' });
  }
});






module.exports = router;
