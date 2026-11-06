import React from 'react';
import {
  Alert,
  Avatar,
  Box,
  Button,
  Divider,
  Stack,
  Typography,
} from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import models from '../../modelData/models';
import './styles.css';

function UserDetail() {
  const { userId } = useParams();
  const user = models.userModel(userId);

  if (!user) {
    return (
      <Alert severity="warning">
        Không tìm thấy người dùng có ID: {userId}
      </Alert>
    );
  }

  return (
    <Box>
      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
        className="profile-header"
      >
        <Avatar className="profile-avatar">
          {user.first_name[0]}
          {user.last_name[0]}
        </Avatar>
        <Box>
          <Typography variant="h4" component="h1" fontWeight={700}>
            {user.first_name} {user.last_name}
          </Typography>
          <Typography color="text.secondary">Hồ sơ người dùng</Typography>
        </Box>
      </Stack>
      <Divider sx={{ my: 3 }} />
      <Stack spacing={2}>
        <Box>
          <Typography variant="subtitle2" color="text.secondary">
            Địa điểm
          </Typography>
          <Typography>{user.location}</Typography>
        </Box>
        <Box>
          <Typography variant="subtitle2" color="text.secondary">
            Nghề nghiệp
          </Typography>
          <Typography>{user.occupation}</Typography>
        </Box>
        <Box>
          <Typography variant="subtitle2" color="text.secondary">
            Giới thiệu
          </Typography>
          <Typography sx={{ whiteSpace: 'pre-wrap' }}>
            {user.description}
          </Typography>
        </Box>
      </Stack>
      <Button
        component={Link}
        to={`/photos/${user._id}`}
        variant="contained"
        sx={{ mt: 3 }}
      >
        Xem ảnh của {user.first_name} {user.last_name}
      </Button>
    </Box>
  );
}

export default UserDetail;
