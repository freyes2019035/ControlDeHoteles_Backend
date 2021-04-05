const userController = require('../controllers/users.controller')
const router = require('express').Router()

router.get('/users', userController.helloWord);


module.exports = router;