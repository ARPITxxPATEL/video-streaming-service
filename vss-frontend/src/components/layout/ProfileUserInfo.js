import React from 'react';
import { Box, Avatar, Typography } from '@mui/material';

const ProfileUserInfo = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const avatarImage = '/images/profile_avatar.jpeg';
  return (
    <Box sx={{ width: '100%', height: '100%'}}>
      <Box
        sx={{
          backgroundImage: `url(/images/profile_banner.jpeg)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          maxWidth: '100%',
          height: '200px',
          borderRadius: '12px',
        }}
      />
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          padding: '20px'
        }}
      >
        <Avatar
          alt={user.username}
          src={avatarImage}
          sx={{ width: 120, height: 120, marginRight: 2, boxShadow: 2 }}
        />
        <Box sx={{ marginLeft: 3 }}>
          <Typography variant="h4" component="div" color="#FFFFFF">
            {user.username}
          </Typography>
          <Typography variant="subtitle1" component="div" color="#B8BBBE">
            {user.email}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default ProfileUserInfo;
