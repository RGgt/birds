import axios from 'axios';

const API_URL = 'https://jigsawmakerapiappservicelinux.azurewebsites.net/api'; 

export const login = async (credentials) => {
    try {
        const response = await axios.post(`${API_URL}/users/generate`, credentials);
        if (response.data) {
            await localStorage.setItem('user', JSON.stringify(response.data));
            window.location.href = '/birds';
        }
        return response.data;
    } catch (error) {
        console.error("Login error", error);
        throw error;
    }
};

export const logout = () => {
    localStorage.removeItem('user');
};

export const isLoggedIn = () => {
    const user = localStorage.getItem('user');
    return !!user;
};

export const getToken = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    return user?.token;
};
