import React, { useState, useEffect, useContext } from 'react';
import AuthBox from '../components/common/AuthBox'
import LoginHeader from '../components/layout/LoginHeader';
import LoginInputs from '../components/layout/LoginInputs';
import LoginFooter from '../components/layout/LoginFooter';
import { validateLoginForm } from '../shared/utils/validators';
import { loginApi } from '../api/auth';
import { AuthContext } from '../context/AuthContext';
import { SnackbarContext } from '../context/SnackbarContext';


const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  const { login } = useContext(AuthContext);
  const { openSnackbar } = useContext(SnackbarContext);

  useEffect(() => {
    setIsFormValid(validateLoginForm({ email, password }));
  }, [email, password, setIsFormValid]);

  const handleLogin = async () => {
    try {
      const response = await loginApi(email, password);
      login(response.data.userDetails, response.data.userDetails.token);
    } catch (error) {
      openSnackbar('Invalid email or password', 'error');
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
      <LoginFooter 
        isFormValid={isFormValid}
        handleLogin={handleLogin}
      />
    </AuthBox>
  )
};


export default Login;