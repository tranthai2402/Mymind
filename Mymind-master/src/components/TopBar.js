import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './TopBar.css';

const TopBar = () => {
  const { isAuthenticated, currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <AppBar position="fixed" className="topbar">
    
      <Toolbar className="toolbar-container">
        <Typography 
          variant="h6" 
          component={Link} 
          to="/" 
          className="topbar-title"
        >
          User Management App
        </Typography>
        
        <Box>
          {isAuthenticated ? (
            <>
              <Button 
                color="inherit" 
                component={Link} 
                to="/users" 
                className="topbar-button"
              >
                Users
              </Button>
              
              <Button
                variant="body1" 
                component="span" 
                className="topbar-button"
              >
                {currentUser?.name || 'User'}
              </Button>
              
              <Button 
                color="inherit" 
                onClick={handleLogout} 
                className="topbar-button"
              >
                Logout
              </Button>
            </>
          ) : (
            <Button 
              color="inherit" 
              component={Link} 
              to="/login" 
              className="topbar-button"
            >
              Login
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;