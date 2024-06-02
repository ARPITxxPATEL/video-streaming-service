import React, { useState, useEffect, useContext } from 'react';
import { Typography } from '@mui/material';
import AuthBox from '../components/common/AuthBox';
import RegisterPageInputs from '../components/layout/RegisterInputs';
import RegisterPageFooter from '../components/layout/RegisterFooter';
import { validateRegisterForm } from '../shared/utils/validators';
import { registerApi } from '../api/auth';
import { AuthContext } from '../context/AuthContext';
import { SnackbarContext } from '../context/SnackbarContext';

const Register = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [isFormValid, setIsFormValid] = useState(false);
  const { login } = useContext(AuthContext);
  const { openSnackbar } = useContext(SnackbarContext);

  const handleRegister = async () => {
    try {
      const response = await registerApi(username, email, password);
      login(response.data.userDetails, response.data.userDetails.token);
    } catch (error) {
      openSnackbar(error, 'error');
    }
  }

  useEffect(() => {
    setIsFormValid(validateRegisterForm({
      email,
      username,
      password
    }));
  }, [email, username, password, setIsFormValid]);

  return (
    <AuthBox additionalStyles={{height: 460,}}>
      <Typography 
        variant="h5" 
        sx={{ 
          color: "white",
          textAlign:"center", 
          fontWeight: "bold", 
          marginBottom: "20px",
        }}
      >
        Create an account
      </Typography>
      <RegisterPageInputs 
      email={email}
      username={username}
      password={password}
      setEmail={setEmail}
      setUsername={setUsername}
      setPassword={setPassword}
      setIsFormValid={setIsFormValid}
      />
      <RegisterPageFooter 
      handleRegister={handleRegister}
      isFormValid={isFormValid}
      />
    </AuthBox>
  )
}

export default Register;
