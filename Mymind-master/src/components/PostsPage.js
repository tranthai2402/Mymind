import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Button, Fab } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import PostForm from './PostForm';
import Post from './Post';
import './PostsPage.css';

const PostsPage = () => {
  const [posts, setPosts] = useState([]);
  const [showForm, setShowForm] = useState(false);

  // Giả lập việc tải dữ liệu từ API
  useEffect(() => {
    // Thông thường bạn sẽ fetch từ API thực tế
    const mockPosts = [
      {
        id: 1,
        title: 'Example Post',
        content: 'Cristiano Ronaldo is GOAT.',
        image: 'https://assets.goal.com/v3/assets/bltcc7a7ffd2fbf71f5/blt32517b8dfe86bd3b/63a9ae48ee5a5b6210ee0f34/GOAL_-_Blank_WEB_-_Facebook_(524).jpg',
        author: {
          id: 1,
          name: 'Tran Thai',
          avatar: 'https://via.placeholder.com/40'
        },
        date: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
        comments: [
          {
            id: 101,
            text: 'Great post!',
            author: {
              id: 2,
              name: 'Leonel Messi',
              avatar: 'https://via.placeholder.com/40'
            },
            date: new Date(Date.now() - 43200000).toISOString() // 12 hours ago
          }
        ],
        reactions: {
          like: 5,
          love: 3,
          haha: 1,
          wow: 0,
          sad: 0,
          angry: 0
        }
      },
      {
        id: 2,
        title: 'Example Post 2',
        content: 'Hala Madrid!',
        image: null,
        author: {
          id: 3,
          name: 'Garnacho',
          avatar: 'https://via.placeholder.com/40'
        },
        date: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
        comments: [],
        reactions: {
          like: 2,
          love: 1,
          haha: 0,
          wow: 0,
          sad: 0,
          angry: 0
        }
      }
    ];
    
    setPosts(mockPosts);
  }, []);

  const handleAddPost = (newPost) => {
    setPosts([newPost, ...posts]);
    setShowForm(false);
  };

  const handleUpdatePost = (updatedPost) => {
    setPosts(posts.map(post => 
      post.id === updatedPost.id ? updatedPost : post
    ));
  };

  const handleDeletePost = (postId) => {
    setPosts(posts.filter(post => post.id !== postId));
  };

  return (
    <Container maxWidth="md" className="posts-container">
      <Box className="posts-header">
        <Typography variant="h5" component="h1">
          News Feed
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          startIcon={<AddIcon />}
          onClick={() => setShowForm(true)}
          className="desktop-add-button"
        >
          Create Post
        </Button>
        <Fab 
          color="primary" 
          aria-label="add" 
          className="mobile-add-button"
          onClick={() => setShowForm(true)}
        >
          <AddIcon />
        </Fab>
      </Box>
      
      {showForm && (
        <PostForm 
          onSubmit={handleAddPost} 
          onCancel={() => setShowForm(false)} 
        />
      )}
      
      <Box className="posts-list">
        {posts.length === 0 ? (
          <Typography variant="body1" className="no-posts">
            No posts yet. Be the first to share something!
          </Typography>
        ) : (
          posts.map((post) => (
            <Post 
              key={post.id} 
              post={post} 
              onUpdatePost={handleUpdatePost}
              onDeletePost={handleDeletePost}
            />
          ))
        )}
      </Box>
    </Container>
  );
};

export default PostsPage;