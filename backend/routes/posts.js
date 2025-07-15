const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const Post = require('../models/post');
const Comment = require('../models/comment');
const app = express();
app.use(express.json()); // Add this line to enable JSON body parsing


router.get('/posts', async function(req, res, next) {
  try {
    const limit = 5;
    const page = req.query.page || 1;
    const skip = (page - 1) * limit;

    const postsWithCommentCount = await Post.aggregate([
      { $sort: { date: -1 } },
      { $skip: skip },
      { $limit: limit },
      {
        $lookup: {
          from: 'comments',
          localField: '_id',
          foreignField: 'parentPostID',
          as: 'comments',
        },
      },
      {
        $addFields: {
          commentCount: { $size: '$comments' },
        },
      },
      {
        $project: {
          comments: 0, 
        },
      },
    ]);

    res.json(postsWithCommentCount);
  } catch (error) {
    res.status(500).json({ error: error.message });
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
    const { title, content, category } = req.body;
    // Find the latest post to get its serialNumber
  const latestPost = await Post.findOne({}, {}, { sort: { serialNumber: -1 } });

  // Calculate the new serialNumber
  const newSerialNumber = latestPost ? latestPost.serialNumber + 1 : 1;

    const post = new Post({ title, content, category, serialNumber: newSerialNumber });
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
