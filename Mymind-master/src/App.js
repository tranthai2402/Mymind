import './App.css';

import React from "react";
import { Grid, Paper, Typography } from "@mui/material";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { styled } from '@mui/material/styles';
import TopBar from "./components/TopBar";
import UserDetail from "./components/UserDetail";
import UserList from "./components/UserList";
import UserPhotos from "./components/UserPhotos";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./contexts/AuthContext";
import './App.css';
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