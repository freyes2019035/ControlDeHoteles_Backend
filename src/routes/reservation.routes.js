const router = require('express').Router();
const md_auth = require('../middlewares/auth.middleware');
const reservationController = require('../controllers/reservation/reservation.controller');

router.get('/', md_auth.ensureAuth, reservationController.getAllReservations)
router.get('/my', md_auth.ensureAuth, reservationController.getAllMyReservations)
router.post('/create', md_auth.ensureAuth, reservationController.createReservation)
router.put('/update/:id', md_auth.ensureAuth, reservationController.updateReservation)
router.delete('/delete/:id', md_auth.ensureAuth, reservationController.deleteReservation)

module.exports = router;