const express = require('express');
const { fetchUser, postUser } = require('../controllers/userController');
const { validateFetchUser, validateCreateUser } = require('../middleware/userValidation');

const router = express.Router();

router.get('/', validateFetchUser, fetchUser);

router.post('/add', validateCreateUser, postUser);

module.exports = router;
