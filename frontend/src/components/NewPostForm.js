import React, { useState } from 'react';
import { Button, TextField, Grid } from '@mui/material';


const NewPostForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Here, you can submit the title and content to your backend or perform other actions
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
