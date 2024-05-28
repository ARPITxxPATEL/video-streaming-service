import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Box, List, ListItem, ListItemText } from '@mui/material';

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Add your logout logic here, e.g., clear authentication tokens
    navigate('/login');
  };

  return (
    <Box
      sx={{
        width: '200px',
        bgcolor: '#0041c2',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        color: 'white',
      }}
    >
      <List>
        <ListItem
          button
          component={Link}
          to="/home"
          sx={{
            '&:hover': {
              bgcolor: '#2D68C4',
              '& .MuiListItemText-root': {
                color: 'white',
              },
            },
          }}
        >
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem
          button
          component={Link}
          to="/profile"
          sx={{
            '&:hover': {
              bgcolor: '#2D68C4',
              '& .MuiListItemText-root': {
                color: 'white',
              },
            },
          }}
        >
          <ListItemText primary="Profile" />
        </ListItem>
      </List>
      <List>
        <ListItem
          button
          onClick={handleLogout}
          sx={{
            '&:hover': {
              bgcolor: '#2D68C4',
              '& .MuiListItemText-root': {
                color: 'white',
              },
            },
          }}
        >
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </Box>
  );
};

export default Sidebar;
