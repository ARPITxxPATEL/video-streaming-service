import React from 'react';
import { Typography } from '@mui/material';

const LoginHeader = () => {
  return (
    <>
    <Typography 
      variant='h5' 
      sx={{ 
        color: 'white', 
        textAlign:"center", 
        fontWeight: "bold",  
      }}>
      Welcome back!
    </Typography>
    <Typography 
      sx={{ 
        color:'#b9bbbe', 
        textAlign:"center", 
        fontWeight: "500",
        }}>
      We're so excited to see you again!
    </Typography>
    </>
  )
}

export default LoginHeader;