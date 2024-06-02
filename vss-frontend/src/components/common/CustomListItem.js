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
        border: '0px solid #0F0F0F',
        borderRadius: '12px',
        '&:hover': {
            bgcolor: '#464B54',
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