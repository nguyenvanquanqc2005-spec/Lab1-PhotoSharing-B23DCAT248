import React from 'react';
import { AppBar, Box, Container, Toolbar, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';
import models from '../../modelData/models';
import './styles.css';

function TopBar() {
  const { pathname } = useLocation();
  const match = pathname.match(/^\/(users|photos)\/([^/]+)\/?$/);
  let context = 'Danh sách người dùng';

  if (match) {
    const section = match[1];
    const userId = decodeURIComponent(match[2]);
    const user = models.userModel(userId);
    const fullName = user
      ? `${user.first_name} ${user.last_name}`
      : 'Không tìm thấy người dùng';
    context = section === 'photos' ? `Photos of ${fullName}` : fullName;
  }

  return (
    <AppBar position="static" className="topbar-appbar" elevation={0}>
      <Container maxWidth="xl">
        <Toolbar disableGutters className="topbar-toolbar">
          <Box>
            <Typography variant="h6" component="div" fontWeight={700}>
              Nguyễn Văn Quân
            </Typography>
            <Typography variant="caption" sx={{ opacity: 0.9 }}>
              B23DCAT248 · Lab 1 – Photo Sharing
            </Typography>
          </Box>
          <Typography variant="subtitle1" className="topbar-context">
            {context}
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default TopBar;
