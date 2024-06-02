import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, List } from '@mui/material';
import CustomListItem from '../common/CustomListItem';
import { HomeOutlined, PersonOutlineOutlined  , Logout } from '@mui/icons-material';
import { AuthContext } from '../../context/AuthContext'

const Sidebar = () => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
  };

  const handleProfile = () => {
    navigate('/profile');
  }

  const handleHome = () => {
    navigate('/home');
  }

  return (
    <Box>
    <Box
      sx={{
        width: '200px',
        bgcolor: '#2F3238',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        color: 'white',
        padding: '02px 16px',
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
    </Box>
  );
};

export default Sidebar;
