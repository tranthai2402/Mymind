import React, { useState } from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  CardMedia,
  Avatar,
  Typography,
  IconButton,
  TextField,
  Button,
  Box,
  Divider,
  Menu,
  MenuItem,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText
} from '@mui/material';
import {
  FavoriteBorder,
  Favorite,
  Comment as CommentIcon,
  Send as SendIcon,
  MoreVert as MoreVertIcon,
  ThumbUp,
  EmojiEmotions,
  Mood,
  SentimentVeryDissatisfied,
  SentimentDissatisfied
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import './Post.css';

const Post = ({ post, onUpdatePost, onDeletePost }) => {
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [reactionMenuAnchor, setReactionMenuAnchor] = useState(null);
  const { currentUser } = useAuth();

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    handleMenuClose();
    onDeletePost(post.id);
  };

  const handleReactionClick = (event) => {
    setReactionMenuAnchor(event.currentTarget);
  };

  const handleReactionClose = () => {
    setReactionMenuAnchor(null);
  };

  const handleReaction = (type) => {
    const updatedPost = {
      ...post,
      reactions: {
        ...post.reactions,
        [type]: post.reactions[type] + 1
      }
    };
    onUpdatePost(updatedPost);
    handleReactionClose();
  };

  const handleAddComment = () => {
    if (!newComment.trim()) return;

    const comment = {
      id: Date.now(),
      text: newComment.trim(),
      author: {
        id: currentUser?.id || 0,
        name: currentUser?.name || 'Anonymous',
        avatar: currentUser?.avatar || 'https://via.placeholder.com/40'
      },
      date: new Date().toISOString()
    };

    const updatedPost = {
      ...post,
      comments: [...post.comments, comment]
    };

    onUpdatePost(updatedPost);
    setNewComment('');
  };

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  const totalReactions = Object.values(post.reactions).reduce((sum, count) => sum + count, 0);

  // Format date
  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <Card className="post-card">
      <CardHeader
        avatar={
          <Avatar 
            src={post.author.avatar}
            alt={post.author.name}
          />
        }
        action={
          <IconButton aria-label="settings" onClick={handleMenuOpen}>
            <MoreVertIcon />
          </IconButton>
        }
        title={post.author.name}
        subheader={formattedDate}
      />
      
      <Menu
        id="post-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
      </Menu>
      
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {post.title}
        </Typography>
        
        <Typography variant="body1" component="p">
          {post.content}
        </Typography>
      </CardContent>
      
      {post.image && (
        <CardMedia
          component="img"
          image={post.image}
          alt={post.title}
          className="post-image"
        />
      )}
      
      {totalReactions > 0 && (
        <Box className="reactions-summary">
          <Box className="reaction-icons">
            <ThumbUp color="primary" fontSize="small" />
            <Favorite color="secondary" fontSize="small" />
            <EmojiEmotions style={{ color: '#FFD700' }} fontSize="small" />
          </Box>
          <Typography variant="body2">
            {totalReactions} {totalReactions === 1 ? 'reaction' : 'reactions'}
          </Typography>
        </Box>
      )}
      
      <Divider />
      
      <CardActions className="post-actions">
        <IconButton 
          aria-label="react" 
          color={totalReactions > 0 ? "primary" : "default"}
          onClick={handleReactionClick}
        >
          {totalReactions > 0 ? <Favorite /> : <FavoriteBorder />}
        </IconButton>
        
        <IconButton aria-label="comment" onClick={toggleComments}>
          <CommentIcon />
        </IconButton>
        
        <Typography variant="body2" color="textSecondary">
          {post.comments.length} {post.comments.length === 1 ? 'comment' : 'comments'}
        </Typography>
      </CardActions>
      
      <Menu
        id="reaction-menu"
        anchorEl={reactionMenuAnchor}
        open={Boolean(reactionMenuAnchor)}
        onClose={handleReactionClose}
        className="reaction-menu"
      >
        <MenuItem onClick={() => handleReaction('like')}>
          <ThumbUp color="primary" /> Like
        </MenuItem>
        <MenuItem onClick={() => handleReaction('love')}>
          <Favorite color="secondary" /> Love
        </MenuItem>
        <MenuItem onClick={() => handleReaction('haha')}>
          <EmojiEmotions style={{ color: '#FFD700' }} /> Haha
        </MenuItem>
        <MenuItem onClick={() => handleReaction('wow')}>
          <Mood style={{ color: '#FFD700' }} /> Wow
        </MenuItem>
        <MenuItem onClick={() => handleReaction('sad')}>
          <SentimentDissatisfied style={{ color: '#FFD700' }} /> Sad
        </MenuItem>
        <MenuItem onClick={() => handleReaction('angry')}>
          <SentimentVeryDissatisfied style={{ color: '#FF0000' }} /> Angry
        </MenuItem>
      </Menu>
      
      {showComments && (
        <Box className="comments-section">
          <Divider />
          
          <List className="comments-list">
            {post.comments.map((comment) => (
              <ListItem key={comment.id} alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar src={comment.author.avatar} alt={comment.author.name} />
                </ListItemAvatar>
                <ListItemText
                  primary={comment.author.name}
                  secondary={
                    <>
                      <Typography
                        component="span"
                        variant="body2"
                        color="textPrimary"
                      >
                        {comment.text}
                      </Typography>
                      <Typography variant="caption" display="block" color="textSecondary">
                        {new Date(comment.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </Typography>
                    </>
                  }
                />
              </ListItem>
            ))}
          </List>
          
          <Box className="add-comment">
            <Avatar 
              src={currentUser?.avatar || 'https://via.placeholder.com/40'} 
              alt={currentUser?.name || 'User'} 
              className="comment-avatar"
            />
            <TextField
              variant="outlined"
              size="small"
              placeholder="Write a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              fullWidth
              InputProps={{
                endAdornment: (
                  <IconButton 
                    size="small" 
                    color="primary" 
                    disabled={!newComment.trim()}
                    onClick={handleAddComment}
                  >
                    <SendIcon />
                  </IconButton>
                )
              }}
            />
          </Box>
        </Box>
      )}
    </Card>
  );
};

export default Post;