const { body, validationResult } = require('express-validator');

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ 
      error: 'Validation failed',
      details: errors.array()
    });
  }
  next();
};

// User registration validation
const validateUserRegistration = [
  body('name')
    .isLength({ min: 20, max: 60 })
    .withMessage('Name must be between 20 and 60 characters'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  body('password')
    .isLength({ min: 8, max: 16 })
    .matches(/^(?=.*[A-Z])(?=.*[!@#$%^&*])/)
    .withMessage('Password must be 8-16 characters with at least one uppercase letter and one special character'),
  body('address')
    .isLength({ max: 400 })
    .withMessage('Address must not exceed 400 characters'),
  handleValidationErrors
];

// User login validation
const validateUserLogin = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  body('password')
    .notEmpty()
    .withMessage('Password is required'),
  handleValidationErrors
];

// Password update validation
const validatePasswordUpdate = [
  body('currentPassword')
    .notEmpty()
    .withMessage('Current password is required'),
  body('newPassword')
    .isLength({ min: 8, max: 16 })
    .matches(/^(?=.*[A-Z])(?=.*[!@#$%^&*])/)
    .withMessage('New password must be 8-16 characters with at least one uppercase letter and one special character'),
  handleValidationErrors
];

// Store creation validation
const validateStoreCreation = [
  body('name')
    .notEmpty()
    .withMessage('Store name is required'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  body('address')
    .isLength({ max: 400 })
    .withMessage('Address must not exceed 400 characters'),
  handleValidationErrors
];

// Rating submission validation
const validateRatingSubmission = [
  body('rating')
    .isInt({ min: 1, max: 5 })
    .withMessage('Rating must be between 1 and 5'),
  handleValidationErrors
];

// Search validation
const validateSearch = [
  body('searchTerm')
    .optional()
    .isString()
    .withMessage('Search term must be a string'),
  handleValidationErrors
];

module.exports = {
  validateUserRegistration,
  validateUserLogin,
  validatePasswordUpdate,
  validateStoreCreation,
  validateRatingSubmission,
  validateSearch,
  handleValidationErrors
}; 