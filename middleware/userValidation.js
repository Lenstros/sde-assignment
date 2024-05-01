/* eslint-disable consistent-return */
/* eslint-disable no-useless-escape */
const { body, query, validationResult } = require('express-validator');

const validateFetchUser = [
  query('userFirstName')
    .optional()
    .isString()
    .trim()
    .withMessage('User first name must be a string'),
  query('userLastName')
    .optional()
    .isString()
    .trim()
    .withMessage('User last name must be a string'),
  query('userEmail')
    .optional()
    .isEmail()
    .withMessage('A valid email is required'),
  query('userPhone')
    .optional()
    .isMobilePhone()
    .withMessage('A valid phone number is required'),
  query('userAddress')
    .optional()
    .isString()
    .withMessage('User address must be a string'),
  query('userCity')
    .optional()
    .isString()
    .withMessage('User city must be a string'),
  query('userState')
    .optional()
    .isString()
    .withMessage('User state must be a string'),
  query('userCountry')
    .optional()
    .isString()
    .withMessage('User country must be a string'),
  query('userGender')
    .optional()
    .isIn(['male', 'female', 'other'])
    .withMessage('User gender must be male, female, or other'),
  query('userDob')
    .optional()
    .isISO8601()
    .withMessage('User date of birth must be in ISO8601 format'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    next();
  },
];

const validateCreateUser = [
  body('userFirstName')
    .isString()
    .trim()
    .notEmpty()
    .withMessage('User first name is required')
    .isLength({ min: 3, max: 20 })
    .withMessage('User first name must be between 3 and 20 characters'),
  body('userLastName')
    .isString()
    .trim()
    .notEmpty()
    .withMessage('User last name is required')
    .isLength({ min: 3, max: 20 })
    .withMessage('User last name must be between 3 and 20 characters'),
  body('userEmail')
    .notEmpty()
    .isEmail()
    .normalizeEmail()
    .withMessage('User email is required')
    .custom((value) => {
      const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
      if (!emailRegex.test(value)) {
        throw new Error('Invalid email address');
      }
      return true;
    }),
  body('userPhone')
    .isMobilePhone()
    .notEmpty()
    .withMessage('User phone number is required')
    .isLength({ min: 10, max: 10 })
    .withMessage('User phone number must be 10 digits')
    .custom((value) => {
      const phoneRegex = /^\d{10}$/;
      if (!phoneRegex.test(value)) {
        throw new Error('Invalid phone number');
      }
      return true;
    }),
  body('userAddress')
    .isString()
    .notEmpty()
    .withMessage('User address is required'),
  body('userCity').isString().notEmpty().withMessage('User city is required'),
  body('userState').isString().notEmpty().withMessage('User state is required'),
  body('userCountry')
    .isString()
    .notEmpty()
    .withMessage('User country is required'),
  body('userGender')
    .notEmpty()
    .withMessage('User gender is required')
    .isIn(['male', 'female', 'other'])
    .withMessage('User gender can only be male, female or other'),
  body('userDob')
    .notEmpty()
    .withMessage('User date of birth is required')
    .isISO8601()
    .withMessage('User date of birth must be in ISO8601 format'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = {
  validateFetchUser,
  validateCreateUser,
};
