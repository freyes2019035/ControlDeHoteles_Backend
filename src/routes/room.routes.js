const router = require('express').Router();
const md_auth = require('../middlewares/auth.middleware')
const roomController = require('../controllers/room/room.controller')

router.get('/', md_auth.ensureAuth, roomController.getRooms)
router.get('/:id', md_auth.ensureAuth, roomController.getRoom)
router.get('/hotel/:id', md_auth.ensureAuth, roomController.getRoomsOfHotel)
router.post('/create', md_auth.ensureAuth, roomController.createRoom)
router.put('/update/:id', md_auth.ensureAuth, roomController.updateRoom)
router.delete('/delete/:id', md_auth.ensureAuth, roomController.deleteRoom)


module.exports = router;