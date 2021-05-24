const userController = require('../controllers/users/users.controller')
const router = require('express').Router()
const mdAuth = require('../middlewares/auth.middleware');

router.put('/updateAccount', mdAuth.ensureAuth ,userController.updateUser);
router.put('/updateAccountById/:id', mdAuth.ensureAuth ,userController.updateUserById);
router.delete('/deleteAccount', mdAuth.ensureAuth ,userController.deleteUser);
router.delete('/deleteAccountById/:id', mdAuth.ensureAuth ,userController.deleteUserById);
router.get('/getUsers', mdAuth.ensureAuth, userController.getUsers)
router.get('/getUser', mdAuth.ensureAuth, userController.getUser)
router.get('/getUserById/:id', mdAuth.ensureAuth, userController.getUserById)
module.exports = router;