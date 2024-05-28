import React from 'react';
import Box from '@mui/material/Box';
import { styled } from '@mui/system';

const BoxWrapper = styled('div')({
  width: '100%',
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: "url('/images/login_bg.svg')",
})

const AuthBox = (props) => {
  const { additionalStyles } = props;
  return (
    <BoxWrapper>
      <Box
        sx = {{
          width: 500,
          height: 400,
          bgcolor: '#36393f',
          borderRadius: '5px',
          boxShadow: '0 2px 10px 0 rgb(0 0 0 / 0.5)',
          flexDirection: 'column',
          padding: '30px',
          userSelect: 'none',
        }}
        style={additionalStyles ? additionalStyles : {}}
      >
        {props.children}
      </Box>
    </BoxWrapper>
  )
}

export default AuthBox;