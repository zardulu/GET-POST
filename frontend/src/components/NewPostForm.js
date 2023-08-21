import React, { useState } from 'react';
import { Button, TextField, Grid } from '@mui/material';
import axios from 'axios';
import config from '../config';
import ReCAPTCHA from "react-google-recaptcha";

const NewPostForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [verified, setVerified] = useState(false);
  

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleCaptcha = (event) => {
    setVerified(true);
  };
  
  const apiUrl =
      process.env.NODE_ENV === 'production'
        ? config.production.apiUrl
        : config.development.apiUrl;

  //Post
  const handleSubmit = async (event) => {
    event.preventDefault();
    setVerified(true);
    await axios
      .post(`${apiUrl}/posts`, { title, content })
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
            <div style={{ display: 'flex', direction:'row', alignItems: 'center' }}>
            <Button type="submit" variant="outlined" disabled={!verified} style={{color: '#39FF14', borderColor: '#39FF14', marginRight: '20px'}}>
              Post
            </Button>
            <ReCAPTCHA
            sitekey={process.env.REACT_APP_SITE_KEY} 
            onChange={handleCaptcha}
            style={{  }}
            theme='dark'
            />
            
            </div>
          </form>
        
      </Grid>
    </Grid>
  );
};

export default NewPostForm;
