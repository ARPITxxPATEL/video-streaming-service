import React from 'react';
import InputWithLabel from '../common/InputWithLabel';

const LoginInputs = ({ email, setEmail, password, setPassword }) => {
  return (
    <>
      <InputWithLabel 
      value={email}
      setValue={setEmail}
      label='Email'
      type='text'
      />
      <InputWithLabel 
      value={password}
      setValue={setPassword}
      label='Password'
      type='password'
      />
    </>
  )
}

export default LoginInputs;