import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, List } from '@mui/material';
import CustomListItem from '../common/CustomListItem';
import { HomeOutlined, PersonOutlineOutlined  , Logout } from '@mui/icons-material';

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleProfile = () => {
    navigate('/profile');
  }

  const handleHome = () => {
    navigate('/home');
  }

  return (
    <Box
      sx={{
        width: '200px',
        bgcolor: '#36393f',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        color: 'white',
      }}
    >
      <List>
        <CustomListItem icon={<HomeOutlined />} onClick={handleHome} text="Home" />
        <CustomListItem icon={<PersonOutlineOutlined />} onClick={handleProfile} text="Profile" />
      </List>
      <List>
        <CustomListItem icon={<Logout />} onClick={handleLogout} text="Logout" />
      </List>
    </Box>
  );
};

export default Sidebar;
