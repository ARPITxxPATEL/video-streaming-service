import React from 'react';
import InputWithLabel from '../common/InputWithLabel';

const RegisterPageInputs = (props) => {
  const { email, username, password, setEmail, setUsername, setPassword } = props;

  return (
    <>
    <InputWithLabel
    value={username}
    setValue={setUsername}
    label="Username"
    type="text"
    />
    <InputWithLabel
    value={email}
    setValue={setEmail}
    label="Email address"
    type="text"
    />
    <InputWithLabel
    value={password}
    setValue={setPassword}
    label="Password"
    type="password"
    />
    </>
  )
}

export default RegisterPageInputs;
