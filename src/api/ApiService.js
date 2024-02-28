import axios from 'axios';
import { getToken } from './AuthService';

const BASE_URL = 'https://jigsawmakerapiappservicelinux.azurewebsites.net';
const API_URL = `${BASE_URL}/api`;

// Interceptor to add auth to all requests
axios.interceptors.request.use(
    config => {
        const token = getToken();
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        Promise.reject(error);
    });

const fetchAntiForgeryToken = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/antiforgery/token`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

/**
 * Get list of birds
 * @param {*} start 
 * @param {*} size 
 * @returns 
 */
export const fetchBirds = async (start, size) => {
    try {
        const response = await axios.get(`${API_URL}/birds/list?start=${start}&size=${size}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

/**
 * Get bird by id
 * @param {*} id 
 * @returns 
 */
export const fetchBirdById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/birds/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

/**
 * Delete a single bird by id
 * @param {*} id 
 * @returns 
 */
export const deleteBird = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/birds/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};


/**
 * Upload a file associated to a bird id
 * @param {*} birdId 
 * @param {*} formData 
 * @returns 
 */
export const uploadBirdImage = async (birdId, formData) => {
    try {
        const token = await fetchAntiForgeryToken();
        const response = await axios.post(`${BASE_URL}/uploads/${birdId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'X-XSRF-TOKEN': token
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

/**
 * Create a bird
 * @param {*} formData 
 * @returns 
 */
export const postBird = async (formData) => {
    try {
        const response = await axios.post(`${API_URL}/birds`, formData);
        const birdId = response.data;
        await uploadBirdImage(birdId, formData).data;
    } catch (error) {
        throw error;
    }
};

/**
 * Update a bird
 * @param {*} id 
 * @param {*} formData 
 * @returns 
 */
export const putBird = async (id, formData) => {
    try {
        const response = await axios.put(`${API_URL}/birds/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};