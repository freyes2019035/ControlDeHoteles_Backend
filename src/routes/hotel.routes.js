const router = require("express").Router();
const mdAuth = require('../middlewares/auth.middleware');
const hotelController = require('../controllers/hotel/hotel.controller')


router.get('/', hotelController.getHotels)
router.get('/clients', mdAuth.ensureAuth, hotelController.getHotelClients)
router.get('/searchByName', hotelController.getHotelByName)
router.get('/searchByAddress', hotelController.getHotelByAddress)
router.get('/:id', hotelController.getHotel)
router.post('/create', mdAuth.ensureAuth, hotelController.createHotel)
router.put('/update/:id', mdAuth.ensureAuth, hotelController.updateHotel)


module.exports = router;