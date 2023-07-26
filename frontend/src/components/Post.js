import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import axios from 'axios';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';


const Post = ({ postId }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get(`https://get-post-backend.vercel.app/api/posts/${postId}`) // Fetches post by ID
      .then(response => {
        setPosts(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [postId]);

  return(
    <Grid container justifyContent="center" alignItems="center" sx={{ marginTop:'10vh' }}>
      <Grid item xs={8}>
        <div style={{ marginBottom: '50px' }}>
          <div style={{ display: 'flex', alignItems: 'left' }}>
            <FormatQuoteIcon color="primary" sx={{ marginBottom: '50px', marginRight: '10px' }}  />
          
            <div>
              <h2 style={{ color:'#39FF14', textAlign:'left', marginLeft: '10px' }}>{posts.title}</h2>
              <p style={{ textAlign:'left', marginLeft: '10px' }} dangerouslySetInnerHTML={{__html: posts.content}} /> 
            </div>

          </div>
       </div>
     </Grid>
    </Grid>
  )}

  export default Post;