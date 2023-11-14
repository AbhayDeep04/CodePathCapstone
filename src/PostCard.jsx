// PostCard.jsx
import React, { useState } from 'react';
import { Card, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { supabase } from './supabaseClient';
import "./PostCard.css";

function PostCard(props) {
  const post = props.post;

  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);
  const [imageUrl, setImageUrl] = useState(post.imageUrl);

  async function updatePost() {
    try {
      const { data, error } = await supabase
        .from('posts')
        .update({
          title: title,
          content: content,
          imageUrl: imageUrl,
        })
        .eq('id', post.id);

      if (error) throw error;
      window.location.reload();
    } catch (error) {
      alert(error.message);
    }
  }

  async function deletePost() {
    try {
      const { data, error } = await supabase
        .from('posts')
        .delete()
        .eq('id', post.id);

      if (error) throw error;
      window.location.reload();
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <div className="post-card-container"> 
      <Card className="card">
        <Card.Body className="card-body">
          {editing === false ? (
            <>
              <Card.Title className="card-title">{post.title}</Card.Title>
              <Card.Text className="card-text">{post.content}</Card.Text>
              {post.imageUrl && <img className="post-image" src={post.imageUrl} alt="Post" />}
              <p>Created At: {new Date(post.created_at).toLocaleString()}</p>
              <p>Upvotes: {post.upvotes}</p>
              <Link className="view-info-link" to={`/post/${post.id}`}>View Post</Link>
              <Button className="delete-button" onClick={() => deletePost()}>
                Delete Post
              </Button>
              <Button className="edit-button" onClick={() => setEditing(true)}>
                Edit Post
              </Button>
            </>
          ) : (
            <>
              <h4>Editing Post</h4>
              <Button size="sm" onClick={() => setEditing(false)}>
                Go Back
              </Button>
              <br />
              <Form.Label>Post Title</Form.Label>
              <Form.Control
                type="text"
                id="title"
                defaultValue={post.title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <Form.Label>Post Content</Form.Label>
              <Form.Control
                type="text"
                id="content"
                defaultValue={post.content}
                onChange={(e) => setContent(e.target.value)}
              />
              <Form.Label>Image URL (Optional)</Form.Label>
              <Form.Control
                type="text"
                id="imageUrl"
                defaultValue={post.imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
              />
              <br />
              <Button onClick={() => updatePost()}>Update Post</Button>
            </>
          )}
        </Card.Body>
      </Card>
    </div>
  );
}

export default PostCard;
