const router = require("express").Router();
const mdAuth = require('../middlewares/auth.middleware');
const hotelController = require('../controllers/hotel/hotel.controller')
router.post('/create', mdAuth.ensureAuth, hotelController.createHotel)



module.exports = router;