import React from 'react';
import { Box, Container, Grid, Paper } from '@mui/material';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import TopBar from './components/TopBar';
import UserList from './components/UserList';
import UserDetail from './components/UserDetail';
import UserPhotos from './components/UserPhotos';
import './App.css';

// Main master-detail layout: a user list on the left, selected content on the right.
function App() {
  return (
    <BrowserRouter>
      <TopBar />
      <Container maxWidth="xl" className="app-container">
        <Grid container spacing={2.5} alignItems="flex-start">
          <Grid item xs={12} md={4} lg={3}>
            <Paper elevation={0} className="sidebar-panel">
              <UserList sidebar />
            </Paper>
          </Grid>
          <Grid item xs={12} md={8} lg={9}>
            <Paper elevation={0} className="content-panel">
              <Routes>
                <Route path="/" element={<Navigate to="/users" replace />} />
                <Route path="/users" element={<UserList />} />
                <Route path="/users/:userId" element={<UserDetail />} />
                <Route path="/photos/:userId" element={<UserPhotos />} />
                <Route path="*" element={<Navigate to="/users" replace />} />
              </Routes>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </BrowserRouter>
  );
}

export default App;
