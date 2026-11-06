import React from 'react';
import {
  Alert,
  Box,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Link as MuiLink,
  Stack,
  Typography,
} from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import models from '../../modelData/models';
import './styles.css';

// Convert original model timestamps to readable Vietnamese date/time.
function formatDateTime(value) {
  const date = new Date(String(value).replace(' ', 'T'));
  return Number.isNaN(date.getTime())
    ? String(value)
    : date.toLocaleString('vi-VN', { dateStyle: 'short', timeStyle: 'short' });
}

function UserPhotos() {
  const { userId } = useParams();
  const user = models.userModel(userId);
  const photos = models.photoOfUserModel(userId);

  if (!user) {
    return (
      <Alert severity="warning">
        Không tìm thấy người dùng có ID: {userId}
      </Alert>
    );
  }

  return (
    <Box>
      <Typography variant="h4" component="h1" fontWeight={700} gutterBottom>
        Photos of {user.first_name} {user.last_name}
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 3 }}>
        {photos.length} ảnh · Hiển thị đầy đủ ngày đăng và các bình luận
      </Typography>
      {photos.length === 0 && (
        <Alert severity="info">Người dùng này chưa có ảnh.</Alert>
      )}
      <Stack spacing={3}>
        {photos.map((photo) => (
          <Card variant="outlined" key={photo._id} className="photo-card">
            {/* Original JPG files are copied to public/images for StackBlitz/Vite. */}
            <CardMedia
              component="img"
              src={`/images/${photo.file_name}`}
              alt={`Ảnh ${photo.file_name} của ${user.first_name} ${user.last_name}`}
              className="photo-img"
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Đăng lúc: {formatDateTime(photo.date_time)}
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Typography variant="h6" fontWeight={700} gutterBottom>
                Bình luận ({photo.comments?.length ?? 0})
              </Typography>
              {(!photo.comments || photo.comments.length === 0) && (
                <Typography color="text.secondary">
                  Chưa có bình luận.
                </Typography>
              )}
              <Stack spacing={1.5}>
                {(photo.comments || []).map((comment) => (
                  <Box key={comment._id} className="comment-box">
                    <MuiLink
                      component={Link}
                      to={`/users/${comment.user._id}`}
                      underline="hover"
                      fontWeight={700}
                    >
                      {comment.user.first_name} {comment.user.last_name}
                    </MuiLink>
                    <Typography
                      display="block"
                      variant="caption"
                      color="text.secondary"
                    >
                      {formatDateTime(comment.date_time)}
                    </Typography>
                    {/* React escapes this text: do NOT use dangerouslySetInnerHTML. */}
                    <Typography
                      sx={{
                        whiteSpace: 'pre-wrap',
                        overflowWrap: 'anywhere',
                        mt: 1,
                      }}
                    >
                      {comment.comment}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Box>
  );
}

export default UserPhotos;
