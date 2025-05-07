const express = require('express');
const router = express.Router();
const { register, login, verifyEmail } = require('../controllers/authController');

router.post('/register', register);
router.post('/login', login);
router.get('/verify-email', verifyEmail);

// ✅ Test route
router.get('/test', (req, res) => {
  res.status(200).json({ message: 'Auth route is working ✅' });
});

module.exports = router;
