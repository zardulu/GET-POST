import React, { useEffect, useState } from 'react';
import { Grid, Typography } from '@mui/material';
import axios from 'axios';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import config from '../config';


const Post = ({ postId }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {

    const apiUrl =
      process.env.NODE_ENV === 'production'
        ? config.production.apiUrl
        : config.development.apiUrl;

    axios.get(`${apiUrl}/posts/${postId}`) // Fetches post by ID
      .then(response => {
        setPosts(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [postId]);

  return(
    <Grid container justifyContent="center" alignItems="center" sx={{ marginTop:'10vh' }}>
      <Grid item xs={10} md={9} lg={8}>
        <div style={{ marginBottom: '50px' }}>
          <div style={{ display: 'flex', alignItems: 'left' }}>
          <Typography variant = 'h3' style={{ marginRight: '20px' }}>#{posts.serialNumber}</Typography>
            <FormatQuoteIcon color="primary" sx={{ marginBottom: '50px', marginRight: '10px' }}  />
          
            <div>
              <Typography variant = 'h4' style={{ color:'#39FF14', textAlign:'left', marginLeft: '10px', marginBottom: '10px' }}>{posts.title}</Typography>
              <Typography variant = 'subtitle1' style={{ textAlign:'left', marginLeft: '10px' }} dangerouslySetInnerHTML={{__html: posts.content}} /> 
            </div>

          </div>
       </div>
     </Grid>
    </Grid>
  )}

  export default Post;