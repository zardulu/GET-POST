import React, { useState } from 'react';
import { Button, TextField, Grid, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import axios from 'axios';
import config from '../src/config';
import ReCAPTCHA from "react-google-recaptcha";

const NewCommentForm = ({ postId }) => {
  const [comment, setComment] = useState('');
  const [verified, setVerified] = useState(false);
  const theme = useTheme();

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleCaptcha = (event) => {
    setVerified(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const apiUrl =
      process.env.NODE_ENV === 'production'
        ? config.production.apiUrl
        : config.development.apiUrl;

    axios
      .post(`${apiUrl}/posts/${postId}/comments`, { content:comment })
      .then((response) => {
        window.location.reload();
        console.log('Comment created successfully:', response.data);
        
      })
      .catch((error) => {
        console.error('Error creating post:', error);
        
      });

    console.log('Comment:', comment);
  };

  return (
    <Grid container justifyContent="center" alignItems="center" style={{ marginTop:'10vh' }}>   
      <Grid item xs={10} sm={8} md={7} lg={6}>
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
            sx={{ mb: 2 }}
          />
          <div style={{ display: 'flex', direction:'row', alignItems: 'center' }}>
            <Button type="submit" variant="outlined" disabled={!verified} style={{color: verified ? '#39FF14': '#818181', borderColor: verified ? '#39FF14': '#818181', marginRight: '20px'}}>
              Comment
            </Button>
            <ReCAPTCHA
              sitekey={process.env.NEXT_PUBLIC_SITE_KEY || "6LfDkcMnAAAAAPA1u1pQ3CEEHa6SSMgwScrVAG-J"}
              onChange={handleCaptcha}
              theme='dark'
            />
          </div>
        </form>
      </Grid>
    </Grid>
  );
};

export default NewCommentForm;