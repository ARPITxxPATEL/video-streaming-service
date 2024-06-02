import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { verifyToken } from '../api/auth'; 

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const isTokenValid = verifyToken(token);
        if (isTokenValid) {
          setIsLoggedIn(true);
          console.log("User is logged in");
        } else {
          preLogout();
        }
      } catch (error) {
        preLogout();
      }
    } else {
      preLogout();
    }
  }, [navigate]);

  const login = (user, token) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    setIsLoggedIn(true);
    navigate('/home');
  };

  const preLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
  };

  const logout = () => {
    preLogout();
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
