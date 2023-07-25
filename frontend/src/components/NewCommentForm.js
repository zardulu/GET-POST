import React, { useState } from 'react';
import { Button, TextField, Grid } from '@mui/material';
import axios from 'axios';


const NewCommentForm = ({ postId }) => {
  const [comment, setComment] = useState('');


  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post(`http://localhost:5000/api/posts/${postId}/comments`, { content:comment }) // Sets 'comment' to request body
      .then((response) => {
        window.location.reload(); // Reloads on submit
        console.log('Comment created successfully:', response.data);
        
      })
      .catch((error) => {
        console.error('Error creating post:', error);
        
      });

    console.log('Comment:', comment);
  };

  return (
    
    <Grid container justifyContent="center" alignItems="center" style={{ marginTop: '10vh' }}>   
      <Grid item xs={5}>
        
      <form onSubmit={handleSubmit}>
            <TextField
              id="post-comment"
              label="Comment"
              fullWidth
              multiline
              rows={5}
              value={comment}
              onChange={handleCommentChange}
              variant="outlined"
              margin="normal"
              color= "primary"
              focused
            />
            <Button type="submit" variant="outlined" color="primary">
              Comment
            </Button>
          </form>
        
      </Grid>
    </Grid>
  );
};

export default NewCommentForm;
