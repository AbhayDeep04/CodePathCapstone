// App.jsx
import React, { useState, useEffect } from 'react';
import { Navbar, Container, Form, Row, Col, Button } from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PostCard from './PostCard';
import PostPage from './PostPage';
import { supabase } from './supabaseClient';
import './App.css';

function App() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts();
  }, []);

  async function getPosts() {
    try {
      const { data, error } = await supabase.from('posts').select('*').order('created_at', { ascending: false }).limit(10);
      if (error) throw error;
      if (data != null) {
        setPosts(data);
      }
    } catch (error) {
      alert(error.message);
    }
  }

  async function createPost() {
    try {
      const { data, error } = await supabase
        .from('posts')
        .insert({
          title: title,
          content: content,
          imageUrl: imageUrl,
          upvotes: 0,
          created_at: new Date().toISOString(),
        })
        .single();

      if (error) throw error;
      setPosts([data, ...posts]);
    } catch (error) {
      alert(error.message);
    }
  }

  const sortPosts = async (sortBy) => {
    try {
      const { data, error } = await supabase.from('posts').select('*').order(sortBy, { ascending: false });
      if (error) throw error;
      setPosts(data);
    } catch (error) {
      alert(error.message);
    }
  };

  const searchPosts = async (searchTerm) => {
    try {
      const { data, error } = await supabase.from('posts').select('*').ilike('title', `%${searchTerm}%`);
      if (error) throw error;
      setPosts(data);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <Router>
      <Navbar>
        <Container>
          <Navbar.Brand>Abhay's Reddit</Navbar.Brand>
        </Container>
      </Navbar>
      <Container>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Row>
                  <Col xs={12} md={8}>
                    <h3>Create new Post</h3>
                    <Form.Label className="form-label">Post Title</Form.Label>
                    <Form.Control
                      type="text"
                      id="title"
                      className="form-control"
                      onChange={(e) => setTitle(e.target.value)}
                    />
                    <Form.Label className="form-label">Post Content</Form.Label>
                    <Form.Control
                      type="text"
                      id="content"
                      className="form-control"
                      onChange={(e) => setContent(e.target.value)}
                    />
                    <Form.Label className="form-label">Image URL (Optional)</Form.Label>
                    <Form.Control
                      type="text"
                      id="imageUrl"
                      className="form-control"
                      onChange={(e) => setImageUrl(e.target.value)}
                    />
                    <div className="button-container">
                      <Button className="create-button" onClick={() => createPost()}>
                        Create Post
                      </Button>
                    </div>
                  </Col>
                </Row>
                <hr />
                <Row>
                  <Col xs={12} md={8}>
                    <Button className="sort-button" onClick={() => sortPosts('created_at')}>
                      Sort by Created Time
                    </Button>
                    <Button className="sort-button" onClick={() => sortPosts('upvotes')}>
                      Sort by Upvotes
                    </Button>
                    <Form>
                      <Form.Label>Search by Title</Form.Label>
                      <Form.Control
                        type="text"
                        onChange={(e) => searchPosts(e.target.value)}
                      />
                    </Form>
                  </Col>
                </Row>
                <hr />
                <h3>Current Posts</h3>
                <Row xs={1} lg={3} className="g-4">
                  {posts.map((post) => (
                    <Col key={post.id}>
                      <PostCard post={post} className = "my-post"/>
                    </Col>
                  ))}
                </Row>
              </>
            }
          />
          <Route path="/post/:postId" element={<PostPage />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
