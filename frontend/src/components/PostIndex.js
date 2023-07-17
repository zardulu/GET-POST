import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PostIndex = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get('/posts') 
      .then((response) => {
        setPosts([response.data]);
        console.log(response.data);})
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <h1>Posts</h1>
      
      {posts.map((post) => (
        <div key={post._id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
          <hr />
        </div>
      ))}
      
    </div>
  );
};

export default PostIndex;