import React from 'react';
import { Box } from '@mui/material';
import ProfileUserInfo from '../components/layout/ProfileUserInfo';
import ProfileTabs from '../components/layout/ProfileTabs';

const Register = () => {
  return (
    <Box sx={{padding: '20px 0' }}>
      <ProfileUserInfo />
      <ProfileTabs />
    </Box>
  );
};

export default Register;
