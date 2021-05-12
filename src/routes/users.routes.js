const userController = require('../controllers/users/users.controller')
const router = require('express').Router()
const mdAuth = require('../middlewares/auth.middleware');

router.put('/updateAccount', mdAuth.ensureAuth ,userController.updateUser);
router.delete('/deleteAccount', mdAuth.ensureAuth ,userController.deleteUser);
router.get('/getUsers', mdAuth.ensureAuth, userController.getUsers)
router.get('/getUser', mdAuth.ensureAuth, userController.getUser)
module.exports = router;