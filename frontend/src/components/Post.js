import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";




const PostComponent = () => {

  const params = useParams();  
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const loadPost = async () => {
      let results = await fetch(`http://localhost:5000/posts/${params.id}`).then(resp => resp.json());
      setPost(results);
    }

    loadPost();
  }, []);

  return(
    <div>
        <h2>{post.title}</h2>
        <p dangerouslySetInnerHTML={{__html: post.body}} />
    </div>
  )}

  export default PostComponent;