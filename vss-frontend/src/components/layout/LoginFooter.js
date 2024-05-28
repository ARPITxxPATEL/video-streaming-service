import React from 'react';
import CustomPrimaryButton from '../common/CustomPrimaryButton';
import RedirectInfo from '../common/RedirectInfo';
import { Tooltip } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const getFormNotValidMessage = () => {
  return 'Enter correct e-mail and password should contains between 6 to 12 characters';
}

const getFormValidMessage = () => {
  return 'Press  to log in';
}

const LoginPageFooter = ({handleLogin, isFormValid}) => {
  const navigate = useNavigate();

  const handlePushToRegisterPage = () => {
    navigate('/register');
  };

  return (
    <>
    <Tooltip
    title={!isFormValid ? getFormNotValidMessage() : getFormValidMessage()}
    >
      <div>
        <CustomPrimaryButton
          label="Login"
          additionalStyles={{ marginTop: '40px' }}
          disabled={!isFormValid}
          onClick={handleLogin}
        />
      </div>
      </Tooltip>
      <RedirectInfo 
      text='Need a account? '
      redirectText='Create an account'
      additionalStyles={{ marginTop: '5px' }}
      redirectHandler={handlePushToRegisterPage}
      />
    </>
  )
}

export default LoginPageFooter;