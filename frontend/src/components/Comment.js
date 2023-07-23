import React, { useEffect, useState } from 'react';
import { Button, TextField, Grid, Divider, Link } from '@mui/material';
import axios from 'axios';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import { formatDistanceToNow } from 'date-fns';

const Comment = ({ postId }) => {

   
  const [comments, setComments] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/posts/${postId}/comments`)
      .then(response => {
        setComments(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [postId]);

  const formatTimeDistance = (date) => {
    return formatDistanceToNow(new Date(date), { addSuffix: true });
  };

  return(
    <Grid container justifyContent="center" alignItems="center" sx={{ marginTop:'10vh' }}>
      <Grid item xs={6} >
          
          {comments.map(comment => (
            <div key={comment._id} style={{ marginBottom: '50px' }}>
              <div style={{ display: 'flex', alignItems: 'left' }}>
              <FormatQuoteIcon color="primary" sx={{ marginBottom: '50px' }} />
              <h3 style={{ marginLeft: '10px' }}>{comment.content}</h3>
            </div>
              <p style={{ textAlign:'right', fontStyle: 'italic', color: 'grey' }}>{formatTimeDistance(comment.date)}</p>
              <Divider sx={{ bgcolor: "secondary.light" }} />
            </div>
          ))}
        </Grid>
    </Grid>
  )}

  export default Comment;