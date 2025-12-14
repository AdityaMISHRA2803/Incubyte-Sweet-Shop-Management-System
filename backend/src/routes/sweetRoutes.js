const express = require('express');
const { body, param } = require('express-validator');
const {
  createSweet,
  getAllSweets,
  getSweetById,
  updateSweet,
  deleteSweet,
  purchaseSweet,
  restockSweet,
} = require('../controllers/sweetController');
const authenticate = require('../middleware/authMiddleware');
const isAdmin = require('../middleware/adminMiddleware');

const router = express.Router();

// Validation rules
const sweetValidation = [
  body('name').trim().notEmpty().withMessage('Sweet name is required'),
  body('category').trim().notEmpty().withMessage('Category is required'),
  body('price')
    .isFloat({ min: 0 })
    .withMessage('Price must be a positive number'),
  body('quantity')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Quantity must be a non-negative integer'),
];

const updateSweetValidation = [
  body('name').optional().trim().notEmpty().withMessage('Sweet name cannot be empty'),
  body('category')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Category cannot be empty'),
  body('price')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Price must be a positive number'),
  body('quantity')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Quantity must be a non-negative integer'),
];

const purchaseValidation = [
  body('quantity')
    .isInt({ min: 1 })
    .withMessage('Quantity must be a positive integer'),
];

const restockValidation = [
  body('quantity')
    .isInt({ min: 1 })
    .withMessage('Quantity must be a positive integer'),
];

const idValidation = [
  param('id').isMongoId().withMessage('Invalid sweet ID'),
];

/**
 * @route   POST /api/sweets
 * @desc    Create a new sweet (Admin only)
 * @access  Private/Admin
 */
router.post('/', authenticate, isAdmin, sweetValidation, createSweet);

/**
 * @route   GET /api/sweets
 * @desc    Get all sweets with optional filters
 * @access  Private
 */
router.get('/', authenticate, getAllSweets);

/**
 * @route   GET /api/sweets/search
 * @desc    Search sweets with filters (same as GET /api/sweets)
 * @access  Private
 */
router.get('/search', authenticate, getAllSweets);

/**
 * @route   GET /api/sweets/:id
 * @desc    Get sweet by ID
 * @access  Private
 */
router.get('/:id', authenticate, idValidation, getSweetById);

/**
 * @route   PUT /api/sweets/:id
 * @desc    Update sweet (Admin only)
 * @access  Private/Admin
 */
router.put('/:id', authenticate, isAdmin, idValidation, updateSweetValidation, updateSweet);

/**
 * @route   DELETE /api/sweets/:id
 * @desc    Delete sweet (Admin only)
 * @access  Private/Admin
 */
router.delete('/:id', authenticate, isAdmin, idValidation, deleteSweet);

/**
 * @route   POST /api/sweets/:id/purchase
 * @desc    Purchase sweet (decrease quantity)
 * @access  Private
 */
router.post(
  '/:id/purchase',
  authenticate,
  idValidation,
  purchaseValidation,
  purchaseSweet
);

/**
 * @route   POST /api/sweets/:id/restock
 * @desc    Restock sweet (Admin only)
 * @access  Private/Admin
 */
router.post(
  '/:id/restock',
  authenticate,
  isAdmin,
  idValidation,
  restockValidation,
  restockSweet
);

module.exports = router;

