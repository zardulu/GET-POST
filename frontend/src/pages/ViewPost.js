import React from 'react';
import { useParams } from 'react-router-dom';
import Post from '../components/Post';
import NewCommentForm from '../components/NewCommentForm';
import Comment from '../components/Comment';
import logo from '../assets/logo3.svg';
import { Link } from 'react-router-dom';


const ViewPost = () => {
  const { id } = useParams(); // Get the id from the URL parameter

  return (
    <div>
      <Link to='/Home'>
      <img src={logo} alt='logo' style={{ width: '120px', height: '60px', margin: '15px' }}/>
      </Link>

      {/* Render Post component and pass the id as prop */}
      <Post postId={id} />
      <NewCommentForm postId={id} />
      <Comment postId={id} />
    </div>
  );
};

export default ViewPost;