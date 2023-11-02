const Router = require('express')
const router = new Router()
const memberController = require('../controllers/memberController')

router.post('/registration', memberController.registration)
router.post('/login', memberController.login)
router.get('/', memberController.getAll)
router.get('/:id', memberController.getOne)
router.put('/updatePhoto', memberController.changePhoto)
router.put('/changeInfo', memberController.changeInfo)
router.put('/setSector', memberController.setSector)

module.exports = router