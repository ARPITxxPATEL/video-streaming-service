import React from 'react';
import { ListItem, ListItemText } from '@mui/material';


const CustomListItem = ({ icon, onClick, text}) => {
  return (
    <>
      <ListItem
        button
        onClick={onClick}
        sx={{
        'color': '#b9bbbe',
        '&:hover': {
            bgcolor: '#303239',
            color: 'white',
            '& .MuiListItemText-root': {
            color: 'white',
            },
        },
        }}
      >
        {icon}
        <ListItemText primary={text} sx={{'textAlign': 'center'}} />
      </ListItem>
    </>
  )
}

export default CustomListItem;