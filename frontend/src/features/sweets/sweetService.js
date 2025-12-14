import api from '../../utils/axios';

/**
 * Sweet service for API calls
 */

export const sweetService = {
  /**
   * Get all sweets with optional filters
   * @param {object} filters - Filter criteria
   * @returns {Promise} API response
   */
  getAllSweets: async (filters = {}) => {
    const params = new URLSearchParams();
    if (filters.name) params.append('name', filters.name);
    if (filters.category) params.append('category', filters.category);
    if (filters.minPrice) params.append('minPrice', filters.minPrice);
    if (filters.maxPrice) params.append('maxPrice', filters.maxPrice);

    const queryString = params.toString();
    const url = queryString ? `/sweets/search?${queryString}` : '/sweets';
    const response = await api.get(url);
    return response.data;
  },

  /**
   * Get sweet by ID
   * @param {string} id - Sweet ID
   * @returns {Promise} API response
   */
  getSweetById: async (id) => {
    const response = await api.get(`/sweets/${id}`);
    return response.data;
  },

  /**
   * Create a new sweet (Admin only)
   * @param {object} sweetData - Sweet data
   * @returns {Promise} API response
   */
  createSweet: async (sweetData) => {
    const response = await api.post('/sweets', sweetData);
    return response.data;
  },

  /**
   * Update sweet (Admin only)
   * @param {string} id - Sweet ID
   * @param {object} updateData - Data to update
   * @returns {Promise} API response
   */
  updateSweet: async (id, updateData) => {
    const response = await api.put(`/sweets/${id}`, updateData);
    return response.data;
  },

  /**
   * Delete sweet (Admin only)
   * @param {string} id - Sweet ID
   * @returns {Promise} API response
   */
  deleteSweet: async (id) => {
    const response = await api.delete(`/sweets/${id}`);
    return response.data;
  },

  /**
   * Purchase sweet
   * @param {string} id - Sweet ID
   * @param {number} quantity - Quantity to purchase
   * @returns {Promise} API response
   */
  purchaseSweet: async (id, quantity) => {
    const response = await api.post(`/sweets/${id}/purchase`, { quantity });
    return response.data;
  },

  /**
   * Restock sweet (Admin only)
   * @param {string} id - Sweet ID
   * @param {number} quantity - Quantity to add
   * @returns {Promise} API response
   */
  restockSweet: async (id, quantity) => {
    const response = await api.post(`/sweets/${id}/restock`, { quantity });
    return response.data;
  },
};

