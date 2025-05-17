import React, { useState } from 'react';
import {
  Button,
  TextField,
  Paper,
  Typography,
  Box,
  Grid,
  Avatar,
  FormLabel,
  IconButton
} from '@mui/material';
import { 
  Image as ImageIcon,
  Send as SendIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import './PostForm.css';

const PostForm = ({ onSubmit, onCancel }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const { currentUser } = useAuth();

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const selectedImage = e.target.files[0];
      setImage(selectedImage);
      
      // Tạo preview cho hình ảnh
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(selectedImage);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setImagePreview('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!title.trim() || !content.trim()) {
      return; // Không cho phép post rỗng
    }
    
    // Tạo đối tượng post mới
    const newPost = {
      id: Date.now(), // ID tạm thời
      title: title.trim(),
      content: content.trim(),
      image: imagePreview,
      author: {
        id: currentUser?.id || 0,
        name: currentUser?.name || 'Anonymous',
        avatar: currentUser?.avatar || 'https://via.placeholder.com/40'
      },
      date: new Date().toISOString(),
      comments: [],
      reactions: {
        like: 0,
        love: 0,
        haha: 0,
        wow: 0,
        sad: 0,
        angry: 0
      }
    };
    
    onSubmit(newPost);
    
    // Reset form
    setTitle('');
    setContent('');
    setImage(null);
    setImagePreview('');
  };

  return (
    <Paper className="post-form-paper" elevation={3}>
      <Typography variant="h6" gutterBottom className="post-form-title">
        Create a New Post
      </Typography>
      
      <Box component="form" onSubmit={handleSubmit} className="post-form">
        <Grid container spacing={2} alignItems="flex-start">
          <Grid item xs={12} sm={1}>
            <Avatar 
              src={currentUser?.avatar || 'https://via.placeholder.com/40'} 
              alt={currentUser?.name || 'User'} 
            />
          </Grid>
          <Grid item xs={12} sm={11}>
            <TextField
              label="Title"
              variant="outlined"
              fullWidth
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              margin="normal"
              required
            />
            
            <TextField
              label="What's on your mind?"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              margin="normal"
              required
              className="content-field"
            />
            
            {imagePreview && (
              <Box className="image-preview-container">
                <img 
                  src={imagePreview} 
                  alt="Preview" 
                  className="image-preview" 
                />
                <IconButton 
                  onClick={handleRemoveImage} 
                  className="remove-image-button"
                  color="error"
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            )}
            
            <Box className="form-actions">
              <Button 
                component="label" 
                startIcon={<ImageIcon />}
                className="upload-button"
              >
                Add Image
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleImageChange}
                />
              </Button>
              
              <Box sx={{ flexGrow: 1 }} />
              
              <Button 
                onClick={onCancel}
                color="inherit"
                className="cancel-button"
              >
                Cancel
              </Button>
              
              <Button 
                type="submit" 
                variant="contained" 
                color="primary"
                endIcon={<SendIcon />}
                className="submit-button"
                disabled={!title.trim() || !content.trim()}
              >
                Post
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default PostForm;