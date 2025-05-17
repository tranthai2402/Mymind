import './App.css';

import React from "react";
import { Container, Grid, Paper, Typography } from "@mui/material";
import { styled } from '@mui/material/styles';
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from "react-router-dom";
import TopBar from "./components/TopBar";
import UserDetail from "./components/UserDetail";
import UserList from "./components/UserList";
import UserPhotos from "./components/UserPhotos";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./contexts/AuthContext";
import PostsPage from './components/PostsPage';
import PostForm from './components/PostForm';
import './App.css';

const NewPostRoute = () => {
  const navigate = useNavigate();
  
  return (
    <Container maxWidth="md" sx={{ pt: 3, pb: 3 }}>
      <Typography variant="h5" gutterBottom>
        Create New Post
      </Typography>
      <PostForm 
        onSubmit={(post) => {
          // Xử lý submit post
          navigate('/posts');
        }}
        onCancel={() => navigate('/posts')}
      />
    </Container>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TopBar />
            </Grid>
            <div className="main-topbar-buffer" />
            
            <Routes>
              {/* Public route */}
              <Route path="/login" element={<Login />} />
              
              {/* Protected routes */}
              <Route element={<ProtectedRoute />}>
                <Route path="/" element={
                  <Grid container spacing={2}>
                    <Grid item sm={3}>
                      <Paper className="main-grid-item">
                        <UserList />
                      </Paper>
                    </Grid>
                    <Grid item sm={9}>
                      <Paper className="main-grid-item">
                        <Typography variant="h5">
                          Select a user from the list
                        </Typography>
                      </Paper>
                    </Grid>
                  </Grid>
                } />
                
                <Route path="/users" element={
                  <Grid container spacing={2}>
                    <Grid item sm={3}>
                      <Paper className="main-grid-item">
                        <UserList />
                      </Paper>
                    </Grid>
                    <Grid item sm={9}>
                      <Paper className="main-grid-item">
                        <Typography variant="h5">
                          Select a user from the list
                        </Typography>
                      </Paper>
                    </Grid>
                  </Grid>
                } />
                
                <Route path="/users/:userId" element={
                  <Grid container spacing={2}>
                    <Grid item sm={3}>
                      <Paper className="main-grid-item">
                        <UserList />
                      </Paper>
                    </Grid>
                    <Grid item sm={9}>
                      <Paper className="main-grid-item">
                        <UserDetail />
                      </Paper>
                    </Grid>
                  </Grid>
                } />
                
                <Route path="/photos/:userId" element={
                  <Grid container spacing={2}>
                    <Grid item sm={3}>
                      <Paper className="main-grid-item">
                        <UserList />
                      </Paper>
                    </Grid>
                    <Grid item sm={9}>
                      <Paper className="main-grid-item">
                        <UserPhotos />
                      </Paper>
                    </Grid>
                  </Grid>
                } />
                
                {/* New Post Routes */}
                <Route path="/posts" element={<PostsPage />} />
                
                <Route path="/posts/new" element={<NewPostRoute />} />
              </Route>
              
              {/* Default redirect */}
              <Route path="*" element={<Navigate to="/users" />} />
            </Routes>
          </Grid>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;