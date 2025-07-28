import React from 'react';
import { useRouter } from 'next/router';
import Post from '../../components/Post';
import NewCommentForm from '../../components/NewCommentForm';
import Comment from '../../components/Comment';
import Link from 'next/link';

const ViewPost = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div>
      <Link href="/">
        <img src="/logo3.svg" alt="logo" style={{ width: '120px', height: '60px', margin: '15px' }} />
      </Link>

      <Post postId={id} />
      <NewCommentForm postId={id} />
      <Comment postId={id} />
    </div>
  );
};

export default ViewPost;
