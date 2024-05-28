import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthBox from '../components/common/AuthBox'
import LoginHeader from '../components/layout/LoginHeader';
import LoginInputs from '../components/layout/LoginInputs';
import LoginFooter from '../components/layout/LoginFooter';
import { validateLoginForm } from '../shared/utils/validators';
import { login } from '../api/auth';


const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    setIsFormValid(validateLoginForm({ email, password }));
  }, [email, password, setIsFormValid]);

  const handleLogin = async () => {
    try {
      const response = await login(email, password);
      localStorage.setItem('jwtToken', response.data.userDetails.token);
      localStorage.setItem('user', JSON.stringify(response.data.userDetails));
      navigate('/home'); // Redirect to home page
    } catch (error) {
      setError('Invalid email or password. Please try again.');
      console.error('Login error:', error);
    }
  };

  return (
    <AuthBox>
      <LoginHeader />
      <LoginInputs 
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <LoginFooter 
        isFormValid={isFormValid}
        handleLogin={handleLogin}
      />
    </AuthBox>
  )
};


export default Login;