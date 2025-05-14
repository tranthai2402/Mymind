import React, { useState } from 'react';
import {
  Button,
  TextField,
  Container,
  Paper,
  Typography,
  Box,
  CircularProgress,
  Alert
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Login.css'; // Đường dẫn đến file CSS của bạn
const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate inputs
    if (!username || !password) {
      setError('Please enter both username and password');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Mô phỏng API call - trong thực tế bạn sẽ gọi đến backend
      setTimeout(() => {
        // Demo credentials: user/password
        if (username === 'user' && password === 'password') {
          // Login thành công
          const fakeToken = 'fake-jwt-token-' + Math.random();
          const userData = {
            id: 1,
            username: 'user',
            name: 'Demo User'
          };
          
          login(fakeToken, userData);
          navigate('/users');
        } else {
          setError('Invalid username or password');
        }
        setLoading(false);
      }, 1000);
    } catch (err) {
      setError('An error occurred. Please try again.');
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" className='login-container'>
      <Paper elevation={3} sx={{ p: 4, mt: 3 }} className='login-paper'>
        <Typography variant="h4" gutterBottom align="center" className='login-title'>
          Login
        </Typography>
        
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        
        <Box component="form" onSubmit={handleSubmit} className='login-form'>
          <TextField
            label="Username"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          
          <Button
            className='login-button'
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={loading}
            sx={{ mt: 3 }}
          >
            {loading ? <CircularProgress size={24} /> : 'Login'}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;