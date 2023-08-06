import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Grid, Divider, Link, Button } from '@mui/material';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import NewPostForm from '../components/NewPostForm';
import { formatDistanceToNow } from 'date-fns'; 
import logo from '../assets/logo3.svg';
import config from '../config';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);

  // Fetches posts  
  useEffect(() => {

    // Determines API url based on environment
    const apiUrl =
      process.env.NODE_ENV === 'production'
        ? config.production.apiUrl
        : config.development.apiUrl;

    
    axios.get(`${apiUrl}/posts/?page=${page}`)
      .then(response => {
        if (page > 1) {
        setPosts((prevPosts) => [...prevPosts, ...response.data]); // Appends newly fetched posts to previously fetched 
        } else {
       setPosts(response.data);}}) // Avoids double page 1 fetches
      .catch(error => {
        console.log(error);
      });
    }, [page]);

  // Event handler for 'Load More' button
  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
    
  };
  
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

              <div style={{ display: 'flex', justifyContent: 'right' }}>
              <p style={{  fontStyle: 'italic', color: 'grey', marginRight: '20px' }}>- Anonymous</p>
              <p style={{  fontStyle: 'italic', color: 'grey' }}>{formatTimeDistance(post.date)}</p>
              </div>
              <Divider sx={{ bgcolor: "secondary.light" }} /> 

            </div>

          ))}
          
          {/*Load More */}
          <Grid container justifyContent='center' marginBottom='20px'>
            <Button startIcon={<AddIcon fontSize='large' />} sx={{ borderRadius: 10 }}
             variant='outlined' color='primary' onClick={handleLoadMore}>
              Load More
            </Button>
         </Grid>

        </Grid>
 
      </Grid>

    </div>
  );
};

export default Home;
