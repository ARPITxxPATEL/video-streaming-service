import axios from 'axios';
import {jwtDecode} from 'jwt-decode';

const API_URL = 'http://localhost:3006';

export const loginApi = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}/api/auth/login`, { email, password });
        return response;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
};

export const registerApi = async (username, email, password) => {
    try {
        const response = await axios.post(`${API_URL}/api/auth/register`, { username, email, password });
        return response;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
};

export const verifyToken = (token) => {
  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    if (decodedToken.exp < currentTime) {
      console.log("Token is expired");
      throw new Error('Token is expired');
    }

    return true;
  } catch (error) {
    throw new Error('Token verification failed');
  }
};


export const getAuthToken = () => {
    return localStorage.getItem('token');
};