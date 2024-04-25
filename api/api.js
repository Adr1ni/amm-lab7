import axios from 'axios';

const API_URL = 'http://localhost:5121/api';

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/Auth/Login`, { email, password });
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

export const fetchStudents = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/Customer`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching students:', error);
    throw error;
  }
};
