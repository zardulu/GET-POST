import React, { useState } from 'react';
import { Button, TextField, Grid } from '@mui/material';


const NewCommentForm = () => {
  const [comment, setComment] = useState('');


  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Here, you can submit the title and content to your backend or perform other actions

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
