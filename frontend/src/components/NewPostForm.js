import React, { useState } from 'react';
import {
  Button,
  TextField,
  ThemeProvider,
  Grid,
  Select,
  MenuItem,
} from '@mui/material';
import axios from 'axios';
import config from '../config';
import ReCAPTCHA from 'react-google-recaptcha';
import theme from '../theme';

const NewPostForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [verified, setVerified] = useState(false);
  const [category, setCategory] = useState(''); // Default category

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

  // Post
  const handleSubmit = async (event) => {
    event.preventDefault();
    setVerified(true);

    await axios
      .post(`${apiUrl}/posts`, { title, content, category }) // Include the selected category in the post request
      .then((response) => {
        window.location.reload(); // Reloads on post
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
  sx={{
    fieldset: { borderColor: '#8d8d8d' },
    '& .MuiSelect-icon': {
      color: '#8d8d8d', // Change the arrow color
    },
  }}
  label="Category"
  size="small"
  value={category}
  onChange={handleCategoryChange}
  variant="outlined"
  color="primary"
  margin="normal"
  style={{ marginRight: '20px', minWidth: '120px' }}
  MenuProps={{
    PaperProps: {
      style: {
        backgroundColor: 'black', // Change the background color of the dropdown menu
        color: 'white', // Change the text color of the dropdown menu
      },
    },
  }}
>
  
  {/* Define your categories */}
  {[
    'Misc',
    'News',
    'Science & Technology',
    'Politics',
    'Meme',
    'Pop Culture',
  ].map((category) => (
    <MenuItem key={category} value={category}>
      {category}
    </MenuItem>
  ))}
</Select>


          <TextField
            sx={{
              fieldset: { borderColor: '#8d8d8d' },
            }}
            id="post-title"
            label="Title"
            fullWidth
            value={title}
            onChange={handleTitleChange}
            variant="outlined"
            margin="normal"
            color="primary"
          />
          <ThemeProvider theme={theme}>
            <TextField
              sx={{
                fieldset: { borderColor: '#8d8d8d' },
              }}
              id="post-content"
              label="Content"
              fullWidth
              multiline
              rows={5}
              value={content}
              onChange={handleContentChange}
              variant="outlined"
              margin="normal"
              color="primary"
            />
          </ThemeProvider>
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
              sitekey="6LfDkcMnAAAAAPA1u1pQ3CEEHa6SSMgwScrVAG-J"
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
