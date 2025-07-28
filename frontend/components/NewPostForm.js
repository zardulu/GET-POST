import React, { useState } from 'react';
import {
  Button,
  TextField,
  Grid,
  Select,
  MenuItem,
} from '@mui/material';
import axios from 'axios';
import config from '../src/config';
import ReCAPTCHA from 'react-google-recaptcha';

const NewPostForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [verified, setVerified] = useState(false);
  const [category, setCategory] = useState('');

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleCaptcha = (event) => {
    setVerified(true);
  };

  const apiUrl =
    process.env.NODE_ENV === 'production'
      ? config.production.apiUrl
      : config.development.apiUrl;
      
  console.log('Environment:', process.env.NODE_ENV);
  console.log('API URL:', apiUrl);
  console.log('Config:', config);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setVerified(true);

    await axios
      .post(`${apiUrl}/posts`, { title, content, category })
      .then((response) => {
        window.location.reload();
        console.log('Post created successfully:', response.data);
      })
      .catch((error) => {
        console.error('Error creating post:', error);
      });

    console.log('Title:', title);
    console.log('Content:', content);
    console.log('Category:', category);
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ minHeight: '50vh', padding: '1em' }}
    >
      <Grid item xs={10} sm={7} md={5} lg={3} xl={3}>
        <form onSubmit={handleSubmit}>
        <Select
  size="small"
  value={category}
  onChange={handleCategoryChange}
  variant="outlined"
  style={{ marginRight: '20px', minWidth: '120px', marginBottom: '16px' }}
  MenuProps={{
    PaperProps: {
      style: {
        backgroundColor: 'black',
        color: 'white',
      },
    },
  }}
>
  <MenuItem value="All">All</MenuItem>
  <MenuItem value="Misc">Misc</MenuItem>
  <MenuItem value="News">News</MenuItem>
  <MenuItem value="Science & Technology">Science & Technology</MenuItem>
  <MenuItem value="Politics">Politics</MenuItem>
  <MenuItem value="Meme">Meme</MenuItem>
</Select>

          <TextField
            id="post-title"
            label="Title"
            fullWidth
            value={title}
            onChange={handleTitleChange}
            variant="outlined"
            sx={{ mb: 2 }}
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
            sx={{ mb: 2 }}
          />

          <div
            style={{
              display: 'flex',
              direction: 'row',
              alignItems: 'center',
              marginBottom: '20px',
            }}
          >
            <Button
              type="submit"
              variant="outlined"
              disabled={!verified}
              style={{
                color: verified ? '#39FF14' : '#818181',
                borderColor: verified ? '#39FF14' : '#818181',
                marginRight: '1vw'
              }}
            >
              Post
            </Button>
            <ReCAPTCHA
              sitekey={process.env.NEXT_PUBLIC_SITE_KEY || "6LfDkcMnAAAAAPA1u1pQ3CEEHa6SSMgwScrVAG-J"}
              onChange={handleCaptcha}
              style={{}}
              theme="dark"
            />
          </div>
        </form>
      </Grid>
    </Grid>
  );
};

export default NewPostForm;