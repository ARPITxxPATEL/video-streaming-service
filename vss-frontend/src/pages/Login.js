import React from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';

const Login = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
    >
      <Typography variant="h4" mb={3}>Login</Typography>
      <TextField label="Email" variant="outlined" margin="normal" fullWidth />
      <TextField label="Password" type="password" variant="outlined" margin="normal" fullWidth />
      <Button variant="contained" color="primary" sx={{ mt: 3 }}>
        Login
      </Button>
    </Box>
  );
};

export default Login;