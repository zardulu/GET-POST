import React, { useState } from 'react';
import { Button, TextField, Grid } from '@mui/material';
import axios from 'axios';


const NewPostForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };
  
  // Post
  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post('https://get-post-backend.vercel.app/api/posts/', { title, content })
      .then((response) => {
        window.location.reload(); // Reloads on post
        console.log('Post created successfully:', response.data);
        
      })
      .catch((error) => {
        console.error('Error creating post:', error);
        
      });

    console.log('Title:', title);
    console.log('Content:', content);
  };

  return (
    <Grid container justifyContent="center" alignItems="center" style={{ height: '60vh' }}>
      <Grid item>
        
          <form onSubmit={handleSubmit}>
            <TextField
              id="post-title"
              label="Title"
              fullWidth
              value={title}
              onChange={handleTitleChange}
              variant="outlined"
              margin="normal"
              color="primary"
              focused
            />
            <TextField
              id="post-content"
              label="Content"
              fullWidth
              multiline
              rows={5}
              value={content}
              onChange={handleContentChange}
              variant="outlined"
              margin="normal"
              color= "primary"
              focused
            />
            <Button type="submit" variant="outlined" color="primary">
              Post
            </Button>
          </form>
        
      </Grid>
    </Grid>
  );
};

export default NewPostForm;
