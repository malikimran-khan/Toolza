const express = require('express');
const router = express.Router();
const { register, login, verify, googleLogin } = require('../controllers/authController');

router.post('/register', register);
router.post('/login', login);
router.post('/google-login', googleLogin);
router.get('/verify', verify);

module.exports = router;
