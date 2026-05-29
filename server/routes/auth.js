const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../middleware/auth');
const {
  registerRules,
  loginRules,
  forgotPasswordRules,
  resetPasswordRules,
} = require('../middleware/validators');
const {
  register,
  login,
  getMe,
  forgotPassword,
  resetPassword,
  verifyEmail,
} = require('../controllers/authController');

router.post('/register', (req, res, next) => {
  console.log('POST /api/auth/register hit');
  console.log('Body:', req.body);
  next();
}, registerRules, register);

router.post('/login', loginRules, login);
router.get('/me', isAuthenticated, getMe);
router.post('/forgot-password', forgotPasswordRules, forgotPassword);
router.put('/reset-password/:token', resetPasswordRules, resetPassword);
router.get('/verify-email/:token', verifyEmail);

module.exports = router;