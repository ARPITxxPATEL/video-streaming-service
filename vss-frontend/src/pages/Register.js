import React, { useState, useEffect } from 'react';
import { Typography } from '@mui/material';
import AuthBox from '../components/common/AuthBox';
import RegisterPageInputs from '../components/layout/RegisterInputs';
import RegisterPageFooter from '../components/layout/RegisterFooter';
import { validateRegisterForm } from '../shared/utils/validators';
import { register } from '../api/auth';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const [isFormValid, setIsFormValid] = useState(false);

  const handleRegister = async () => {
    try {
      const response = await register(username, email, password);
      localStorage.setItem('jwtToken', response.data.userDetails.token);
      localStorage.setItem('user', JSON.stringify(response.data.userDetails));
      navigate('/home'); // Redirect to home page
    } catch (error) {
      setError(error.message || 'An error occurred. Please try again.');
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
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <RegisterPageFooter 
      handleRegister={handleRegister}
      isFormValid={isFormValid}
      />
    </AuthBox>
  )
}

export default Register;
