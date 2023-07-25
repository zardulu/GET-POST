import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Grid, Divider, Link } from '@mui/material';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import axios from 'axios';
import NewPostForm from '../components/NewPostForm';
import { formatDistanceToNow } from 'date-fns'; 
import logo from '../assets/logo3.svg';


const Home = () => {
  const [posts, setPosts] = useState([]);

  // Fetches posts  
  useEffect(() => {
    axios.get('http://localhost:5000/api/posts/')
      .then(response => {
        setPosts(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);
  
  // Converts to more readable date format
  const formatTimeDistance = (date) => {
    return formatDistanceToNow(new Date(date), { addSuffix: true });
  };

  return (
    <div>  
      
      <img src={logo} alt='logo' style={{ width: '120px', height: '60px', margin: '15px' }}/> {/* Logo */}
      <NewPostForm /> { /* New post input form */}

      <Grid container justifyContent="center" alignItems="center">
        <Grid item xs={6} >
          
          {/* Maps posts to title links */}
          {posts.map(post => (
            <div key={post._id} style={{ marginBottom: '50px' }}>

              <div style={{ display: 'flex', alignItems: 'left' }}>
              
              <FormatQuoteIcon color="primary" sx={{ marginBottom: '50px' }} /> {/* bullet point icon */}

                <Link component={RouterLink} to={`/post/${post._id}`} sx={{ textDecoration:'none', color: 'white', '&:hover': {
                color: '#39FF14'} }}>
                  <h3 style={{ marginLeft: '10px' }}>{post.title}</h3>
                </Link>

              </div>

              <p style={{ textAlign:'right', fontStyle: 'italic', color: 'grey' }}>{formatTimeDistance(post.date)}</p>
              <Divider sx={{ bgcolor: "secondary.light" }} /> 
            </div>

          ))}
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;
