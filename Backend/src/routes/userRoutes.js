const express = require('express');
const { getAllUsers, loginUser } = require('../controllers/userController');

const router = express.Router();

// Route to get all users
router.get('/users', getAllUsers);
// Route to get logged in user
router.post('/login', loginUser);

module.exports = router;
