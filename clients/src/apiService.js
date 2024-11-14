import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000';

// Function to handle login
export const login = async (username, password) => {
  try {
    // Send a POST request to the login endpoint with the username and password
    const response = await axios.post(`${API_BASE_URL}/auth/login`, { username, password });
    
    // Return the JWT token from the response if login is successful
    return response.data.accessToken;
  } catch (error) {
    // Handle errors, such as incorrect login credentials
    if (error.response && error.response.status === 401) {
      throw new Error('Invalid username or password');
    } else {
      throw new Error('An error occurred while logging in');
    }
  }
};
