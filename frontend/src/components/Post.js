import React, { useEffect, useState } from 'react';

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
    <div>
        <h2>{posts.title}</h2>
        <p dangerouslySetInnerHTML={{__html: posts.content}} />
    </div>
  )}

  export default Post;