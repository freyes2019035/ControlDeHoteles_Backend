const userController = require('../controllers/users/users.controller')
const router = require('express').Router()

router.get('/users', userController.helloWord);


module.exports = router;