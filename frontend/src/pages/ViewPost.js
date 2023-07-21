import React from 'react';
import { useParams } from 'react-router-dom';
import Post from '../components/Post';


const ViewPost = () => {
  const { id } = useParams(); // Get the id from the URL parameter

  return (
    <div>
      {/* Render the Post component and pass the id as a prop */}
      <Post postId={id} />

    </div>
  );
};

export default ViewPost;