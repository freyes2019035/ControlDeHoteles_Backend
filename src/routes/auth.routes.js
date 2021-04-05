const authController = require('../controllers/auth/auth.controller');
const router = require('express').Router();


router.get('/login', authController.login)
router.post('/register', authController.register)

module.exports = router;