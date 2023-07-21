const express = require('express');
const router = express.Router();
const Post = require('../models/post');

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






module.exports = router;
