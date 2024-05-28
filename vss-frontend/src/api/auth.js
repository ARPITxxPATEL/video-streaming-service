import axios from 'axios';

const API_URL = 'http://localhost:3006';

export const login = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}/api/auth/login`, { email, password });
        return response;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
};

export const register = async (username, email, password) => {
    try {
        const response = await axios.post(`${API_URL}/api/auth/register`, { username, email, password });
        return response;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
};