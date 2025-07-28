import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Grid, Divider, Button, Typography, CircularProgress } from '@mui/material';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import NewPostForm from '../components/NewPostForm';
import { formatDistanceToNow } from 'date-fns';
import config from '../src/config';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetches posts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Determines API url based on environment
        const apiUrl =
          process.env.NODE_ENV === 'production'
            ? config.production.apiUrl
            : config.development.apiUrl;

        const response = await axios.get(`${apiUrl}/posts/?page=${page}`);
        
        if (page > 1) {
          setPosts((prevPosts) => [...prevPosts, ...response.data]); // Appends newly fetched posts to previously fetched
        } else {
          setPosts(response.data);
        }
      } catch (err) {
        console.error('Error fetching posts:', err);
        setError('Failed to load posts. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
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
  ];

  // Handle category filtering
  const handleFilter = (category) => {
    setSelectedCategory(category);
  };

  if (loading && page === 1) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress />
      </div>
    );
  }

  if (error && page === 1) {
    return (
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <Typography color="error">{error}</Typography>
        <Button onClick={() => window.location.reload()} sx={{ mt: 2 }}>
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div>
      <Link href="/home">
        <img
          src="/logo3.svg"
          alt="logo"
          style={{ width: '120px', height: '60px', margin: '15px' }}
        />
      </Link>
      <Grid>
        <NewPostForm /> {/* New post input form */}
      </Grid>

      <Grid container justifyContent="center" alignItems="center" marginTop="20px">
        <Grid item xs={10} sm={8} md={8} lg={6}>
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
          sx={{ marginBottom: '50px', color: 'primary.main' }}
        />
        <Link href={`/post/${post._id}`}>
          <Typography
            variant="h5"
            sx={{
              fontSize: '1em',
              marginLeft: '10px',
              color: 'white',
              '&:hover': {
                color: 'primary.main',
              },
            }}
          >
            {post.title}
          </Typography>
        </Link>

        {/* Display category as a pill if available */}
        {post.category && (
          <Typography
            sx={{
              display: 'flex',
              alignItems: 'center',
              marginLeft: '10px',
              padding: '2px 8px',
              borderRadius: '20px',
              backgroundColor: '#39FF14',
              color: 'black',
              fontSize: '0.7rem',
              '@media (max-width:600px)': {
                fontSize: '0.8rem',
              },
            }}
          >
            {post.category}
          </Typography>
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

        <div style={{ display: 'flex', alignItems: 'center', fontStyle: 'italic', color: 'white' }}>
          <CommentOutlinedIcon sx={{ marginRight: '5px', color: 'white' }} />
          <Link href={`/post/${post._id}`} style={{ color: 'white', textDecoration: 'none' }}>
            {post.commentCount}
          </Link>
        </div>
      </div>
      <Divider sx={{ bgcolor: 'secondary.light' }} />
    </div>
  ))}


          {/* Load More */}
          <Grid container justifyContent="center" marginBottom="20px">
            <Button
              startIcon={loading ? <CircularProgress size={20} /> : <AddIcon fontSize="large" />}
              sx={{ borderRadius: 10 }}
              variant="outlined"
              color="primary"
              onClick={handleLoadMore}
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Load More'}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;
