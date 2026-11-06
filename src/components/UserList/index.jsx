import React from 'react';
import {
  Avatar,
  Box,
  Divider,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import models from '../../modelData/models';
import './styles.css';

function UserList({ sidebar = false }) {
  // Problem 1: read data DIRECTLY from the local fake model, not an API.
  const users = models.userListModel();
  const { pathname } = useLocation();
  const heading = sidebar ? 'Người dùng' : 'Danh sách người dùng';

  return (
    <Box>
      <Box className="users-heading">
        <Typography variant={sidebar ? 'h6' : 'h5'} fontWeight={700}>
          {heading}
        </Typography>
        {!sidebar && (
          <Typography color="text.secondary" sx={{ mt: 1 }}>
            Chọn một người dùng để xem thông tin và các ảnh đã đăng.
          </Typography>
        )}
        <Typography variant="caption" color="text.secondary">
          Tổng số: {users.length} người dùng
        </Typography>
      </Box>
      <Divider />
      <List aria-label="Danh sách người dùng" disablePadding>
        {users.map((user, index) => (
          <React.Fragment key={user._id}>
            <ListItemButton
              component={Link}
              to={`/users/${user._id}`}
              selected={
                pathname === `/users/${user._id}` ||
                pathname === `/photos/${user._id}`
              }
            >
              <ListItemAvatar>
                <Avatar className="user-avatar">
                  {user.first_name[0]}
                  {user.last_name[0]}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={`${user.first_name} ${user.last_name}`}
                secondary={user.occupation}
                primaryTypographyProps={{ fontWeight: 600 }}
              />
            </ListItemButton>
            {index < users.length - 1 && <Divider component="li" />}
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
}

export default UserList;
