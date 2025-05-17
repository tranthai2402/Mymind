import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5500';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const fetchUsers = async () => {
  try {
    const response = await api.get('/user/list');
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export const fetchUserDetails = async (userId) => {
  try {
    const response = await api.get(`/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching user ${userId}:`, error);
    throw error;
  }
};

export const fetchUserPhotos = async (userId) => {
  try {
    const response = await api.get(`/photosOfUser/${userId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching photos for user ${userId}:`, error);
    throw error;
  }
};