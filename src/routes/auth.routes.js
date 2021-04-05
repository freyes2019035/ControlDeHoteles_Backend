const authController = require('../controllers/auth.controller');
const router = require('express').Router();


router.get('/login', authController.login)


module.exports = router;