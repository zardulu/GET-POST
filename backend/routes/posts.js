const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const Post = require('../models/post');
const Comment = require('../models/comment');


router.get('/posts', async function(req, res, next) {
  // Handle the API request
  try {
  const postList = await Post.find({}); 
  console.log(postList);
  res.json(postList);
  } catch(error) {
    res.status(500).json({ error: error.message })
    console.log(error.message);
  }
});

router.get('/posts/:id', async function(req, res, next) {
  
  const id = req.params.id;
  // Handle the API request
  try {
  const postById = await Post.findById(id); 
  console.log(postById);
  res.json(postById);
  } catch(error) {
    res.status(500).json({ error: error.message })
    console.log(error.message);
  }
});

router.get('/posts/:id/comments', async function(req, res, next) {
  
  const id = req.params.id;
  // Handle the API request
  try {
  const parentPostID = new ObjectId(id);
  const commentById = await Comment.find({ parentPostID }); 
  console.log(commentById);
  res.json(commentById);
  } catch(error) {
    res.status(500).json({ error: error.message })
    console.log(error.message);
  }
});






module.exports = router;
