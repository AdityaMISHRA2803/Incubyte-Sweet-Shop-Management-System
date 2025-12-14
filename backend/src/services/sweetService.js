const Sweet = require('../models/Sweet');

/**
 * Service layer for sweet business logic
 */

/**
 * Get all sweets with optional filters
 * @param {object} filters - Filter criteria
 * @returns {Promise<Array>} Array of sweets
 */
const getAllSweets = async (filters = {}) => {
  const query = {};

  if (filters.name) {
    query.name = { $regex: filters.name, $options: 'i' };
  }

  if (filters.category) {
    query.category = { $regex: filters.category, $options: 'i' };
  }

  if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
    query.price = {};
    if (filters.minPrice !== undefined) {
      query.price.$gte = parseFloat(filters.minPrice);
    }
    if (filters.maxPrice !== undefined) {
      query.price.$lte = parseFloat(filters.maxPrice);
    }
  }

  return await Sweet.find(query).sort({ createdAt: -1 });
};

/**
 * Get sweet by ID
 * @param {string} id - Sweet ID
 * @returns {Promise<object>} Sweet object
 */
const getSweetById = async (id) => {
  return await Sweet.findById(id);
};

/**
 * Create a new sweet
 * @param {object} sweetData - Sweet data
 * @returns {Promise<object>} Created sweet
 */
const createSweet = async (sweetData) => {
  const sweet = new Sweet(sweetData);
  return await sweet.save();
};

/**
 * Update sweet by ID
 * @param {string} id - Sweet ID
 * @param {object} updateData - Data to update
 * @returns {Promise<object>} Updated sweet
 */
const updateSweet = async (id, updateData) => {
  return await Sweet.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });
};

/**
 * Delete sweet by ID
 * @param {string} id - Sweet ID
 * @returns {Promise<object>} Deleted sweet
 */
const deleteSweet = async (id) => {
  return await Sweet.findByIdAndDelete(id);
};

/**
 * Purchase sweet (decrease quantity)
 * @param {string} id - Sweet ID
 * @param {number} quantity - Quantity to purchase
 * @returns {Promise<object>} Updated sweet
 */
const purchaseSweet = async (id, quantity) => {
  const sweet = await Sweet.findById(id);
  if (!sweet) {
    throw new Error('Sweet not found');
  }

  if (sweet.quantity < quantity) {
    throw new Error('Insufficient quantity available');
  }

  sweet.quantity -= quantity;
  return await sweet.save();
};

/**
 * Restock sweet (increase quantity)
 * @param {string} id - Sweet ID
 * @param {number} quantity - Quantity to add
 * @returns {Promise<object>} Updated sweet
 */
const restockSweet = async (id, quantity) => {
  const sweet = await Sweet.findById(id);
  if (!sweet) {
    throw new Error('Sweet not found');
  }

  sweet.quantity += quantity;
  return await sweet.save();
};

module.exports = {
  getAllSweets,
  getSweetById,
  createSweet,
  updateSweet,
  deleteSweet,
  purchaseSweet,
  restockSweet,
};

