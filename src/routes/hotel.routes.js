const router = require("express").Router();
const mdAuth = require('../middlewares/auth.middleware');
const hotelController = require('../controllers/hotel/hotel.controller')


router.get('/', hotelController.getHotels)
router.get('/clients', mdAuth.ensureAuth, hotelController.getHotelClients)
router.post('/searchByName', mdAuth.ensureAuth,hotelController.getHotelByName)
router.get('/searchByAddress', hotelController.getHotelByAddress)
router.post('/getHotelByEmail', mdAuth.ensureAuth, hotelController.getHotelByEmail)
router.delete('/delete/:id', mdAuth.ensureAuth, hotelController.deleteHotel)
router.get('/:id', hotelController.getHotel)
router.post('/create', mdAuth.ensureAuth, hotelController.createHotel)
router.put('/update/:id', mdAuth.ensureAuth, hotelController.updateHotel)


module.exports = router;