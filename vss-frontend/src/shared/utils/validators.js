export const validateLoginForm = ({ email, password}) => {
    return validateMail(email) && validatePassword(password);
  }
  
  
  export const validateRegisterForm = ({ email, username, password}) => {
    return validateMail(email) && validateUsername(username) && validatePassword(password);
  }
  
  const validatePassword = (password) => {
    return password.length >= 6 && password.length <= 12;
  }
  
  export const validateMail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  }
  
  const validateUsername = (username) => {
    return username.length >= 3 && username.length <= 12;
  }