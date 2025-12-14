const sweetService = require('../services/sweetService');
const { validationResult } = require('express-validator');

/**
 * Create a new sweet (Admin only)
 * POST /api/sweets
 */
const createSweet = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array(),
      });
    }

    const sweet = await sweetService.createSweet(req.body);

    res.status(201).json({
      success: true,
      message: 'Sweet created successfully',
      data: sweet,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

/**
 * Get all sweets with optional filters
 * GET /api/sweets
 * GET /api/sweets/search?name=&category=&minPrice=&maxPrice=
 */
const getAllSweets = async (req, res) => {
  try {
    const filters = {
      name: req.query.name,
      category: req.query.category,
      minPrice: req.query.minPrice,
      maxPrice: req.query.maxPrice,
    };

    const sweets = await sweetService.getAllSweets(filters);

    res.status(200).json({
      success: true,
      count: sweets.length,
      data: sweets,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

/**
 * Get sweet by ID
 * GET /api/sweets/:id
 */
const getSweetById = async (req, res) => {
  try {
    const sweet = await sweetService.getSweetById(req.params.id);

    if (!sweet) {
      return res.status(404).json({
        success: false,
        message: 'Sweet not found',
      });
    }

    res.status(200).json({
      success: true,
      data: sweet,
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid sweet ID',
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

/**
 * Update sweet (Admin only)
 * PUT /api/sweets/:id
 */
const updateSweet = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array(),
      });
    }

    const sweet = await sweetService.updateSweet(req.params.id, req.body);

    if (!sweet) {
      return res.status(404).json({
        success: false,
        message: 'Sweet not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Sweet updated successfully',
      data: sweet,
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid sweet ID',
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

/**
 * Delete sweet (Admin only)
 * DELETE /api/sweets/:id
 */
const deleteSweet = async (req, res) => {
  try {
    const sweet = await sweetService.deleteSweet(req.params.id);

    if (!sweet) {
      return res.status(404).json({
        success: false,
        message: 'Sweet not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Sweet deleted successfully',
      data: sweet,
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid sweet ID',
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

/**
 * Purchase sweet (decrease quantity)
 * POST /api/sweets/:id/purchase
 */
const purchaseSweet = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array(),
      });
    }

    const { quantity } = req.body;
    const sweet = await sweetService.purchaseSweet(req.params.id, quantity);

    res.status(200).json({
      success: true,
      message: 'Purchase successful',
      data: sweet,
    });
  } catch (error) {
    if (error.message === 'Sweet not found') {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }

    if (error.message === 'Insufficient quantity available') {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid sweet ID',
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

/**
 * Restock sweet (Admin only)
 * POST /api/sweets/:id/restock
 */
const restockSweet = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array(),
      });
    }

    const { quantity } = req.body;
    const sweet = await sweetService.restockSweet(req.params.id, quantity);

    res.status(200).json({
      success: true,
      message: 'Restock successful',
      data: sweet,
    });
  } catch (error) {
    if (error.message === 'Sweet not found') {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }

    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid sweet ID',
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

module.exports = {
  createSweet,
  getAllSweets,
  getSweetById,
  updateSweet,
  deleteSweet,
  purchaseSweet,
  restockSweet,
};

