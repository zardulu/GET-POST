import React, { useEffect, useState } from 'react';
import { Grid, Divider } from '@mui/material';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import { formatDistanceToNow } from 'date-fns';
import config from '../src/config';
import { useTheme } from '@mui/material/styles';


const Comment = ({ postId }) => {
const [comments, setComments] = useState([]);
const theme = useTheme()


  useEffect(() => {

    const apiUrl =
      process.env.NODE_ENV === 'production'
        ? config.production.apiUrl
        : config.development.apiUrl;

    axios.get(`${apiUrl}/posts/${postId}/comments`)
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
              <FormatQuoteIcon sx={{ marginBottom: '50px', color: 'primary.main' }} />
              <Typography variant='h6' style={{ marginLeft: '10px' }} sx={{ fontSize: theme.breakpoints.down('lg') ? '1em' : theme.breakpoints.down('md') ? '1em' : theme.breakpoints.down('sm') ? '1em' : '1em' }}>{comment.content}</Typography>
            </div>
            <div style={{ display: 'flex', justifyContent: 'right' }}>
              <p style={{  fontStyle: 'italic', color: 'grey', marginRight: '20px' }}>- Anonymous</p>
              <p style={{  fontStyle: 'italic', color: 'grey' }}>{formatTimeDistance(comment.date)}</p>
            </div>
              <Divider sx={{ bgcolor: "secondary.light" }} />
            </div>
          ))}

        </Grid>
    </Grid>
  )}

  export default Comment;