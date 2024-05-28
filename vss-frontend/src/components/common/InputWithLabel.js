import React from 'react';
import { styled } from '@mui/system';

const Wrapper = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  width: '100%',
  margin: '10px 0',
});

const Label = styled('div')({
  color: '#b9bbbe',
  textTransform: 'uppercase',
  fontWeight: '600',
  fontSize: '12px',
  margin: '8px 0',
});

const Input = styled('input')({
  flexGrow: 1,
  height: '40px',
  border: '1px solid black',
  borderRadius: '3px',
  color: '#dcddde',
  background: '#303239',
  margin: 0,
  fontSize: '16px',
  padding: '0 10px',
  letterSpacing: '0.5px',
  borderColor: '#222222',
  '&:hover': {
    borderColor: '#050505',
  },
  '&:focus': {
    outline: 'none',
    borderColor: '#0da6e8',
  },
});

const InputWithLabel = (props) => {
  const { value, setValue, label, type, placeholder } = props;

  const handleValueChange = (event) => {
    setValue(event.target.value);
  }

  return (
    <Wrapper>
      <Label>{label}</Label>
      <Input 
      value={value}
      onChange={handleValueChange}
      type={type}
      placeholder={placeholder}
      spellCheck='false'
      />
    </Wrapper>
  )
}

export default InputWithLabel;