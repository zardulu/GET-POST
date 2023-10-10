import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Grid, Divider, Link, Button, Typography } from '@mui/material';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import NewPostForm from '../components/NewPostForm';
import { formatDistanceToNow } from 'date-fns';
import logo from '../assets/logo3.svg';
import config from '../config';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Fetches posts
  useEffect(() => {
    // Determines API url based on environment
    const apiUrl =
      process.env.NODE_ENV === 'production'
        ? config.production.apiUrl
        : config.development.apiUrl;

    axios
      .get(`${apiUrl}/posts/?page=${page}`)
      .then((response) => {
        if (page > 1) {
          setPosts((prevPosts) => [...prevPosts, ...response.data]); // Appends newly fetched posts to previously fetched
        } else {
          setPosts(response.data);
        }
      }) // Avoids double page 1 fetches
      .catch((error) => {
        console.log(error);
      });
  }, [page]);

  // Event handler for 'Load More' button
  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  // Converts to a more readable date format
  const formatTimeDistance = (date) => {
    return formatDistanceToNow(new Date(date), { addSuffix: true });
  };

  // Define your categories
  const categories = [
    'All', // Added "All" category
    'Misc',
    'News',
    'Science & Technology',
    'Politics',
    'Meme',
    'Pop Culture',
  ];

  // Handle category filtering
  const handleFilter = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div>
      <Link component={RouterLink} to="/home">
        <img
          src={logo}
          alt="logo"
          style={{ width: '120px', height: '60px', margin: '15px' }}
        />
      </Link>
      <Grid>
        <NewPostForm /> {/* New post input form */}
      </Grid>

      <Grid container justifyContent="center" alignItems="center" marginTop="20px">
        <Grid item xs={8} sm={8} md={8} lg={6}>
          {/* Filter buttons */}
          <div className="filter-buttons" style={{ marginBottom: '5vh' }} >
            {categories.map((category) => (
               <Button
               key={category}
               onClick={() => handleFilter(category)}
               style={{
                 color: 'white',
                 border: 'none',
                 textTransform: 'none',
                 fontWeight: 'normal',
                 padding: '4px 8px',
                 margin: '0 15px 8px',
                 borderBottom: category === selectedCategory ? '2px solid #39ff14' : '2px solid transparent',
                 transition: 'all 0.3s ease',
               }}
             >
               {category}
             </Button>
            ))}
          </div>

          {/* Maps posts to title links */}
          {posts
  .filter(
    (post) =>
      selectedCategory === 'All' || post.category === selectedCategory
  )
  .map((post) => (
    <div key={post._id} style={{ marginBottom: '50px' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Typography
          variant="h4"
          style={{
            marginRight: '20px',
            width: '45px',
            fontWeight: 'bold',
          }}
        >
          #{post.serialNumber}
        </Typography>

        <FormatQuoteIcon
          color="primary"
          sx={{ marginBottom: '50px' }}
        />{' '}
        {/* bullet point icon */}
        <Link
          component={RouterLink}
          to={`/post/${post._id}`}
          sx={{
            textDecoration: 'none',
            color: 'white',
            '&:hover': {
              color: '#39FF14',
            },
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontSize: '1em',
              marginLeft: '10px',
            }}
          >
            {post.title}
          </Typography>
        </Link>

        {/* Display category as a pill if available */}
        {post.category && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginLeft: '10px',
              padding: '2px 8px', // Adjust padding to your liking
              borderRadius: '20px', // Makes it pill-shaped
              backgroundColor: '#39FF14', // Green background color
              color: 'black', // Text color
            }}
          >
            {post.category}
          </div>
        )}
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'right',
          marginBottom: '10px',
        }}
      >
        <Typography
          variant="subtitle1"
          sx={{
            fontStyle: 'italic',
            color: 'grey',
            marginRight: '20px',
          }}
        >
          - Anonymous
        </Typography>
        <Typography
          variant="subtitle1"
          style={{
            fontStyle: 'italic',
            color: 'grey',
            marginRight: '20px',
          }}
          sx={{
            fontSize: '1em',
            fontStyle: 'italic',
            color: 'grey',
            marginRight: '20px',
          }}
        >
          {formatTimeDistance(post.date)}
        </Typography>

        <Link
          component={RouterLink}
          to={`/post/${post._id}`}
          sx={{
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            fontStyle: 'italic',
            color: 'white',
            '&:hover': {
              color: '#39FF14',
            },
          }}
        >
          <CommentOutlinedIcon sx={{ marginRight: '5px' }} />
          {post.commentCount}
        </Link>
      </div>
      <Divider sx={{ bgcolor: 'secondary.light' }} />
    </div>
  ))}


          {/* Load More */}
          <Grid container justifyContent="center" marginBottom="20px">
            <Button
              startIcon={<AddIcon fontSize="large" />}
              sx={{ borderRadius: 10 }}
              variant="outlined"
              color="primary"
              onClick={handleLoadMore}
            >
              Load More
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;
