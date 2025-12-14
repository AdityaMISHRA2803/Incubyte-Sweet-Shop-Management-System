import api from '../../utils/axios';

/**
 * Auth service for API calls
 */

export const authService = {
  /**
   * Register a new user
   * @param {object} userData - User registration data
   * @returns {Promise} API response
   */
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },

  /**
   * Login user
   * @param {object} credentials - Login credentials
   * @returns {Promise} API response
   */
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },
};

