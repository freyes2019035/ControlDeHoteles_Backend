const router = require('express').Router();
const toeController = require('../controllers/typeOfEvent/TypeOfEvent.controller')
const md_auth = require('../middlewares/auth.middleware')


router.get('/', md_auth.ensureAuth, toeController.getAllTypeOfEvents)
router.get('/:id', md_auth.ensureAuth, toeController.getTypeOfEvent)
router.post('/create', md_auth.ensureAuth, toeController.createTypeOfEvent)
router.put('/update/:id', md_auth.ensureAuth, toeController.updateTypeOfEvent)
router.delete('/delete/:id', md_auth.ensureAuth, toeController.deleteTypeOfEvent)


module.exports = router;