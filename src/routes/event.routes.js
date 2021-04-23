const router = require('express').Router();
const eventController = require('../controllers/event/event.controller')
const md_auth = require('../middlewares/auth.middleware')


router.get('/', md_auth.ensureAuth, eventController.getAllEvents)
router.get('/:id', md_auth.ensureAuth, eventController.getEvent)
router.get('/hotel/:id', md_auth.ensureAuth, eventController.getEventByHotel)
router.post('/create', md_auth.ensureAuth, eventController.createEvent)
router.put('/update/:id', md_auth.ensureAuth, eventController.updateEvent)
router.delete('/delete/:id', md_auth.ensureAuth, eventController.deleteEvent)


module.exports = router;