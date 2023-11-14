// PostPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from './supabaseClient';

function PostPage() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    async function fetchPost() {
      try {
        const { data, error } = await supabase
          .from("posts")
          .select("*")
          .eq("id", postId)
          .single();
        if (error) throw error;
        setPost(data);
      } catch (error) {
        alert(error.message);
      }
    }
    fetchPost();
  }, [postId]);

  const handleUpvote = async () => {
    try {
      const { data, error } = await supabase
        .from('posts')
        .update({ upvotes: post.upvotes + 1 })
        .eq('id', postId);

      if (error) throw error;
      setPost({ ...post, upvotes: post.upvotes + 1 });
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div>
      {post ? (
        <div>
          <h2>{post.title}</h2>
          <p>{new Date(post.created_at).toLocaleString()}</p>
          <p>Upvotes: {post.upvotes}</p>
          {post.imageUrl && <img src={post.imageUrl} alt="Post" />}
          <p>{post.content}</p>
          <button onClick={handleUpvote}>Upvote</button>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default PostPage;
