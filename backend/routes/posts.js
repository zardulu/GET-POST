const express = require('express');
const router = express.Router();
const Post = require('../models/post');

router.get('/', async function(req, res, next) {
  // Handle the API request
  try {
  const post = await Post.find({}); 
  console.log(post);
  res.json(post);
  } catch(e) {
    console.log(e.message);
  }
});




module.exports = router;
