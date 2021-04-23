const router = require('express').Router();
const md_auth = require('../middlewares/auth.middleware')
const serviceController = require('../controllers/services/services.controller')


router.get('/', md_auth.ensureAuth, serviceController.getAllServices)
router.get('/:id', md_auth.ensureAuth, serviceController.getService)
router.post('/create', md_auth.ensureAuth, serviceController.createService);
router.put('/update/:id', md_auth.ensureAuth, serviceController.updateService)
router.delete('/delete/:id', md_auth.ensureAuth, serviceController.deleteService)

module.exports =  router;