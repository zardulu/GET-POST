import React, { useEffect, useState } from 'react';
import { Button, TextField, Grid, Divider, Link } from '@mui/material';
import axios from 'axios';

const Post = ({ postId }) => {

   
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/posts/${postId}`)
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
    <div>
        <h2 style={{ color:'#39FF14' }}>{posts.title}</h2>
        <p dangerouslySetInnerHTML={{__html: posts.content}} />
    </div>
    </Grid>
    </Grid>
  )}

  export default Post;